import { Artifact } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';

export interface ArtifactRaw extends Pick<Artifact, 'name'> {
  max_rarity: number
  '2-piece_bonus': string
  '4-piece_bonus': string
}

export class ArtifactModel {
  private api: ApiType

  artifacts: ArtifactRaw[] = []
  artifactsByName: { [name: string]: ArtifactRaw } = {}

  constructor(api: ApiType) {
    this.api = api
  }

  async refresh() {
    const artifactNames = await this.api.Artifacts.All()
    this.artifacts = await Promise.all(artifactNames.map(this.api.Artifacts.Specific))
    this.artifactsByName = Object.fromEntries(this.artifacts.map(artifact => [artifact.name, artifact]))
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
