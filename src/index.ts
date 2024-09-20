import { fromHono } from "chanfana";
import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { cors } from "hono/cors";

import { DogCreate } from "./endpoints/dogCreate";
import { DogFetch } from "./endpoints/dogFetch";
import { DogList } from "./endpoints/dogList";
import { DogDelete } from "./endpoints/dogDelete";

// Start a Hono app
const app = new Hono();
app.use("/api/v1/dog", cors());
app.use(
  "/api/v1/rename",
  basicAuth({
    verifyUser: (username, password, c) => {
      return (
        username === `${c.env.ADMIN_USERNAME}` &&
        password === `${c.env.ADMIN_PASSWORD}`
      );
    },
  })
);

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
