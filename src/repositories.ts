import { eq } from 'drizzle-orm';
import { db, todos } from './db.js';
import { NewTodo, Todo } from './entities.js';

export class TodoRepository {
    // Find a todo by ID
    async findById(id: number): Promise<Todo | null> {
        const [result] = await db.select().from(todos).where(eq(todos.id, id));
        return result || null;
    }

    // Get all todos
    async findAll(): Promise<Todo[]> {
        const result = await db.select().from(todos);
        return result as Todo[];
    }

    // Create a new todo
    async create(todo: NewTodo): Promise<Todo> {
        const [newTodo] = await db.insert(todos).values(todo).returning();
        return newTodo;
    }

    // Update a todo by ID
    async update(id: number, data: Partial<Todo>): Promise<Todo | null> {
        await db.update(todos).set(data).where(eq(todos.id, id));
        return this.findById(id);
    }

    // Delete a todo by ID
    async delete(id: number): Promise<boolean> {
        const [result] = await db.delete(todos).where(eq(todos.id, id)).returning();
        return result.id === id;
    }
}
