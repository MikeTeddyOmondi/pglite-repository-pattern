import { init } from "./db.js";
import { TodoService } from './services.js';
import { TodoRepository } from './repositories.js';

(async () => {
    try {
        await init();

        const todoRepository = new TodoRepository();
        const todoService = new TodoService(todoRepository);

        // Create todos
        // const todo1 = await todoService.createTodo({ id: 1, title: 'todo one', description: 'todo one desc' });
        // const todo2 = await todoService.createTodo({ id: 2, title: 'todo two', description: 'todo two desc' });

        console.log('All Todos:', await todoService.getAllTodos());

        // Update todos
        // await todoService.updateTodo(1, { title: 'todo one updated' });
        // console.log('todo1 after update:', await todoService.getUserById(1));

        // // Delete todos
        // await todoService.deleteTodo(2);
        // console.log('All todos after deletion:', await todoService.getAllTodos());

    } catch (error) {
        console.error({ error })
    }
})();