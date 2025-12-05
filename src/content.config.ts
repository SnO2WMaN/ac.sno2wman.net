import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders"; // Not available with legacy API

const talks = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/talks",
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    authors: z.union([
      z.string(),
      z.array(
        z.union([z.string(), z.object({ name: z.string(), me: z.boolean() })])
      ),
    ]),
    date: z.date(),
    lang: z.union([z.literal("ja"), z.literal("en")]),
    conference: z.object({
      name: z.string(),
      at: z.string(),
      url: z.string().url().optional(),
    }),
    materials: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
  }),
});

const software = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/software",
  }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    slug: z.string(),
    authors: z.union([
      z.string(),
      z.array(
        z.union([z.string(), z.object({ name: z.string(), me: z.boolean() })])
      ),
    ]),
    relatedTalks: z.array(reference("talks")).optional(),
  }),
});

export const collections = { talks: talks, software: software };
