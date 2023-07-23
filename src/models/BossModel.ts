import { Boss } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';

export interface BossRaw extends Boss {}

const zip = (a: unknown[], b: unknown[]) => a.map((k, i) => [k, b[i]])
const encode = (str: string) => str.replace('-', '%2F')

export class BossModel {
  private api: ApiType

  bosses: BossRaw[] = []
  bossesByName: { [name: string]: BossRaw } = {}

  constructor(api: ApiType) {
    this.api = api
  }

  async refresh() {
    const bossTypes = await this.api.Bosses.All()
    const bossNamesForTypes = await Promise.all(bossTypes.map(this.api.Bosses.AllForType))
    const bosses = bossTypes.flatMap((type, index) => bossNamesForTypes[index].map(name => [type, name]))
    this.bosses = await Promise.all(bosses.map(([type, name]) => this.api.Bosses.Specific(type, name)))
    this.bossesByName = Object.fromEntries(this.bosses.map(boss => [boss.name, boss]))
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
