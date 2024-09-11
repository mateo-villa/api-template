import { Dog } from "./types";

let dogList = Array(
  Dog.parse({
    name: "Bits",
    breed: "Hound",
    age: 2,
    trained: true,
  }),
  Dog.parse({
    name: "Bots",
    breed: "Hound",
    age: 3,
    trained: false,
  })
);

module.exports = { dogList };
