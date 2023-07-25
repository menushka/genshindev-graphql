import { Consumable } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { BaseModel } from './BaseModel';

export type ConsumableRaw = Consumable

interface CachedData {
  consumables: ConsumableRaw[]
}

export class ConsumableModel extends BaseModel<CachedData> {
  private api: ApiType

  key = 'ConsumableModel'
  consumables: ConsumableRaw[] = []
  consumablesByName: { [name: string]: ConsumableRaw } = {}

  constructor(api: ApiType) {
    super()
    this.api = api
  }

  async fetch() {
    const consumableTypes = await this.api.Consumables.All()
    const consumablesPerType = await Promise.all(consumableTypes.map(this.api.Consumables.AllForType))
    const consumables = consumablesPerType.flat()
    return { consumables }
  }

  async process(data: CachedData) {
    this.consumables = data.consumables
    this.consumablesByName = Object.fromEntries(data.consumables.map(artifact => [artifact.name, artifact]))
  }

  saveData() {
    return { consumables: this.consumables }
  }

  getAll() {
    return this.consumables
  }

  getByName(name: string) {
    return (this.consumablesByName[name])
  }
}
