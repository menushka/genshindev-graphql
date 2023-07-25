import { Element, ElementReaction } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { BaseModel } from './BaseModel';

export interface ElementReactionRaw extends Omit<ElementReaction, 'elements'> {
  elements: string[]
}

export interface ElementRaw extends Omit<Element, 'reactions'> {
  reactions: ElementReactionRaw[]
}

interface CachedData {
  elements: ElementRaw[]
}

export class ElementModel extends BaseModel<CachedData> {
  private api: ApiType

  key = 'ElementModel'
  elements: ElementRaw[] = []
  elementsByName: { [name: string]: ElementRaw } = {}

  constructor(api: ApiType) {
    super()
    this.api = api
  }

  async fetch() {
    const elementNames = await this.api.Elements.All()
    const elements = await Promise.all(elementNames.map(this.api.Elements.Specific))
    return { elements }
  }

  async process(data: CachedData) {
    this.elements = data.elements
    this.elementsByName = Object.fromEntries(data.elements.map(artifact => [artifact.name, artifact]))
  }

  saveData() {
    return { elements: this.elements }
  }

  getAll(depth = 1) {
    return this.elements.map(mapToResponse(this, depth))
  }

  getByName(name: string, depth = 1) {
    return mapToResponse(this, depth)(this.elementsByName[name])
  }
}

const mapToResponse = (elementModel: ElementModel, depth: number) =>
  ({ name, reactions }: ElementRaw): Element => ({
    name,
    reactions: reactions.map(({ name, elements, description }) => {
      const result = { name, elements, description }
      if (depth > 0) {
        return {
          ...result,
          elements: elements.map(element => elementModel.getByName(element, depth - 1)),
        }
      } else {
        return { name, description }
      }
    })
  })
