import { readFile, writeFile } from "node:fs/promises";

import { createServerFn } from "@tanstack/start";

const filePath = "count.txt";

async function readCount() {
  return parseInt(await readFile(filePath, "utf-8").catch(() => "0"));
}

export const getCount = createServerFn({
  method: "GET",
}).handler(() => {
  return readCount();
});

export const updateCount = createServerFn({ method: "POST" })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await writeFile(filePath, `${count + data}`);
  });

export const getName = createServerFn({ method: "GET" }).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return "John Doe";
});
