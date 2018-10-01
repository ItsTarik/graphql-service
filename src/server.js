import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import { buildSchema } from 'graphql';

import schema from './graphql/schema';
import collectionBuilder from './db/collectionBuilder';

const users = [
  { id: 1, firstname: 'fname1', lastname: 'lname1' },
  { id: 2, firstname: 'fname2', lastname: 'lname2' },
  { id: 3, firstname: 'fname3', lastname: 'lname3' },
];

const usersCollection = collectionBuilder(users);

// var schema = buildSchema(`
//   type Query {
//     hello: String,
//     hi: Int
//   }
// `);

// var root = {
//   hello: () => 'Hello world!',
//   hi: () => 25,
// };

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
