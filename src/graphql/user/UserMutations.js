import { UserType, UserInputType, UserPredicateInputObjType } from './UserTypes';
import { GraphQLNonNull, GraphQLList } from 'graphql';

export const createUserMutation = {
  type: UserType,
  description: 'creates a new user',
  args: {
    newUser: { type: UserInputType },
  },
  resolve: (_, args, context) => {
    const { db } = context;
    const newUserWithId = { ...args.newUser, id: db.users.count() + 1 };
    db.users.create(newUserWithId);
    return newUserWithId;
  },
};

export const updateUserMutation = {
  type: GraphQLList(UserType),
  description: 'updates the user by id',
  args: {
    predicateObj: { type: GraphQLNonNull(UserPredicateInputObjType) },
    fragment: { type: UserInputType },
  },
  resolve: (_, { predicateObj, fragment }, { db: { users } }) =>
    users.update(predicateObj, fragment),
};
