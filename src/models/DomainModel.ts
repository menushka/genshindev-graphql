import { Domain } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { BaseModel } from './BaseModel';
import { ElementModel } from './ElementModel';
import { NationModel } from './NationModel';

export interface DomainRaw extends Omit<Omit<Domain, 'recommendedElements'>, 'nation'> {
  recommendedElements: string[]
  nation: string
}

interface CachedData {
  domains: DomainRaw[]
}

export class DomainModel extends BaseModel<CachedData> {
  private api: ApiType
  private elementModel: ElementModel
  private nationModel: NationModel

  key = 'DomainModel'
  domains: DomainRaw[] = []
  domainsByName: { [name: string]: DomainRaw } = {}

  constructor(api: ApiType, elementModel: ElementModel, nationModel: NationModel) {
    super()
    this.api = api
    this.elementModel = elementModel
    this.nationModel = nationModel
  }

  async fetch() {
    const nationNames = await this.api.Domains.All()
    const domains = await Promise.all(nationNames.map(this.api.Domains.Specific))
    return { domains }
  }

  async process(data: CachedData) {
    this.domains = data.domains
    this.domainsByName = Object.fromEntries(data.domains.map(artifact => [artifact.name, artifact]))
  }

  saveData() {
    return { domains: this.domains }
  }

  getAll() {
    return this.domains.map(mapToResponse(this.elementModel, this.nationModel))
  }

  getByName(name: string) {
    return mapToResponse(this.elementModel, this.nationModel)(this.domainsByName[name])
  }
}

const mapToResponse = (elementModel: ElementModel, nationModel: NationModel) =>
  ({ nation, recommendedElements, ...otherProps }: DomainRaw): Domain => ({
    nation: nationModel.getByName(nation),
    recommendedElements: recommendedElements.map(element => elementModel.getByName(element)),
    ...otherProps
  })
