import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
    driver: "pglite",
    schema: './src/db.ts',
    out: "./migrations"
})
