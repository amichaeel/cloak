import { relations, sql } from "drizzle-orm";
import {
  integer,
  serial,
  varchar,
  timestamp,
  jsonb,
  pgTableCreator
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `cloak`);

// Users Table
export const users = createTable('user', {
  id: serial('id').primaryKey(),
  userName: varchar('user_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Forms Table
export const forms = createTable('form', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  userId: integer('user_id').notNull().references(() => users.id),  // Link to Users
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  schema: jsonb('schema').notNull(),  // Store the form structure as JSON
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