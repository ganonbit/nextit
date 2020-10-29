import { ApolloServer } from 'apollo-server-lambda';
import { schema } from '../apollo/schema';

const server = new ApolloServer({
  schema,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
