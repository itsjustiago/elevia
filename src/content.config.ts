import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    client: z.string().optional(),
    role: z.string(),
    year: z.union([z.string(), z.number()]),
    stack: z.array(z.string()),
    cover: z.string().optional(),
    accent: z.string().optional(),
    url: z.string().url().optional(),
    locale: z.enum(['pt', 'en']).default('pt'),
    demo: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { projects };
