import { UserType } from './UserTypes';
import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql';

export const getUsersQuery = {
  type: GraphQLList(UserType),
  description: 'Gets the users list',
  resolve: (...params) => {
    const [, , context] = params;
    console.log('get users');
    return context.db.users.find({});
  },
};

export const getUserByIdQuery = {
  type: UserType,
  description: 'Gets the user data by Id',
  args: { id: { type: GraphQLNonNull(GraphQLInt) } },
  resolve: (_, args, context) => {
    const result = context.db.users.find({ id: args.id });
    return result.length === 1 ? result[0] : null;
  },
};
// anyway, resolver signature should be:
// obj, args, context, info

// obj -> the object resolved, (rootQuery argument for root types (such as Query))
// args -> { [key: string]: any } GraphQL Arguments, nothing much to eleborate
// context -> shared object used for side effects
// info -> Object containing information about the execution info, (context) in your case above
