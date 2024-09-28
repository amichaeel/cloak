import { formRouter } from "~/server/api/routers/forms";  // Import form router
import { createTRPCRouter } from "~/server/api/trpc";
import { createTRPCContext } from "~/server/api/trpc";  // Import your context

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  form: formRouter,  // Use form router here
});

// Export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = await createCaller({ headers: req.headers });
 * const res = await trpc.form.getLatest();
 *       ^? Form[]
 */
export const createCaller = async (opts: { headers: Headers }) => {
  const ctx = await createTRPCContext(opts);  // Await the context
  return appRouter.createCaller(ctx);  // Return a caller for the resolved context
};
