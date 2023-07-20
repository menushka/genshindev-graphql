import type { ApiType } from '@/api/api';

export interface Element {
  name: string
  reactions: Reaction[]
}

export interface Reaction {
  name: string
  elements: string[]
  description: string
}

export class ElementModel {
  private api: ApiType

  elements: Element[] = []
  elementsByName: { [name: string]: Element } = {}

  constructor(api: ApiType) {
    this.api = api
  }

  async refresh() {
    const elementNames = await this.api.Elements.All()
    this.elements = await Promise.all(elementNames.map(this.api.Elements.Specific))
    this.elementsByName = Object.fromEntries(this.elements.map(element => [element.name, element]))
  }

  getAll() {
    return this.elements
  }

  getByName(name: string, depth = 1) {
    return mapToResponse(this, depth)(this.elementsByName[name])
  }
}

const mapToResponse = (elementModel: ElementModel, depth: number) =>
  ({ name, reactions }: Element) => ({
    name,
    reactions: reactions.map(({ name, elements, description }) => {
      const result = { name, elements, description }
      if (depth > 0) {
        return {
          ...result,
          elements: elements.map(element => elementModel.getByName(element, depth - 1)),
        }
      } else {
        return {
          ...result,
          elements
        }
      }
    })
  })
