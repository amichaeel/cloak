import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { forms } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";

const FormFieldSchema = z.object({
  id: z.string(),
  type: z.string(),
  props: z.record(z.unknown()),
});

const FormDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  fields: z.array(FormFieldSchema),
});

export const formRouter = createTRPCRouter({
  submit: protectedProcedure
    .input(FormDataSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("Received form data:", JSON.stringify(input, null, 2));
      console.log("Session user:", ctx.session?.user);

      if (!ctx.session?.user?.id) {
        console.error("User ID is missing from the session");
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User must be logged in to submit forms",
        });
      }

      try {
        console.log("Attempting to insert form data into database");
        const result = await ctx.db
          .insert(forms)
          .values({
            postData: JSON.stringify(input),
            userId: sql`DEFAULT`,
            title: input.title,
            createdBy: ctx.session.user.id,
            createdAt: new Date(),
          })
          .returning();

        console.log("Form data inserted successfully:", result[0]);
        return result[0];
      } catch (error) {
        console.error("Error submitting form to DB:", error);

        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Failed to submit form: ${error.message}`,
            cause: error,
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred while submitting the form",
          });
        }
      }
    }),
});