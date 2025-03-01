import { z } from 'zod';

export const addCategorySchema = z.object({
  category: z
    .string()
    .nonempty({ message: 'Category Name is mandatory' })
    .describe({
      label: 'Category Name',
      placeholder: 'Enter the category name',
      type: 'text',
    }),

  slug: z
    .string()
    .nonempty({ message: 'Slug is mandatory' })
    .describe({
      label: 'Slug',
      placeholder: 'Enter the slug for the category',
      type: 'text',
    }),

  description: z
    .string()
    .nonempty({ message: 'Description is mandatory' })
    .describe({
      label: 'Description',
      placeholder: 'Enter a description for the category',
      type: 'textarea', // assuming it's a larger text area field for descriptions
    }),
});
