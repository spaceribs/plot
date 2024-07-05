#!/usr/bin/env -S deno run -A --watch=static/,routes/

import { configure, getConsoleSink } from "@logtape/logtape";

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";

await configure({
  sinks: { console: getConsoleSink() },
  filters: {},
  loggers: [{ category: "fedify", sinks: ["console"], level: "info" }],
});

await dev(import.meta.url, "./main.ts", config);
