'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _schema = require('./graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

var _buildCollection = require('./db/buildCollection');

var _buildCollection2 = _interopRequireDefault(_buildCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = [{ id: 1, firstname: 'fname1', lastname: 'lname1' }, { id: 2, firstname: 'fname2', lastname: 'lname2' }, { id: 3, firstname: 'fname3', lastname: 'lname3' }];

var usersCollection = (0, _buildCollection2.default)(users);

var app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.use('/graphql', (0, _expressGraphql2.default)({
  schema: _schema2.default,
  // rootValue: root,
  graphiql: true,
  context: {
    db: { users: usersCollection }
  }
}));

app.listen(4000, function () {
  return console.log('Now browse to localhost:4000/graphql');
});