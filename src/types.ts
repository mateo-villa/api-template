import { Bool, DateTime, Num, Str } from "chanfana";
import { z } from "zod";

export const Task = z.object({
  name: Str({ example: "lorem" }),
  slug: Str(),
  description: Str({ required: false }),
  completed: z.boolean().default(false),
  due_date: DateTime(),
});

export const Dog = z.object({
  name: Str({ example: "Bits" }),
  breed: Str(),
  age: Num(),
  trained: Bool({ required: false, default: true }),
});
