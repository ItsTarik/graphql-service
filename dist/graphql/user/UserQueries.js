'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserByIdQuery = exports.getUsersQuery = undefined;

var _UserTypes = require('./UserTypes');

var _graphql = require('graphql');

var getUsersQuery = exports.getUsersQuery = {
  type: (0, _graphql.GraphQLList)(_UserTypes.UserType),
  description: 'Gets the users list',
  resolve: function resolve() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var context = params[2];

    console.log('get users');
    return context.db.users.find({});
  }
};

var getUserByIdQuery = exports.getUserByIdQuery = {
  type: _UserTypes.UserType,
  description: 'Gets the user data by Id',
  args: { id: { type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLInt) } },
  resolve: function resolve(_, args, context) {
    var result = context.db.users.find({ id: args.id });
    return result.length === 1 ? result[0] : null;
  }
};
// anyway, resolver signature should be:
// obj, args, context, info

// obj -> the object resolved, (rootQuery argument for root types (such as Query))
// args -> { [key: string]: any } GraphQL Arguments, nothing much to eleborate
// context -> shared object used for side effects
// info -> Object containing information about the execution info, (context) in your case above