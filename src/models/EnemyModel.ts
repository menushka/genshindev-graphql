import { Enemy } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { BaseModel } from './BaseModel';

export interface EnemyRaw extends Enemy {}

interface CachedData {
  enemies: EnemyRaw[]
}

export class EnemyModel extends BaseModel<CachedData> {
  private api: ApiType

  key = 'EnemyModel'
  enemies: EnemyRaw[] = []
  enemiesByName: { [name: string]: EnemyRaw } = {}

  constructor(api: ApiType) {
    super()
    this.api = api
  }

  async fetch() {
    const enemyNames = await this.api.Enemies.All()
    const enemies = await Promise.all(enemyNames.map(this.api.Enemies.Specific))
    return { enemies }
  }

  async process(data: CachedData) {
    this.enemies = data.enemies
    this.enemiesByName = Object.fromEntries(data.enemies.map(artifact => [artifact.name, artifact]))
  }

  saveData() {
    return { enemies: this.enemies }
  }

  getAll() {
    return this.enemies
  }

  getByName(name: string) {
    return (this.enemiesByName[name])
  }
}
