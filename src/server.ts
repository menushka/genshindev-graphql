import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'

import { Api } from './api/api';
import { CharacterModel } from './models/CharacterModel';
import { ElementModel } from './models/ElementModel';
import getDepth from './utils/getDepth';
import { MaterialBossMaterial, MaterialCharacterAscension, MaterialCharacterExperience, MaterialCommonAscension, MaterialCookingIngredients, MaterialLocalSpecialties, MaterialTalentBook, MaterialTalentBoss, MaterialWeaponAscension, MaterialWeaponExperience, Resolvers } from './__generated__/resolvers-types'
import typeDefs from './schema.graphql'
import { WeaponModel } from './models/WeaponModel';
import { ArtifactModel } from './models/ArtifactModel';
import { NationModel } from './models/NationModel';
import { DomainModel } from './models/DomainModel';
import { BossModel } from './models/BossModel';
import { MaterialModel } from './models/MaterialModel';
import { EnemyModel } from './models/EnemyModel';
import { ConsumableModel } from './models/ConsumableModel';
import { BaseModel } from './models/BaseModel';

const resolvers: Resolvers = {
  Boss: {
    __resolveType: (obj, contextValue, info) => {
      return 'BossWeekly'
    }
  },
  Material: {
    __resolveType: (obj, contextValue, info) => {
      if ((obj as MaterialCommonAscension).characters && (obj as MaterialCommonAscension).sources) {
        return 'MaterialCommonAscension'
      }

      if ((obj as MaterialLocalSpecialties).characters && (obj as MaterialLocalSpecialties).nation) {
        return 'MaterialLocalSpecialties'
      }

      if ((obj as MaterialTalentBook).characters && (obj as MaterialTalentBook).availability) {
        return 'MaterialTalentBook'
      }

      if ((obj as MaterialBossMaterial).characters && (obj as MaterialBossMaterial).source) {
        return 'MaterialBossMaterial'
      }

      if ((obj as MaterialTalentBoss).characters) {
        return 'MaterialTalentBoss'
      }

      if ((obj as MaterialWeaponAscension).weapons && (obj as MaterialWeaponAscension).source) {
        return 'MaterialWeaponAscension'
      }

      if ((obj as MaterialWeaponExperience).experience && (obj as MaterialWeaponExperience).source) {
        return 'MaterialWeaponExperience'
      }

      if ((obj as MaterialCharacterAscension).sources) {
        return 'MaterialCharacterAscension'
      }

      if ((obj as MaterialCharacterExperience).experience) {
        return 'MaterialCharacterExperience'
      }

      if ((obj as MaterialCookingIngredients).description) {
        return 'MaterialCookingIngredients'
      }
    }
  },
  Query: {
    artifacts: (parent, args, contextValue, info) => contextValue.artifactModel.getAll(),
    artifact: (parent, { name }, contextValue, info) => contextValue.artifactModel.getByName(name),
    bosses: (parent, args, contextValue, info) => contextValue.bossModel.getAll(),
    boss: (parent, { name }, contextValue, info) => contextValue.bossModel.getByName(name),
    characters: (parent, args, contextValue, info) => contextValue.characterModel.getAll(),
    character: (parent, { name }, contextValue, info) => contextValue.characterModel.getByName(name),
    consumables: (parent, args, contextValue, info) => contextValue.consumableModel.getAll(),
    consumable: (parent, { name }, contextValue, info) => contextValue.consumableModel.getByName(name),
    domains: (parent, args, contextValue, info) => contextValue.domainModel.getAll(),
    domain: (parent, { name }, contextValue, info) => contextValue.domainModel.getByName(name),
    elements: (parent, args, contextValue, info) => {
      const depth = Math.floor((getDepth(info.operation.selectionSet) - 2) / 2)
      return contextValue.elementModel.getAll(depth)
    },
    element: (parent, { name }, contextValue, info) => {
      const depth = Math.floor((getDepth(info.operation.selectionSet) - 2) / 2)
      return contextValue.elementModel.getByName(name, depth)
    },
    enemies: (parent, args, contextValue, info) => contextValue.enemyModel.getAll(),
    enemy: (parent, { name }, contextValue, info) => contextValue.enemyModel.getByName(name),
    materials: (parent, args, contextValue, info) => contextValue.materialModel.getAll(),
    material: (parent, { name }, contextValue, info) => contextValue.materialModel.getByName(name),
    nations: (parent, args, contextValue, info) => contextValue.nationModel.getAll(),
    nation: (parent, { name }, contextValue, info) => contextValue.nationModel.getByName(name),
    weapons: (parent, args, contextValue, info) => contextValue.weaponModel.getAll(),
    weapon: (parent, { name }, contextValue, info) => contextValue.weaponModel.getByName(name),
  }
}

const context = async () => {
  const modelsToSave: BaseModel<any>[] = []
  const loadModelsAndQueueToSave = async (models: BaseModel<any>[]) => {
    await Promise.all(models.map(model => model.load()))
    modelsToSave.push(...models)
  }

  const elementModel = new ElementModel(Api)
  const bossModel = new BossModel(Api)
  const materialModel = new MaterialModel(Api)
  const enemyModel = new EnemyModel(Api)
  const consumableModel = new ConsumableModel(Api)
  const weaponModel = new WeaponModel(Api)
  const artifactModel = new ArtifactModel(Api)

  await loadModelsAndQueueToSave([
    elementModel,
    bossModel,
    materialModel,
    enemyModel,
    consumableModel,
    weaponModel,
    artifactModel,
  ])

  const nationModel = new NationModel(Api, elementModel)
  const characterModel = new CharacterModel(Api, elementModel)
  await loadModelsAndQueueToSave([
    nationModel,
    characterModel,
  ])

  const domainModel = new DomainModel(Api, elementModel, nationModel)
  await loadModelsAndQueueToSave([
    domainModel
  ])

  await Promise.all(modelsToSave.map(model => model.save()))

  return {
    artifactModel,
    bossModel,
    characterModel,
    consumableModel,
    domainModel,
    elementModel,
    enemyModel,
    materialModel,
    nationModel,
    weaponModel,
  }
}
export type Context = Awaited<ReturnType<typeof context>>

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

export { context, server }
