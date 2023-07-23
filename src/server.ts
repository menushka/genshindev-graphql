import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

import { Api } from './api/api';
import { CharacterModel } from './models/CharacterModel';
import { ElementModel } from './models/ElementModel';
import getDepth from './utils/getDepth';
import { Resolvers } from './__generated__/resolvers-types'
import typeDefs from './schema.graphql'
import { WeaponModel } from './models/WeaponModel';
import { ArtifactModel } from './models/ArtifactModel';
import { NationModel } from './models/NationModel';
import { DomainModel } from './models/DomainModel';
import { BossModel } from './models/BossModel';

const resolvers: Resolvers = {
  Boss: {
    __resolveType: (obj, contextValue, info) => {
      return 'BossWeekly'
    }
  },
  Query: {
    artifacts: (parent, args, contextValue, info) => contextValue.artifactModel.getAll(),
    artifact: (parent, { name }, contextValue, info) => contextValue.artifactModel.getByName(name),
    bosses: (parent, args, contextValue, info) => contextValue.bossModel.getAll(),
    boss: (parent, { name }, contextValue, info) => contextValue.bossModel.getByName(name),
    characters: (parent, args, contextValue, info) => contextValue.characterModel.getAll(),
    character: (parent, { name }, contextValue, info) => contextValue.characterModel.getByName(name),
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
    nations: (parent, args, contextValue, info) => contextValue.nationModel.getAll(),
    nation: (parent, { name }, contextValue, info) => contextValue.nationModel.getByName(name),
    weapons: (parent, args, contextValue, info) => contextValue.weaponModel.getAll(),
    weapon: (parent, { name }, contextValue, info) => contextValue.weaponModel.getByName(name),
  }
}

const context = async () => {
  const elementModel = new ElementModel(Api)
  await elementModel.refresh()

  const bossModel = new BossModel(Api)
  await bossModel.refresh()

  const nationModel = new NationModel(Api, elementModel)
  await nationModel.refresh()

  const domainModel = new DomainModel(Api, elementModel, nationModel)
  await domainModel.refresh()

  const characterModel = new CharacterModel(Api, elementModel)
  await characterModel.refresh()

  const weaponModel = new WeaponModel(Api)
  await weaponModel.refresh()

  const artifactModel = new ArtifactModel(Api)
  await artifactModel.refresh()

  return {
    artifactModel,
    bossModel,
    characterModel,
    domainModel,
    elementModel,
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
