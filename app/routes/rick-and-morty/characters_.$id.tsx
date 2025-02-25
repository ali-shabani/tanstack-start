import { useSuspenseQuery } from "@apollo/client/react/hooks/useSuspenseQuery";
import {
  createFileRoute,
  ErrorComponentProps,
  Link,
  notFound,
} from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { ZodError } from "zod";

import { CharacterEpisodes } from "@/components/character/episodes";
import { CHARACTER_EPISODES } from "@/components/character/episodes";
import {
  CHARACTER_LOCATION,
  CharacterLocation,
} from "@/components/character/location";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { graphql } from "@/gql";

export const Route = createFileRoute("/rick-and-morty/characters_/$id")({
  component: RouteComponent,
  beforeLoad: ({ params }) => {
    z.coerce.number().parse(params.id);
  },
  loader: async ({ params, context: { apolloClient } }) => {
    const { id } = params;
    await apolloClient
      .query({
        query: CHARACTER_QUERY,
        variables: { id },
      })
      .catch(() => {
        throw notFound();
      });
  },
  notFoundComponent: CharacterNotFound,
  pendingMs: 0,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ErrorComponent,
});

const CHARACTER_QUERY = graphql(
  `
    query Character($id: ID!) {
      character(id: $id) {
        id
        name
        status
        species
        type
        gender
        image
        created
        ...CharacterLocation
        ...CharacterEpisodes
      }
    }
  `,
  [CHARACTER_LOCATION, CHARACTER_EPISODES]
);

function ErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isZodError = error instanceof Error && error.name === "ZodError";

  const getZodErrorMessage = (error) => {
    if (!(error instanceof ZodError)) {
      error = new ZodError(JSON.parse(error.message));
    }
    return error.issues
      .map((issue) => {
        const path = issue.path.length > 0 ? `[${issue.path.join(".")}] ` : "";
        const emoji =
          {
            invalid_type: "❌",
            invalid_string: "📝",
            invalid_number: "🔢",
            too_small: "⬇️",
            too_big: "⬆️",
          }[issue.code] || "⚠️";

        return `${emoji} ${path}${issue.message}`;
      })
      .join("\n");
  };

  return (
    <div className="container mx-auto py-20">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-3xl">Oops! Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-4xl">{isZodError ? "🔢" : "⚠️"}</div>
          <p className="text-xl text-muted-foreground">
            {isZodError
              ? "Invalid character ID. Please use a valid number."
              : "We encountered an error while fetching the character data."}
          </p>
          <p className="text-sm text-muted-foreground">
            {getZodErrorMessage(error)}
          </p>
          <div className="flex justify-center gap-4">
            {isZodError ? (
              <Link
                to=".."
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                ← Back to Characters List
              </Link>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  router.invalidate();
                }}
              >
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CharacterNotFound() {
  return (
    <div className="container mx-auto py-20">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-3xl">404</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-4xl">🔍</div>
          <p className="text-xl text-muted-foreground">
            Oops! This character seems to have slipped into another dimension.
          </p>
          <Link
            to=".."
            className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
          >
            ← Return to Characters List
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(CHARACTER_QUERY, {
    variables: { id },
  });

  const { character } = data;

  if (!character) {
    return <CharacterNotFound />;
  }

  return (
    <div className="container mx-auto py-10">
      <Link
        from={Route.fullPath}
        to=".."
        className="inline-flex cursor-pointer items-center mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to Characters
      </Link>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={character?.image ?? ""}
              alt={character?.name ?? ""}
            />
            <AvatarFallback>
              {character?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-2xl">{character.name}</CardTitle>
            <div className="flex gap-2">
              <Badge
                variant={
                  character?.status?.toLowerCase() === "alive"
                    ? "default"
                    : "destructive"
                }
              >
                {character.status}
              </Badge>
              <Badge variant="outline">{character.species}</Badge>
              {character.type && (
                <Badge variant="outline">{character.type}</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="font-medium">{character.gender}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="font-medium">
                {new Date(character?.created ?? "").toLocaleDateString()}
              </p>
            </div>
          </div>
          <CharacterLocation from={character} />
          <CharacterEpisodes from={character} />
        </CardContent>
      </Card>
    </div>
  );
}
