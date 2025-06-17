import { slide } from "astro/virtual-modules/transitions.js";
import { defineCollection, z } from "astro:content";

const countriesCollection = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    code: z.string(),
    name: z.string(),
    capital: z.string().optional(),
    flag: z.string().url(),
    region: z.string(),
    population: z.number(),
    borders: z.array(z.string()).default([]),
    languages: z.array(z.string()).default([]),
    maps: z.array(z.string()).default([]),
    latlng: z.array(z.number()).length(2).default([0, 0]),
  }),
});

export const collections = {
  countries: countriesCollection,
};
