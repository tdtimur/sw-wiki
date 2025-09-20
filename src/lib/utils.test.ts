// src/lib/utils.test.ts
import { capitalizeWords, parseSwapiPath } from "./utils";

describe("capitalizeWords", () => {
  it("capitalizes the first letter of each word", () => {
    expect(capitalizeWords("luke skywalker")).toBe("Luke Skywalker");
  });

  it("handles empty strings", () => {
    expect(capitalizeWords("")).toBe("");
  });
});

describe("parseSwapiPath", () => {
  const testCases: {
    name: string;
    input: string;
    expected: ReturnType<typeof parseSwapiPath>;
  }[] = [
    {
      name: "valid film path",
      input: "https://swapi.dev/api/films/1/",
      expected: { resource: "films", id: "1" },
    },
    {
      name: "valid people path without trailing slash",
      input: "https://swapi.dev/api/people/5",
      expected: { resource: "people", id: "5" },
    },
    {
      name: "invalid path missing id",
      input: "https://swapi.dev/api/films/",
      expected: null,
    },
    {
      name: "invalid path not starting with api",
      input: "https://swapi.dev/films/1",
      expected: null,
    },
    {
      name: "completely unrelated path",
      input: "https://example.com/hello",
      expected: null,
    },
    {
      name: "valid people path without hostname",
      input: "/api/people/5/",
      expected: { resource: "people", id: "5" },
    },
    {
      name: "valid species path without hostname, without trailing slash",
      input: "/api/species/5",
      expected: { resource: "species", id: "5" },
    },
  ];

  testCases.forEach(({ name, input, expected }) => {
    it(name, () => {
      expect(parseSwapiPath(input)).toEqual(expected);
    });
  });
});
