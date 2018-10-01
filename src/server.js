import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import schema from './graphql/schema';
import buildCollection from './db/buildCollection';

const users = [
  { id: 1, firstname: 'fname1', lastname: 'lname1' },
  { id: 2, firstname: 'fname2', lastname: 'lname2' },
  { id: 3, firstname: 'fname3', lastname: 'lname3' },
];

const usersCollection = buildCollection(users);

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    // rootValue: root,
    graphiql: true,
    context: {
      db: { users: usersCollection },
    },
  })
);

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
