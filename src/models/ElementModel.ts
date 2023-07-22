import { Element, Reaction } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';

export interface ReactionRaw extends Omit<Reaction, 'elements'> {
  elements: string[]
}

export interface ElementRaw extends Omit<Element, 'reactions'> {
  reactions: ReactionRaw[]
}

export class ElementModel {
  private api: ApiType

  elements: ElementRaw[] = []
  elementsByName: { [name: string]: ElementRaw } = {}

  constructor(api: ApiType) {
    this.api = api
  }

  async refresh() {
    const elementNames = await this.api.Elements.All()
    this.elements = await Promise.all(elementNames.map(this.api.Elements.Specific))
    this.elementsByName = Object.fromEntries(this.elements.map(element => [element.name, element]))
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
