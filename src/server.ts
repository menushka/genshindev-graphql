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

const resolvers: Resolvers = {
  Query: {
    characters: (parent, args, contextValue, info) => contextValue.characterModel.getAll(),
    character: (parent, { name }, contextValue, info) => contextValue.characterModel.getByName(name),
    elements: (parent, args, contextValue, info) => {
      const depth = Math.floor((getDepth(info.operation.selectionSet) - 2) / 2)
      return contextValue.elementModel.getAll(depth)
    },
    element: (parent, { name }, contextValue, info) => {
      const depth = Math.floor((getDepth(info.operation.selectionSet) - 2) / 2)
      return contextValue.elementModel.getByName(name, depth)
    },
    weapons: (parent, args, contextValue, info) => contextValue.weaponModel.getAll(),
    weapon: (parent, { name }, contextValue, info) => contextValue.weaponModel.getByName(name),
    artifacts: (parent, args, contextValue, info) => contextValue.artifactModel.getAll(),
    artifact: (parent, { name }, contextValue, info) => contextValue.artifactModel.getByName(name),
  }
}

const context = async () => {
  const elementModel = new ElementModel(Api)
  await elementModel.refresh()

  const characterModel = new CharacterModel(Api, elementModel)
  await characterModel.refresh()

  const weaponModel = new WeaponModel(Api)
  await weaponModel.refresh()

  const artifactModel = new ArtifactModel(Api)
  await artifactModel.refresh()

  return {
    characterModel,
    elementModel,
    weaponModel,
    artifactModel,
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
