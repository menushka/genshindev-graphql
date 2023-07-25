import { Character } from '../__generated__/resolvers-types';
import type { ApiType } from '../api/api';
import type { ElementModel } from './ElementModel';
import { BaseModel } from './BaseModel';

export interface CharacterRaw extends Omit<Character, 'vision'> {
  vision: string
}

interface CachedData {
  characters: CharacterRaw[]
}

export class CharacterModel extends BaseModel<CachedData> {
  private api: ApiType
  private elementModel: ElementModel
  
  key = 'CharacterModel'
  characters: CharacterRaw[] = []
  charactersByName: { [name: string]: CharacterRaw } = {}

  constructor(api: ApiType, elementModel: ElementModel) {
    super()
    this.api = api
    this.elementModel = elementModel
  }

  async fetch() {
    const characterNames = await this.api.Characters.All()
    const characters = await Promise.all(characterNames.map(this.api.Characters.Specific))
    return { characters }
  }

  async process(data: CachedData) {
    this.characters = data.characters
    this.charactersByName = Object.fromEntries(data.characters.map(artifact => [artifact.name, artifact]))
  }

  saveData() {
    return { characters: this.characters }
  }

  getAll() {
    return this.characters.map(mapToResponse(this.elementModel))
  }

  getByName(name: string) {
    return mapToResponse(this.elementModel)(this.charactersByName[name])
  }
}

const mapToResponse = (elementModel: ElementModel) =>
  ({ name, title, vision }: CharacterRaw): Character => ({
    name,
    title,
    vision: elementModel.getByName(vision)
  })
