import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { updateUserMutation, createUserMutation } from './user/UserMutations';
import { getUsersQuery, getUserByIdQuery } from './user/UserQueries';

const RootQuery = new GraphQLObjectType({
  name: 'Queries',
  description: 'The root query type',
  fields: {
    users: getUsersQuery,
    userById: getUserByIdQuery,
  },
});

const RootMutations = new GraphQLObjectType({
  name: 'Mutations',
  description: 'The root mutation type',
  fields: {
    createUser: createUserMutation,
    updateUser: updateUserMutation,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations,
});

export default schema;
