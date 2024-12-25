import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

import { init } from "./db.js";
import todos from "./routes.js"
import { logger } from "./utils.js";

const app = new Hono();
const apiVersion = process.env.API_VERSION ?? "latest";

app.use(
    "*",
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:5000",
            "http://localhost:8000",
        ],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);
app.route("/api/v1/todos", todos);

(async () => {
    try {
        await init();
        
        const port = 3344;

        serve(
            {
                fetch: app.fetch,
                port,
            },
            (info) => {
                logger.info(`[*] Todo Service API v:${apiVersion}`);
                logger.info(`[*] Server listening: http://localhost:${info.port}`);
            }
        );

    } catch (error) {
        // console.error({ error })
        logger.error({ error }, "Application failed to start")
    }
})();
