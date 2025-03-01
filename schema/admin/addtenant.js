import { z } from 'zod';

// Zod schema for form validation
export const addTenantSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .describe({
      label: "First Name",
      placeholder: "Enter First name",
      type: "text",
    }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .describe({
      label: "Last Name",
      placeholder: "Enter Last name",
      type: "text",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .describe({
      label: "Email Address",
      placeholder: "Enter your email",
      type: "email",
    }),
  mobile: z
    .string()
    .min(10, { message: "Mobile number is required" })
    .describe({
      label: "Mobile Number",
      placeholder: "Enter your mobile number",
      type: "text",
    }),
  countryCode: z
    .string()
    .describe({
      label: "Country Code",
      placeholder: "select your Country Code",
      type: "select",
      options: [
        { label: "India (+91)", value: "+91" },
        { label: "US (+1)", value: "+1" },
        { label: "UK (+44)", value: "+44" },
      ],
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
    password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
    .describe({
      label: 'Password',
      placeholder: 'Create a strong password',
      type: 'password'
    }),

  confirmPassword: z.string()
    .min(8, { message: "Password confirmation must be at least 8 characters long" })
    .describe({
      label: 'Confirm Password',
      placeholder: 'Re-enter your password',
      type: 'password'
    })
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});