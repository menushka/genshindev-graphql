import { Enemy } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';

export interface EnemyRaw extends Enemy {}

export class EnemyModel {
  private api: ApiType

  enemies: EnemyRaw[] = []
  enemiesByName: { [name: string]: EnemyRaw } = {}

  constructor(api: ApiType) {
    this.api = api
  }

  async refresh() {
    const enemyNames = await this.api.Enemies.All()
    this.enemies = await Promise.all(enemyNames.map(this.api.Enemies.Specific))
    this.enemiesByName = Object.fromEntries(this.enemies.map(enemy => [enemy.name, enemy]))
  }

  getAll() {
    return this.enemies
  }

  getByName(name: string) {
    return (this.enemiesByName[name])
  }
}
