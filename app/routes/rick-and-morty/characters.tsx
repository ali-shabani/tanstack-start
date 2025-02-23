import {
  createFileRoute,
  Link,
  linkOptions,
  stripSearchParams,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useSuspenseQuery } from "@apollo/client/react/hooks/useSuspenseQuery";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "motion/react";

import {
  CHARACTER_EPISODE_INFO_FRAGMENT,
  EpisodeInfo,
} from "@/components/episode-info";
import { graphql } from "@/gql";
import { Suspense } from "react";

const CHARACTERS = graphql(
  `
    query Characters($page: Int) {
      characters(page: $page) {
        info {
          count
          next
          pages
          prev
        }
        results {
          id
          name
          image
          ...CharacterEpisodeInfo
        }
      }
    }
  `,
  [CHARACTER_EPISODE_INFO_FRAGMENT]
);

const schema = z.object({
  page: z.number().default(1),
});

const defaultValues = {
  page: 1,
};

export const Route = createFileRoute("/rick-and-morty/characters")({
  component: () => (
    <Suspense fallback={<div>suspended...</div>}>
      <RouteComponent />
    </Suspense>
  ),
  validateSearch: zodValidator(schema),
  search: {
    middlewares: [stripSearchParams(defaultValues)],
  },
  loaderDeps: ({ search: { page } }) => ({
    page,
  }),
  loader: async ({ context, deps }) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    await context.apolloClient.query({
      query: CHARACTERS,
      variables: {
        page: deps.page,
      },
    });
  },
  errorComponent: ({ error }) => {
    const router = useRouter();

    // Render an error message
    return (
      <div>
        {error.message}
        <button
          onClick={() => {
            router.invalidate();
          }}
        >
          Reset
        </button>
      </div>
    );
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { page } = Route.useLoaderDeps();
  const { data } = useSuspenseQuery(CHARACTERS, {
    variables: {
      page,
    },
  });
  const { isLoading } = useRouterState();

  const { characters } = data;

  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-opacity duration-200 ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          {characters?.results?.map((character) => (
            <motion.div
              key={character?.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.1,
              }}
            >
              <Link
                from={Route.fullPath}
                to={`$id`}
                params={{ id: character?.id ?? "" }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="p-0">
                    {character?.image ? (
                      <img
                        src={character.image}
                        alt={character?.name ?? ""}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">
                          No image available
                        </span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold">{character?.name}</h2>
                    {character && <EpisodeInfo character={character} />}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="py-8">
          {data?.characters?.info && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={page === 1}
                    from={Route.fullPath}
                    to="."
                    search={(prev) => ({
                      page: (prev?.page ?? 1) - 1,
                    })}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink className="w-fit px-2">
                    <span>
                      Page {page} of {data.characters?.info?.pages}
                    </span>
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    from={Route.fullPath}
                    to="."
                    search={(prev) => ({
                      page: prev.page + 1,
                    })}
                    preload="intent"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
