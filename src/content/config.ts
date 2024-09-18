import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		publishdate: z.coerce.date(),
		updateddate: z.coerce.date().optional(),
		cover: image()
	}),
});

export const collections = { blog };
