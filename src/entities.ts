import { todos } from "./db.js";

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
