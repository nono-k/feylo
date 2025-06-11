import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        draft: z.boolean(),
        date: z.date(),
        tags: z.array(z.string()),
        image: z.string(),
      }),
    }),
  },
});
