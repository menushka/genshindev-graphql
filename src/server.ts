import { readFileSync } from 'fs'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';

import { Api } from './api/api';
import { CharacterModel } from './models/CharacterModel';
import { ElementModel } from './models/ElementModel';
import getDepth from './utils/getDepth';
import { Resolvers } from './__generated__/resolvers-types'
import typeDefs from './schema.graphql'

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
  }
}

const context = async () => {
  const elementModel = new ElementModel(Api)
  elementModel.refresh()

  const characterModel = new CharacterModel(Api, elementModel)
  characterModel.refresh()

  return {
    characterModel,
    elementModel,
  }
}
export type Context = Awaited<ReturnType<typeof context>>

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ]
})

export { context, server }
