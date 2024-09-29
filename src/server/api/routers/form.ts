import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { forms } from "~/server/db/schema";
import { sql } from "drizzle-orm";

// Define a schema for the form field
const FormFieldSchema = z.object({
  id: z.string(),
  type: z.string(),
  props: z.record(z.unknown()),
});

// Define a schema for the form data
const FormDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  fields: z.array(FormFieldSchema),
});

export const formRouter = createTRPCRouter({
  submit: protectedProcedure
    .input(FormDataSchema)
    .mutation(async ({ ctx, input }) => {

      try {
        const result = await ctx.db
          .insert(forms)
          .values({
            postData: JSON.stringify(input),
            userId: sql`DEFAULT`,
            title: input.title,
            createdBy: ctx.session.user.id,
            createdAt: new Date(), // Explicitly set the creation date
          })
          .returning();

        return result[0]; // Return the inserted form
      } catch (error) {
        console.error("Error submiting form to DB:", error);
        throw new Error("Failed to submit form");
      }
    }),
});