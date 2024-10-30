import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graph.imdbapi.dev/v1',
  cache: new InMemoryCache()
});

export default client;