// /lib/validators.ts
import { z } from 'zod';

// Step 1: Business Info Validation
export const businessInfoSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  businessType: z.enum(['SARL', 'SA', 'GIE', 'ETS'], {
    message: 'You need to select a business type.'
  }),
  rcNumber: z.string().optional(),
  activityCategory: z.string().min(3, { message: 'Activity is required.' }),
  region: z.string().min(1, { message: 'Please select a region.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  businessPhone: z.string().min(9, { message: 'A valid phone number is required.' }),
  businessEmail: z.string().email({ message: 'A valid email is required.' }),
});

// Step 2 & 3: Founder/Shareholder Validation
export const founderSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name is required.' }),
  nationalId: z.string().min(5, { message: 'A valid National ID number is required.' }),
  phone: z.string().min(9, { message: 'A valid phone number is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
  role: z.string().min(2, { message: 'Role is required.' }),
  shareholding: z.coerce.number().min(0).max(100, { message: 'Shareholding must be between 0 and 100.' }), // Remove coerce
  nationality: z.string().min(2, { message: 'Nationality is required.' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required.' }),
});

// Validation for the entire shareholders step
export const shareholdersSchema = z.object({
  shareholders: z.array(founderSchema)
});

// Step 4: Document Upload Validation (validating filenames)
export const documentUploadsSchema = z.object({
  nationalId: z.string().min(1, { message: "National ID upload is required." }),
  proofOfAddress: z.string().min(1, { message: "Proof of Address is required." }),
  attestationOfNonConviction: z.string().min(1, { message: "Attestation of Non-Conviction is required." }),
  photoOrSelfie: z.string().min(1, { message: "Photo/Selfie is required." }),
  articlesOfAssociation: z.string().optional(),
  businessLicense: z.string().optional(),
});