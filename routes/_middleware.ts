import { FreshContext } from "$fresh/server.ts";
import { createFederation, MemoryKvStore, Person } from "@fedify/fedify";

const federation = createFederation<void>({
  kv: new MemoryKvStore(),
});

federation.setActorDispatcher("/users/{handle}", async (ctx, handle) => {
  if (handle !== "me") return null; // Other than "me" is not found.
  return new Person({
    id: ctx.getActorUri(handle),
    name: "Me", // Display name
    summary: "This is me!", // Bio
    preferredUsername: handle, // Bare handle
    url: new URL("/", ctx.url),
  });
});

export async function handler(req: Request, ctx: FreshContext) {
  const res = await federation.fetch(req, { contextData: undefined });
  if (res.status === 404) {
    const resp = await ctx.next();
    return resp;
  }
  return res;
}
