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
        summaryText: z.string().optional(),
        summaryList: z.array(z.string()).optional(),
      }),
    }),
    components: defineCollection({
      type: 'page',
      source: 'components/*.md',
      schema: z.object({
        draft: z.boolean(),
        image: z.string(),
      }),
    }),
    animation: defineCollection({
      type: 'page',
      source: 'animation/**/**/*.md',
      schema: z.object({
        draft: z.boolean(),
        order: z.number(),
        update: z.date(),
        group: z.string(),
        image: z.string(),
        demoUrl: z.string().optional(),
        demoCode: z.string().optional(),
        pointList: z.array(z.string()).optional(),
      }),
    }),
  },
});
