import type { ApiType } from '../api/api';
import type { ElementModel } from './ElementModel';

export interface Character {
  name: string
  title: string
  vision: string
}

export class CharacterModel {
  private api: ApiType
  private elementModel: ElementModel
  
  characters: Character[] = []

  constructor(api: ApiType, elementModel: ElementModel) {
    this.api = api
    this.elementModel = elementModel
  }

  async refresh() {
    const characterNames = await this.api.Characters.All()
    this.characters = await Promise.all(characterNames.map(this.api.Characters.Specific))
  }

  getAll() {
    return this.characters.map(mapToResponse(this.elementModel))
  }

  getByName(name: string) {
    return mapToResponse(this.elementModel)(this.characters.find(character => character.name === name))
  }
}

const mapToResponse = (elementModel: ElementModel) =>
  ({ name, title, vision }: Character) => ({
    name,
    title,
    vision: elementModel.getByName(vision)
  })
