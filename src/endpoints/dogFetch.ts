import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { Dog } from "../types";

const dogList = require("../dogStorage");

export class DogFetch extends OpenAPIRoute {
  schema = {
    tags: ["Dog"],
    summary: "Get a Dog by URL slug",
    request: {
      params: z.object({
        dogSlug: Str({ description: "URL slug" }),
      }),
    },
    responses: {
      "200": {
        description: "Returns a Dog if found",
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
      "404": {
        description: "Dog not found",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                error: Str(),
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

    // Implement your own object fetch here

    const exists = true;
    console.log(dogList);

    // @ts-ignore: check if the object exists
    if (exists === false) {
      return Response.json(
        {
          success: false,
          error: "Object not found",
        },
        {
          status: 404,
        }
      );
    }

    return {
      success: true,
      task: {
        name: "my task",
        slug: dogSlug,
        description: "this needs to be done",
        completed: false,
        due_date: new Date().toISOString().slice(0, 10),
      },
    };
  }
}
