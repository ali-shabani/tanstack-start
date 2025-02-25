import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, useState } from "react";

import { Route as MoviesIdRoute } from "./movies_/$id";

export const Route = createFileRoute("/movies")({
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <RouteComponent />
    </Suspense>
  ),
});

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

function RouteComponent() {
  const [title, setTitle] = useState("avatar");
  const { data } = useSuspenseQuery({
    queryKey: ["movies", title],
    queryFn: () =>
      fetch(`https://www.omdbapi.com/?s=${title}&apikey=d40ca3a8`)
        .then((res) => res.json())
        .then((data) => {
          if (!("Search" in data)) {
            throw new Error("No movies found");
          }

          return data.Search as Movie[];
        }),
  });

  return (
    <div className="max-w-4xl mx-auto p-6 m-8">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          name="title"
          placeholder="Search for movies..."
          className="w-full p-4 ps-12 text-sm text-gray-900 rounded-lg border border-gray-300 
                     bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                     transition-all duration-300 ease-in-out
                     hover:bg-white"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <ul className="flex flex-col gap-4">
        <Movies movies={data} />
      </ul>
    </div>
  );
}

function Movies({ movies }: { movies: Movie[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <Link to={MoviesIdRoute.to} params={{ id: movie.imdbID }}>
            {movie.Title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
