export type People = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
};

export const fakePeople: People[] = [
  {
    name: "Luke Skywalker",
    birth_year: "19BBY",
    eye_color: "blue",
    gender: "male",
    hair_color: "blond",
    height: "172",
    mass: "77",
    skin_color: "fair",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
    ],
    species: [],
    starships: [
      "https://swapi.dev/api/starships/12/",
      "https://swapi.dev/api/starships/22/",
    ],
    vehicles: [
      "https://swapi.dev/api/vehicles/14/",
      "https://swapi.dev/api/vehicles/30/",
    ],
    url: "https://swapi.dev/api/people/1/",
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
  },
  {
    name: "Leia Organa",
    birth_year: "19BBY",
    eye_color: "brown",
    gender: "female",
    hair_color: "brown",
    height: "150",
    mass: "49",
    skin_color: "light",
    homeworld: "https://swapi.dev/api/planets/2/",
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
    ],
    species: [],
    starships: [],
    vehicles: ["https://swapi.dev/api/vehicles/30/"],
    url: "https://swapi.dev/api/people/5/",
    created: "2014-12-10T15:20:09.791000Z",
    edited: "2014-12-20T21:17:50.315000Z",
  },
  {
    name: "Darth Vader",
    birth_year: "41.9BBY",
    eye_color: "yellow",
    gender: "male",
    hair_color: "none",
    height: "202",
    mass: "136",
    skin_color: "white",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
    ],
    species: [],
    starships: [],
    vehicles: [],
    url: "https://swapi.dev/api/people/4/",
    created: "2014-12-10T15:18:20.704000Z",
    edited: "2014-12-20T21:17:50.313000Z",
  },
];
