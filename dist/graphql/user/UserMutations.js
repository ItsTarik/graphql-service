'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserMutation = exports.createUserMutation = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _UserTypes = require('./UserTypes');

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserMutation = exports.createUserMutation = {
  type: _UserTypes.UserType,
  description: 'creates a new user',
  args: {
    newUser: { type: _UserTypes.UserInputType }
  },
  resolve: function resolve(_, args, context) {
    var db = context.db;

    var newUserWithId = (0, _extends3.default)({}, args.newUser, { id: db.users.count() + 1 });
    db.users.create(newUserWithId);
    return newUserWithId;
  }
};

var updateUserMutation = exports.updateUserMutation = {
  type: (0, _graphql.GraphQLList)(_UserTypes.UserType),
  description: 'updates the user by id',
  args: {
    predicateObj: { type: (0, _graphql.GraphQLNonNull)(_UserTypes.UserPredicateInputObjType) },
    fragment: { type: _UserTypes.UserInputType }
  },
  resolve: function resolve(_, _ref, _ref2) {
    var predicateObj = _ref.predicateObj,
        fragment = _ref.fragment;
    var users = _ref2.db.users;
    return users.update(predicateObj, fragment);
  }
};