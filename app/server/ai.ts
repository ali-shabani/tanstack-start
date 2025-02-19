import { generateText, streamText, tool } from "ai";
import { z } from "zod";
import { createOllama } from "ollama-ai-provider";
import { createServerFn } from "@tanstack/start";

export async function getWeather({ location }: { location: string }) {
  const ollama = createOllama({
    // optional settings, e.g.
    baseURL: "http://localhost:11434/api",
  });

  const model = ollama("llama3.2");

  const result = await streamText({
    model,
    tools: {
      weather: tool({
        description: "Get the weather in a location",
        parameters: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => {
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?q=${location}&key=51832f67a1b14a48acd153451251802`
          );
          const data = await response.json();
          return data;
        },
      }),
    },
    maxSteps: 5,
    system: `You are a helpful assistant that can answer questions and help with tasks. based on the weather temperature and winds tell the user if they should wear a jacket or not.`,
    prompt: `What is the weather in ${location}?`,
  });

  return result.text;
}

export const weather = createServerFn({
  method: "POST",
})
  .validator(z.object({ location: z.string() }))
  .handler(({ data: { location } }) => {
    return getWeather({ location });
  });
