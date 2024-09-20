import { fromHono } from "chanfana";
import { Hono } from "hono";
import { cors } from "hono/cors";

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
openapi.post("/api/v1/dog", DogCreate);
openapi.get("/api/v1/dog", DogList);
openapi.get("/api/v1/dog/:dogSlug", DogFetch);
openapi.delete("/api/v1/dog/:dogSlug", DogDelete);

// Export the Hono app
export default app;
