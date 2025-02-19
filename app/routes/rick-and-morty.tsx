import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { graphql } from "../../gql";
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
import { useDeferredValue, useTransition } from "react";

const CHARACTERS = graphql(`
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
      }
    }
  }
`);

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
    await new Promise((resolve) => setTimeout(resolve, 3000));
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

  return (
    <div className="container py-8">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-opacity duration-200 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        {data?.characters?.results?.map((character) => (
          <Card key={character.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{character.name}</h2>
            </CardContent>
          </Card>
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
                <PaginationPrevious to={Route.to} search={{ page: page - 1 }} />
              </PaginationItem>

              <PaginationItem className="hidden sm:block">
                <PaginationLink isActive>
                  Page {page} of {data.characters.info.pages}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext to={Route.to} search={{ page: page + 1 }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
