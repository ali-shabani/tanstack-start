// app/routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <Link to="/rick-and-morty/characters">Rick and Morty</Link>
    </div>
  );
}
