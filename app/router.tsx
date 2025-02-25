import { InMemoryCache } from "@apollo/client/cache/inmemory/inmemoryCache";
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types";
import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const apolloClient = new ApolloClient({
    ssrMode: true,
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
    ssrForceFetchDelay: 1000,
    credentials: "include",
    name: "pokemon",
  });

  const router = createTanStackRouter({
    routeTree,
    notFoundMode: "root",
    defaultNotFoundComponent: () => <div>Not Found</div>,
    context: {
      apolloClient,
    },
  });

  router.options = {
    ...router.options,
    dehydrate: () => {
      return {
        apolloState: apolloClient.extract(),
      };
    },
    hydrate: (dehydrated: { apolloState: NormalizedCacheObject }) => {
      apolloClient.cache.restore(dehydrated.apolloState);
    },
    Wrap: function Wrap({ children }) {
      return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
    },
  };

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
