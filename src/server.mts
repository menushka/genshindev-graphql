import { readFileSync } from 'fs'
import { ApolloServer } from '@apollo/server'
import { Api } from './api/api.mjs';
import { CharacterModel } from './models/CharacterModel.mjs';
import { ElementModel } from './models/ElementModel.mjs';
import getDepth from './utils/getDepth.js';

const typeDefs = readFileSync(new URL('schema.graphql', import.meta.url), { encoding: 'utf-8' })

const elementModel = new ElementModel(Api)
await elementModel.refresh()

const characterModel = new CharacterModel(Api, elementModel)
await characterModel.refresh()

const resolvers = {
  Query: {
    characters: () => characterModel.getAll(),
    character: (parent, { name }, contextValue, info) => characterModel.getByName(name),
    elements: () => elementModel.getAll(),
    element: (parent, { name }, contextValue, info) => {
      const depth = Math.floor((getDepth(info.operation.selectionSet) - 2) / 2)
      return elementModel.getByName(name, depth)
    },
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export { server }
