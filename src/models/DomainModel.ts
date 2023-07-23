import { Domain } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { ElementModel } from './ElementModel';
import { NationModel } from './NationModel';

export interface DomainRaw extends Omit<Omit<Domain, 'recommendedElements'>, 'nation'> {
  recommendedElements: string[]
  nation: string
}

export class DomainModel {
  private api: ApiType
  private elementModel: ElementModel
  private nationModel: NationModel

  domains: DomainRaw[] = []
  domainsByName: { [name: string]: DomainRaw } = {}

  constructor(api: ApiType, elementModel: ElementModel, nationModel: NationModel) {
    this.api = api
    this.elementModel = elementModel
    this.nationModel = nationModel
  }

  async refresh() {
    const nationNames = await this.api.Domains.All()
    this.domains = await Promise.all(nationNames.map(this.api.Domains.Specific))
    this.domainsByName = Object.fromEntries(this.domains.map(domain => [domain.name, domain]))
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
