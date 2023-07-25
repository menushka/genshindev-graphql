import { Artifact } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import { BaseModel } from './BaseModel';

export interface ArtifactRaw extends Pick<Artifact, 'name'> {
  max_rarity: number
  '2-piece_bonus': string
  '4-piece_bonus': string
}

interface CachedData { artifacts: ArtifactRaw[] }

export class ArtifactModel extends BaseModel<CachedData> {
  private api: ApiType

  key = 'ArtifactModel'
  artifacts: ArtifactRaw[] = []
  artifactsByName: { [name: string]: ArtifactRaw } = {}

  constructor(api: ApiType) {
    super()
    this.api = api
  }

  async fetch() {
    const artifactNames = await this.api.Artifacts.All()
    const artifacts = await Promise.all(artifactNames.map(this.api.Artifacts.Specific))
    return { artifacts }
  }

  async process(data: CachedData) {
    this.artifacts = data.artifacts
    this.artifactsByName = Object.fromEntries(data.artifacts.map(artifact => [artifact.name, artifact]))
  }

  saveData() {
    return { artifacts: this.artifacts }
  }

  getAll() {
    return this.artifacts.map(mapToResponse)
  }

  getByName(name: string) {
    return mapToResponse(this.artifactsByName[name])
  }
}

const mapToResponse = (rawArtifact: ArtifactRaw): Artifact => ({
  name: rawArtifact['name'],
  maxRarity: rawArtifact['max_rarity'],
  twoPieceBonus: rawArtifact['2-piece_bonus'],
  fourPieceBonus: rawArtifact['4-piece_bonus'],
})
