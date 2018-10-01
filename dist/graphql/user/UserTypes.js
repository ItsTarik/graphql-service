'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserInputType = exports.UserPredicateInputObjType = exports.UserType = undefined;

var _graphql = require('graphql');

var UserType = exports.UserType = new _graphql.GraphQLObjectType({
  name: 'userType',
  description: 'This is the user model',
  fields: {
    id: { type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLInt) },
    firstname: { type: _graphql.GraphQLString },
    lastname: { type: _graphql.GraphQLString }
  }
});

var UserPredicateInputObjType = exports.UserPredicateInputObjType = new _graphql.GraphQLInputObjectType({
  name: 'UserPredicateObjType',
  description: 'This is the user predicate object model',
  fields: {
    id: { type: _graphql.GraphQLInt },
    firstname: { type: _graphql.GraphQLString },
    lastname: { type: _graphql.GraphQLString }
  }
});

var UserInputType = exports.UserInputType = new _graphql.GraphQLInputObjectType({
  name: 'userInputType',
  description: 'The user input',
  fields: {
    firstname: { type: _graphql.GraphQLString },
    lastname: { type: _graphql.GraphQLString }
  }
});