'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _UserMutations = require('./user/UserMutations');

var _UserQueries = require('./user/UserQueries');

var RootQuery = new _graphql.GraphQLObjectType({
  name: 'Queries',
  description: 'The root query type',
  fields: {
    users: _UserQueries.getUsersQuery,
    userById: _UserQueries.getUserByIdQuery
  }
});

var RootMutations = new _graphql.GraphQLObjectType({
  name: 'Mutations',
  description: 'The root mutation type',
  fields: {
    createUser: _UserMutations.createUserMutation,
    updateUser: _UserMutations.updateUserMutation
  }
});

var schema = new _graphql.GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations
});

exports.default = schema;