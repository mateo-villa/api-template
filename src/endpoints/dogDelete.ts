import { Bool, OpenAPIRoute, Num } from "chanfana";
import { z } from "zod";
import { Dog } from "../types";

let dogs = require("../dogStorage");

export class DogDelete extends OpenAPIRoute {
  schema = {
    tags: ["Dog"],
    summary: "Delete a Dog",
    request: {
      params: z.object({
        dogSlug: Num({ description: "Dog slug" }),
      }),
    },
    responses: {
      "200": {
        description: "Returns if the Dog was deleted successfully",
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

    // Retrieve the validated slug
    const { dogSlug } = data.params;

    // Implement your own object deletion here
    const deletedDog = dogs.dogList.pop(dogSlug);

    // Return the deleted task for confirmation
    return {
      result: {
        dog: deletedDog,
      },
      success: true,
    };
  }
}
