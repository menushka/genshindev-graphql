import { Weapon } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';

export interface WeaponRaw extends Weapon {}

export class WeaponModel {
  private api: ApiType

  weapons: WeaponRaw[] = []
  weaponsByName: { [name: string]: WeaponRaw } = {}

  constructor(api: ApiType) {
    this.api = api
  }

  async refresh() {
    const elementNames = await this.api.Weapons.All()
    this.weapons = await Promise.all(elementNames.map(this.api.Weapons.Specific))
    this.weaponsByName = Object.fromEntries(this.weapons.map(weapon => [weapon.name, weapon]))
  }

  getAll() {
    return this.weapons
  }

  getByName(name: string) {
    return this.weaponsByName[name]
  }
}
