import { ApolloClient, InMemoryCache } from "@apollo/client/";

export const apolloClient = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  ssrMode: true,
  cache: new InMemoryCache(),
});
