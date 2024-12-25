import { Hono } from "hono";
import { logger } from "./utils.js";
import { NewTodo } from "./entities.js";
import { TodoService } from './services.js';
import { TodoRepository } from './repositories.js';

const router = new Hono();
const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);

router.get("/", async (ctx) => {
    try {
        logger.info("[!] All todos [GET]");
        const alltodos = await todoService.getAllTodos();
        logger.info("[*] SUCCESS: All todos: [GET]");
        ctx.status(200);
        return ctx.json({ success: true, data: { todos: alltodos } });
    } catch (error: any) {
        logger.error("[!] ERROR: All todos: [GET]");
        ctx.status(500);
        return ctx.json({ success: false, message: `Something went wrong!` });
    }
});

router.post("/", async (ctx) => {
    try {
        logger.info("[!] CREATE User [POST]");
        const { title, description }: NewTodo = await ctx.req.json();
        if (title === "" || description === "") {
            throw new Error("All fields required!");
        }
        const newTodo = await todoService.createTodo({ title, description });
        logger.info("[*] SUCCESS: CREATE todos: [POST]");
        ctx.status(200);
        return ctx.json({ success: true, data: { todos: newTodo } });
    } catch (error: any) {
        logger.error(`[!] ERROR: CREATE todos: [POST] ${error.message}`);
        ctx.status(500);
        return ctx.json({ success: false, message: `Something went wrong!` });
    }
});

// router.get("/:id", async (ctx) => {
//     try {
//         logger.info("[!] Single User [GET]");
//         const userId = ctx.req.param("id");
//         const user = await User.findById(userId).exec();
//         logger.info({ user }, "[!] SUCCESS: Single User: [GET]");
//         ctx.status(200);
//         return ctx.json({ success: true, data: { user } });
//     } catch (error: any) {
//         logger.error("[!] ERROR: Single User: [GET]");
//         ctx.status(500);
//         return ctx.json({ success: false, message: `Something went wrong!` });
//     }
// });

// router.put("/:id", async (ctx) => {
//     try {
//         logger.info("[!] Single User [GET]");
//         const userId = ctx.req.param("id");
//         const user = await User.findById(userId).exec();
//         logger.info({ user }, "[!] SUCCESS: Single User: [GET]");
//         ctx.status(200);
//         return ctx.json({ success: true, data: { user } });
//     } catch (error: any) {
//         logger.error("[!] ERROR: Single User: [GET]");
//         ctx.status(500);
//         return ctx.json({ success: false, message: `Something went wrong!` });
//     }
// });

export default router;