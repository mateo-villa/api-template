import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Dog } from "../types";

const dogList = require("../dogStorage");

export class DogList extends OpenAPIRoute {
  schema = {
    tags: ["Dog"],
    summary: "List all Dogs",
    request: {
      query: z.object({
        page: Num({
          description: "Page number",
          default: 0,
        }),
        isCompleted: Bool({
          description: "Filter by completed flag",
          required: false,
        }),
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of Dogs",
        content: {
          "application/json": {
            schema: z.object({
              series: z.object({
                success: Bool(),
                result: z.object({
                  dogs: Dog.array(),
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

    // Retrieve the validated parameters
    const { page, isCompleted } = data.query;

    // Implement your own object list here

    return {
      success: true,
      dogs: dogList,
    };
  }
}
