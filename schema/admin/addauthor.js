import { z } from 'zod';

export const addAuthorSchema = z.object({
  author: z
    .string()
    .nonempty({ message: 'Author Name is mandatory' })
    .describe({
      label: 'Author Name',
      placeholder: 'Enter the author\'s name',
      type: 'text',
    }),

  email: z
    .string()
    .nonempty({ message: 'Email is mandatory' })
    .email({ message: 'Invalid email address' })
    .describe({
      label: 'Email',
      placeholder: 'Enter the author\'s email',
      type: 'email',
    }),

  role: z
    .string()
    .nonempty({ message: 'Role is mandatory' })
    .describe({
      label: 'Role',
      placeholder: 'Enter the author\'s role',
      type: 'text',
    }),

  designation: z
    .string()
    .nonempty({ message: 'Designation is mandatory' })
    .describe({
      label: 'Designation',
      placeholder: 'Enter the author\'s designation',
      type: 'text',
    }),

    image: z
    .instanceof(File)
    .refine(file => file.size > 0, {
      message: 'Image is mandatory',
    })
    .refine(file => file.size <= 4 * 1024 * 1024, { // 4MB
      message: 'Image size must not exceed 4MB',
    })
    .describe({
      label: 'Profile Picture URL',
      placeholder: 'Enter the profile picture URL',
      type: 'file',
    }),
});