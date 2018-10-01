import { GraphQLObjectType, GraphQLString } from 'graphql';
import { userQuery } from './user/UserQueries';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    user: userQuery,
  }),
});

export default ViewerType;
