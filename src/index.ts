import { readFileSync } from 'fs'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { Api } from './api/api.js';
import { CharacterModel } from './models/CharacterModel.js';
import { ElementModel } from './models/ElementModel.js';

const typeDefs = readFileSync(new URL('schema.graphql', import.meta.url), { encoding: 'utf-8' })


const elementModel = new ElementModel(Api)
await elementModel.refresh()

const characterModel = new CharacterModel(Api, elementModel)
await characterModel.refresh()

const getDepth = (selectionSet, depthSoFar = 1) => {
  if (!selectionSet?.selections) {
    return depthSoFar;
  }
  // Find maximum depth among all selections
  return selectionSet.selections.reduce((maxDepth, selection) => {
    // Inline fragments and fragment spreads add complexity to depth calculation,
    // because we would need to look up the fragment definition in the document.
    // We will not handle those cases here.
    if (selection.kind !== 'Field') return maxDepth;

    const depth = getDepth(selection.selectionSet, depthSoFar + 1);
    return depth > maxDepth ? depth : maxDepth;
  }, depthSoFar);
};

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
