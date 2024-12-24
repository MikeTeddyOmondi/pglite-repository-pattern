CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"completed" boolean DEFAULT false
);
