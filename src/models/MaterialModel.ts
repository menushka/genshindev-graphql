import { Material } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { BaseModel } from './BaseModel';

export type MaterialRaw = Material

interface CachedData {
  materials: MaterialRaw[]
}

export class MaterialModel extends BaseModel<CachedData> {
  private api: ApiType

  key = 'MaterialModel'
  materials: MaterialRaw[] = []
  materialsByName: { [name: string]: MaterialRaw } = {}

  constructor(api: ApiType) {
    super()
    this.api = api
  }

  async fetch() {
    const materialTypes = await this.api.Materials.All()
    const materialsPerType = await Promise.all(materialTypes.map(this.api.Materials.AllForType))
    const materials = materialsPerType.flat()
    return { materials }
  }

  async process(data: CachedData) {
    this.materials = data.materials
    this.materialsByName = Object.fromEntries(data.materials.map(artifact => [artifact.name, artifact]))
  }

  saveData() {
    return { materials: this.materials }
  }

  getAll() {
    return this.materials
  }

  getByName(name: string) {
    return (this.materialsByName[name])
  }
}
