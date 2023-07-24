import { Consumable } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';

export type ConsumableRaw = Consumable

export class ConsumableModel {
  private api: ApiType

  consumables: ConsumableRaw[] = []
  consumablesByName: { [name: string]: ConsumableRaw } = {}

  constructor(api: ApiType) {
    this.api = api
  }

  async refresh() {
    const consumableTypes = await this.api.Consumables.All()
    const consumablesPerType = await Promise.all(consumableTypes.map(this.api.Consumables.AllForType))
    this.consumables = consumablesPerType.flat()
    this.consumablesByName = Object.fromEntries(this.consumables.map(consumable => [consumable.name, consumable]))
  }

  getAll() {
    return this.consumables
  }

  getByName(name: string) {
    return (this.consumablesByName[name])
  }
}
