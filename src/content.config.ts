import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders"; // Not available with legacy API

const talks = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/talks",
  }),
  schema: z.object({
    title: z.string(),
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

const notes = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/notes",
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    materials: z.array(
      z.object({
        name: z.string(),
        url: z.string().url(),
      })
    ),
  }),
});

const formalizations = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/formalizations",
  }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    authors: z.union([
      z.string(),
      z.array(
        z.union([z.string(), z.object({ name: z.string(), me: z.boolean() })])
      ),
    ]),
    lastUpdate: z.date(),
    related: z
      .array(
        z.union([
          z.object({
            type: z.literal("talks"),
            entry: reference("talks"),
          }),
          z.object({
            type: z.literal("notes"),
            entry: reference("notes"),
          }),
        ])
      )
      .optional(),
  }),
});

export const collections = {
  talks: talks,
  formalizations: formalizations,
  notes,
};
