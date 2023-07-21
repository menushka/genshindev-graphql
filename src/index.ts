import { readFileSync } from 'fs'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { Api } from './api/api';
import { CharacterModel } from './models/CharacterModel';
import { ElementModel } from './models/ElementModel';
import getDepth from './utils/getDepth';

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

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
