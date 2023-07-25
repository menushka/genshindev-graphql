import { Weapon } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { BaseModel } from './BaseModel';

export interface WeaponRaw extends Weapon {}

interface CachedData {
  weapons: WeaponRaw[]
}

export class WeaponModel extends BaseModel<CachedData> {
  private api: ApiType

  key = 'WeaponModel'
  weapons: WeaponRaw[] = []
  weaponsByName: { [name: string]: WeaponRaw } = {}

  constructor(api: ApiType) {
    super()
    this.api = api
  }

  async fetch() {
    const elementNames = await this.api.Weapons.All()
    const weapons = await Promise.all(elementNames.map(this.api.Weapons.Specific))
    return { weapons }
  }

  async process(data: CachedData) {
    this.weapons = data.weapons
    this.weaponsByName = Object.fromEntries(data.weapons.map(artifact => [artifact.name, artifact]))
  }

  saveData() {
    return { weapons: this.weapons }
  }

  getAll() {
    return this.weapons
  }

  getByName(name: string) {
    return this.weaponsByName[name]
  }
}
