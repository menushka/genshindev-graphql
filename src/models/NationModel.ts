import { Nation } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { ElementModel } from './ElementModel';

export interface NationRaw extends Omit<Nation, 'element'> {
  element: string
}

export class NationModel {
  private api: ApiType
  private elementModel: ElementModel

  nations: NationRaw[] = []
  nationsByName: { [name: string]: NationRaw } = {}

  constructor(api: ApiType, elementModel: ElementModel) {
    this.api = api
    this.elementModel = elementModel
  }

  async refresh() {
    const nationNames = await this.api.Nations.All()
    this.nations = await Promise.all(nationNames.map(this.api.Nations.Specific))
    this.nationsByName = Object.fromEntries(this.nations.map(nation => [nation.name, nation]))
  }

  getAll() {
    return this.nations.map(mapToResponse(this.elementModel))
  }

  getByName(name: string) {
    return mapToResponse(this.elementModel)(this.nationsByName[name])
  }
}

const mapToResponse = (elementModel: ElementModel) =>
  ({ name, element, archon, controllingEntity }: NationRaw): Nation => ({
    name,
    element: elementModel.getByName(element),
    archon,
    controllingEntity,
  })
