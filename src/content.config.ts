import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("Marcus Quirino"),
    tags: z.array(z.string()).default([]),
    category: z.string().default("geral"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
