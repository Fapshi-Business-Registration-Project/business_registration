// /context/RegistrationContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { RegistrationData } from '@/types';

interface RegistrationContextType {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  resetForm: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

const initialData: RegistrationData = {
    businessInfo: undefined,
    primaryContact: undefined,
    shareholders: [],
    documents: {
      nationalId: '',
      attestationOfNonConviction: '',
      proofOfAddress: '',
      photoOrSelfie: ''
    },
};

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<RegistrationData>(() => {
    if (typeof window === 'undefined') {
        return initialData;
    }
    try {
        const item = window.localStorage.getItem('registrationFormData');
        return item ? JSON.parse(item) : initialData;
    } catch (error) {
        console.error("Error reading from localStorage", error);
        return initialData;
    }
  });

  useEffect(() => {
    try {
        window.localStorage.setItem('registrationFormData', JSON.stringify(formData));
    } catch (error) {
        console.error("Error writing to localStorage", error);
    }
  }, [formData]);
  
  const resetForm = () => {
      setFormData(initialData);
      if (typeof window !== 'undefined') {
          window.localStorage.removeItem('registrationFormData');
      }
  };

  return (
    <RegistrationContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};