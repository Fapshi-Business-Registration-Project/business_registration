// Types for business registration
export interface BusinessDetails {
  name: string
  type: string
  registrationNumber?: string
  taxId?: string
}

export interface FounderDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface RegistrationStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
}
