// app/routes/index.tsx
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { getCount, getName, updateCount } from "../server/count";
import { Suspense, use, useEffect, useState } from "react";
import { getWeather, weather } from "../server/ai";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <Link to="/rick-and-morty">Rick and Morty</Link>
    </div>
  );
}
