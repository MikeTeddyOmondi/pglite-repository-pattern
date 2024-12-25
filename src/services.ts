// user.service.ts
import { NewTodo, Todo } from './entities.js';
import { TodoRepository } from './repositories.js';

export class TodoService {
    private todos: TodoRepository;

    constructor(todoRepository: TodoRepository) {
        this.todos = todoRepository;
    }

    async getTodoById(id: number): Promise<Todo | null> {
        return this.todos.findById(id);
    }

    async getAllTodos(): Promise<Todo[]> {
        return this.todos.findAll();
    }

    async createTodo(todo: NewTodo): Promise<Todo> {
        return this.todos.create(todo);
    }

    async updateTodo(id: number, userData: Partial<Todo>): Promise<Todo | null> {
        return this.todos.update(id, userData);
    }

    async deleteTodo(id: number): Promise<boolean> {
        return this.todos.delete(id);
    }
}
