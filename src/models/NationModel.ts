import { Nation } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { BaseModel } from './BaseModel';
import { ElementModel } from './ElementModel';

export interface NationRaw extends Omit<Nation, 'element'> {
  element: string
}

interface CachedData {
  nations: NationRaw[]
}

export class NationModel extends BaseModel<CachedData> {
  private api: ApiType
  private elementModel: ElementModel

  key = 'NationModel'
  nations: NationRaw[] = []
  nationsByName: { [name: string]: NationRaw } = {}

  constructor(api: ApiType, elementModel: ElementModel) {
    super()
    this.api = api
    this.elementModel = elementModel
  }

  async fetch() {
    const nationNames = await this.api.Nations.All()
    const nations = await Promise.all(nationNames.map(this.api.Nations.Specific))
    return { nations }
  }

  async process(data: CachedData) {
    this.nations = data.nations
    this.nationsByName = Object.fromEntries(data.nations.map(artifact => [artifact.name, artifact]))
  }

  saveData() {
    return { nations: this.nations }
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
