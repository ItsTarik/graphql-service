import {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'userType',
  description: 'This is the user model',
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
  },
});

export const UserPredicateInputObjType = new GraphQLInputObjectType({
  name: 'UserPredicateObjType',
  description: 'This is the user predicate object model',
  fields: {
    id: { type: GraphQLInt },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
  },
});

export const UserInputType = new GraphQLInputObjectType({
  name: 'userInputType',
  description: 'The user input',
  fields: {
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
  },
});
