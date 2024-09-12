import { fromHono } from "chanfana";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";

import { DogCreate } from "./endpoints/dogCreate";
import { DogFetch } from "./endpoints/dogFetch";
import { DogList } from "./endpoints/dogList";
import { DogDelete } from "./endpoints/dogDelete";

// Start a Hono app
const app = new Hono();
app.use("/api/v1/dog", cors());

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

// Register OpenAPI endpoints
openapi.get("/api/tasks", TaskList);
openapi.post("/api/tasks", TaskCreate);
openapi.get("/api/tasks/:taskSlug", TaskFetch);
openapi.delete("/api/tasks/:taskSlug", TaskDelete);

openapi.post("/api/v1/dog", DogCreate);
openapi.get("/api/v1/dog/:dogSlug", DogFetch);
openapi.get("/api/v1/dog", DogList);
openapi.delete("/api/v1/dog/:dogSlug", DogDelete);

// Export the Hono app
export default app;
