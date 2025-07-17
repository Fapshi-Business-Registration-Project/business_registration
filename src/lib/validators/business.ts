// import { z } from "zod"

// export const businessDetailsSchema = z.object({
//   name: z.string().min(2, "Business name must be at least 2 characters"),
//   type: z.string().min(1, "Please select a business type"),
//   registrationNumber: z.string().optional(),
//   taxId: z.string().optional(),
// })

// export const founderDetailsSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   phone: z.string().min(10, "Please enter a valid phone number"),
//   role: z.string().min(1, "Please select a role"),
// })

// export const addressSchema = z.object({
//   street: z.string().min(5, "Please enter a valid street address"),
//   city: z.string().min(2, "Please enter a valid city"),
//   state: z.string().min(2, "Please enter a valid state"),
//   postalCode: z.string().min(4, "Please enter a valid postal code"),
//   country: z.string().min(2, "Please select a country"),
// })
