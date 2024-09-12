import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Dog } from "../types";

const dogs = require("../dogStorage");

export class DogCreate extends OpenAPIRoute {
  schema = {
    tags: ["Dog"],
    summary: "Create a new Dog",
    request: {
      body: {
        content: {
          "application/json": {
            schema: Dog,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Returns the created Dog",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  dog: Dog,
                }),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(c) {
    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated request body
    const dogToCreate = data.body;

    // Implement your own object insertion here
    dogs.dogList.push(dogToCreate);

    // return the new task
    return {
      success: true,
      dog: {
        name: dogToCreate.name,
        breed: dogToCreate.breed,
        age: dogToCreate.age,
        trained: dogToCreate.trained,
      },
    };
  }
}
