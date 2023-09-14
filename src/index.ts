import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { users } from "./routes";
import { cors } from "hono/cors";

const app = new Hono();

// Middlewares
app.use("*", cors());

// Error Handlers
app.notFound((c) => c.json({ ok: false, message: "Not Found" }, 404));

// Root Route
app.get("/", (c) => c.json({ ok: true, message: "Hello World" }));

// Routes
app.route("/users", users);

serve(app, () => console.log("Server is running on http://localhost:3000"));
