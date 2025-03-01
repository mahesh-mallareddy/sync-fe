import { z } from 'zod';

export const addBlogSchema = z.object({
  title: z.string().nonempty({ message: 'Title is mandatory' }),
  content: z.string().nonempty({ message: 'Content is mandatory' }),
  // image: z.instanceof(File, { message: "Please upload an image file" }),
  category: z.string().nonempty({ message: 'Category is mandatory' }),
  createdBy: z.enum(['admin', 'user', 'management', 'support'], {
    message: 'Invalid role',
  }),
  authorName: z.string().nonempty({ message: 'Author name is mandatory' }),
  publishTime: z.string().nonempty({ message: 'Publish time is mandatory' }),
  publishedDate: z.string().nonempty({ message: 'Published date is mandatory' }),
  readTime: z.number().min(1, { message: 'Read time must be at least 1 minute' }),
  status: z.enum(['draft', 'publish', 'unpublish'], {
    message: 'select the status',
  }),
   image: z
    .instanceof(File)
    .refine(file => file.size > 0, {
      message: 'Image is mandatory',
    })
    .refine(file => file.size <= 4 * 1024 * 1024, { // 4MB
      message: 'Image size must not exceed 4MB',
    }),
});

