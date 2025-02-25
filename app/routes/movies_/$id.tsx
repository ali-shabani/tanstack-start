import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies_/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const response = await fetch(`https://omdbapi.com/?i=${params.id}`);
    const data = await response.json();
    return {
      id: params.id,
      data,
    };
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <div>{JSON.stringify(data.data, undefined, 2)}</div>;
}
