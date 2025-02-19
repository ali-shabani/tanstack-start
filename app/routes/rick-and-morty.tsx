import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
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
} from "@/components/ui/pagination";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "motion/react";

import {
  CHARACTER_EPISODE_INFO_FRAGMENT,
  EpisodeInfo,
} from "@/components/episode-info";
import { graphql } from "@/gql";

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
  page: z.number().optional().default(1),
});

export const Route = createFileRoute("/rick-and-morty")({
  component: RouteComponent,
  validateSearch: zodValidator(schema),
  loaderDeps: ({ search: { page } }) => ({
    page,
  }),
  loader: async ({ context, deps }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await context.apolloClient.query({
      query: CHARACTERS,
      variables: {
        page: deps.page,
      },
    });
  },
});

function RouteComponent() {
  const { page } = Route.useLoaderDeps();
  const { data } = useSuspenseQuery(CHARACTERS, {
    variables: {
      page,
    },
  });
  const { isLoading } = useRouterState();

  const { characters, info } = data;

  return (
    <PageTransition>
      <div className="container py-8">
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
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src={character?.image}
                    alt={character?.name}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{character?.name}</h2>
                  {character && <EpisodeInfo character={character} />}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {data?.characters?.info && (
          <div
            className={`mt-8 flex justify-center transition-opacity duration-200 ${
              isLoading ? "opacity-50" : "opacity-100"
            }`}
          >
            <Pagination className="max-w-full">
              <PaginationContent className="flex-wrap gap-2">
                <PaginationItem>
                  <PaginationPrevious>
                    {(search, ...props) => (
                      <Link
                        {...props}
                        to={Route.to}
                        search={{ page: page - 1 }}
                        preload="intent"
                      />
                    )}
                  </PaginationPrevious>
                </PaginationItem>

                <PaginationItem className="hidden sm:block">
                  <PaginationLink isActive>
                    {() => (
                      <>
                        Page {page} of {data.characters?.info?.pages}
                      </>
                    )}
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext>
                    {(props) => {
                      console.log(props);
                      return (
                        <Link
                          to={Route.to}
                          search={{ page: page + 1 }}
                          preload="intent"
                          {...props}
                        />
                      );
                    }}
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
