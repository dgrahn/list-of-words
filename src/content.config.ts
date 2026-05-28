import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const wordsCollection = defineCollection({
  loader: glob({ pattern: '**/words.yml', base: "./src/content" }),
  schema: z.array(z.object({
    word: z.string()
  })),
});

export const collections = {
  'words': wordsCollection,
};
