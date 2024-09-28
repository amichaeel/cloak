import { z } from "zod";
import { forms } from "~/server/db/schema";  // Ensure forms table is imported

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const formRouter = createTRPCRouter({
  // Mutation to create a new form
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(forms).values({
        title: input.title,        // Title field from schema
        userId: Number(ctx.session.user.id),  // Convert user ID to a number
      });
    }),

  // Query to get the latest form
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const form = await ctx.db.query.forms.findFirst({
      orderBy: (forms, { desc }) => [desc(forms.createdAt)],
    });

    return form ?? null;
  }),

  // Protected procedure to get a secret message
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
