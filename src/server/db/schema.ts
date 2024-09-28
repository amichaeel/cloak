import {  relations, sql } from "drizzle-orm";
import {
  integer,
  serial,
  varchar,
  timestamp,
  jsonb,
  pgTableCreator,
  pgTable,
  uuid,
  index,
  primaryKey,
  text
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => name);  


// Users Table
export const users = pgTable('user', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),  // Use UUID for the id
  name: varchar('name', { length: 255 }),  // Add 'name' for NextAuth compatibility
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('email_verified', { withTimezone: true }),  // Add 'emailVerified'
  image: varchar('image', { length: 255 }),  // Add 'image' field
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  })
);
// Sessions Table (for session management)
export const sessions = pgTable('session', {
  sessionToken: varchar('session_token', { length: 255 }).primaryKey(),  // Now it's a primary key
  userId: uuid('user_id').notNull().references(() => users.id),  // Link to users table
  expires: timestamp('expires', { withTimezone: true }).notNull(),
});

// Verification Tokens Table (for email verification or password reset)
export const verificationTokens = pgTable('verification_token', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),  // Remove the primaryKey constraint
  expires: timestamp('expires', { withTimezone: true }).notNull(),
});
// Forms Table
export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  userId: integer("user_id").notNull(),  // Correct field for user reference
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// FormResponses Table
export const formResponses = createTable('form_response', {
  id: serial('id').primaryKey(),
  formId: integer('form_id').notNull().references(() => forms.id),  // Link to Forms
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  responseData: jsonb('response_data').notNull(),  // Store the form response data as JSON
});
// Define relationships using the `relations` helper
export const usersRelations = relations(users, ({ many }) => ({
  forms: many(forms), // A user can create many forms
}));

export const formsRelations = relations(forms, ({ one, many }) => ({
  user: one(users, { fields: [forms.userId], references: [users.id] }), // Each form belongs to one user
  responses: many(formResponses), // A form can have many responses
}));

export const formResponsesRelations = relations(formResponses, ({ one }) => ({
  form: one(forms, { fields: [formResponses.formId], references: [forms.id] }), // Each response belongs to one form
}));

