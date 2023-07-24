import { Material } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';

export type MaterialRaw = Material

export class MaterialModel {
  private api: ApiType

  materials: MaterialRaw[] = []
  materialsByName: { [name: string]: MaterialRaw } = {}

  constructor(api: ApiType) {
    this.api = api
  }

  async refresh() {
    const materialTypes = await this.api.Materials.All()
    const materialsPerType = await Promise.all(materialTypes.map(this.api.Materials.AllForType))
    this.materials = materialsPerType.flat()
    this.materialsByName = Object.fromEntries(this.materials.map(material => [material.name, material]))
  }

  getAll() {
    return this.materials
  }

  getByName(name: string) {
    return (this.materialsByName[name])
  }
}
