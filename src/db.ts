// schema
import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const todos = pgTable('todos', {
    id: serial().primaryKey().notNull(),
    title: text(),
    description: text(),
    completed: boolean().default(false)
})

// db
import { join } from "node:path";
import { cwd } from "node:process";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from 'drizzle-orm/pglite';

const PG_DATA = join(cwd(), "pg_data");

const pglite = new PGlite(PG_DATA, {});

export const db = drizzle({ client: pglite, schema: { todos } });

export async function init() {
    await pglite.exec(`
      CREATE TABLE IF NOT EXISTS "todos" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" text,
        "description" text,
        "completed" boolean DEFAULT false
      );
    `);
}