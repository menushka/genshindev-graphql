import { readFileSync } from 'fs'
import path from 'path';
import { ApolloServer } from '@apollo/server'
import { gql } from "graphql-tag"
import { Api } from './api/api';
import { CharacterModel } from './models/CharacterModel';
import { ElementModel } from './models/ElementModel';
import getDepth from './utils/getDepth';

const typeDefs = gql`
  type Character {
    name: String
    title: String
    vision: Element
  }

  type Element {
    name: String
    key: String
    reactions: [Reaction]
  }

  type Reaction {
    name: String
    elements: [Element]
    description: String
  }

  type Query {
    characters: [Character]
    character(name: String!): Character
    elements: [Element]
    element(name: String!): Element
  }
`

const resolvers = {
  Query: {
    characters: (parent, args, contextValue, info) => contextValue.characterModel.getAll(),
    character: (parent, { name }, contextValue, info) => contextValue.characterModel.getByName(name),
    elements: (parent, args, contextValue, info) => contextValue.elementModel.getAll(),
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
type ContextType = Awaited<ReturnType<typeof context>>

const server = new ApolloServer<ContextType>({
  typeDefs,
  resolvers,
  introspection: true
})

export { context, server }
