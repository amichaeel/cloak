// ~/server/api/hydrationRouter.ts
import { createTRPCRouter } from "~/server/api/trpc";
import { formRouter } from "~/server/api/routers/forms";

// Create a lightweight router with only queries (no mutations or protected routes)
export const hydrationRouter = createTRPCRouter({
  getLatest: formRouter.getLatest,  // Include only the queries for hydration
});
