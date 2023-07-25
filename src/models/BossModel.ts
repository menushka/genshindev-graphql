import { Boss } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { BaseModel } from './BaseModel';

export interface BossRaw extends Boss {}

interface CachedData {
  bosses: BossRaw[]
}

export class BossModel extends BaseModel<CachedData> {
  private api: ApiType

  key = 'BossModel'
  bosses: BossRaw[] = []
  bossesByName: { [name: string]: BossRaw } = {}

  constructor(api: ApiType) {
    super()
    this.api = api
  }

  async fetch() {
    const bossTypes = await this.api.Bosses.All()
    const bossNamesForTypes = await Promise.all(bossTypes.map(this.api.Bosses.AllForType))
    const bossesPerType = bossTypes.flatMap((type, index) => bossNamesForTypes[index].map(name => [type, name]))
    const bosses = await Promise.all(bossesPerType.map(([type, name]) => this.api.Bosses.Specific(type, name)))
    return { bosses }
  }

  async process(data: CachedData) {
    this.bosses = data.bosses
    this.bossesByName = Object.fromEntries(data.bosses.map(boss => [boss.name, boss]))
  }

  saveData() {
    return { bosses: this.bosses }
  }

  getAll() {
    return this.bosses.map(mapToResponse())
  }

  getByName(name: string) {
    return mapToResponse()(this.bossesByName[name])
  }
}

const mapToResponse = () =>
  ({ drops, artifacts, ...otherProps }: BossRaw): Boss => ({
    ...otherProps
  })
