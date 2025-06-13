import { defineCollection, z } from "astro:content";

const countriesCollection = defineCollection({
  type: "data",
  schema: z.object({
    code: z.string(),
    name: z.string(),
    capital: z.string().optional(),
    flag: z.string().url(),
    region: z.string(),
    population: z.number(),
  }),
});

export const collections = {
  countries: countriesCollection,
};
