import "server-only";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";
import { appRouter, type AppRouter } from "~/server/api/root"; // Import your appRouter and AppRouter type
import { createQueryClient } from "./query-client";
import { createTRPCContext } from "~/server/api/trpc"; // Import createTRPCContext

// Create the tRPC context for React Server Components (RSC)
const createContext = cache(async () => {
  const reqHeaders = headers();
  const newHeaders = new Headers(reqHeaders);
  newHeaders.set("x-trpc-source", "rsc");

  return await createTRPCContext({
    headers: newHeaders,
  });
});

// Cache the query client to reuse it
const getQueryClient = cache(createQueryClient);

// Modify caller to ensure it is awaited
const createCallerWithContext = async () => {
  const ctx = await createContext(); // Await the context creation
  return appRouter.createCaller(ctx); // Return the caller for the resolved context
};

// Export the hydration helpers
export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  await createCallerWithContext(),  // Await the caller before passing it to createHydrationHelpers
  getQueryClient
);
