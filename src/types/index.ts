// /types/index.ts

export interface BusinessInfo {
  businessName: string;
  businessType: 'SARL' | 'SA' | 'GIE' | 'ETS';
  rcNumber?: string;
  activityCategory: string;
  region: string;
  city: string;
  businessPhone: string;
  businessEmail: string;
}

export interface Founder {
  fullName: string;
  nationalId: string;
  phone: string;
  email: string;
  role: string;
  shareholding: number; // Make sure this is number, not string
  nationality: string;
  dateOfBirth: string; // Using string for simplicity with input type="date"
}

export interface DocumentUploads {
  nationalId: string; // Changed from File | null to string to match validator
  businessLicense?: string;
  articlesOfAssociation?: string;
  attestationOfNonConviction: string; // Changed to required string
  proofOfAddress: string; // Changed to required string
  photoOrSelfie: string; // Changed to required string
}

// This will hold the entire state for the registration form
export interface RegistrationData {
  businessInfo?: BusinessInfo;
  primaryContact?: Founder;
  shareholders?: Founder[];
  documents?: DocumentUploads;
}