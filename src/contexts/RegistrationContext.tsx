// /context/RegistrationContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { RegistrationData, Application } from '@/types';
import { mockApplications } from '@/lib/mock-data'; // We'll use this for initial data

interface RegistrationContextType {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  applications: Application[];
  addApplication: (data: RegistrationData) => void;
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

const APPLICATIONS_STORAGE_KEY = 'fapshiApplications';
const FORM_DATA_STORAGE_KEY = 'registrationFormData';

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<RegistrationData>(() => {
    if (typeof window === 'undefined') return initialData;
    const item = window.localStorage.getItem(FORM_DATA_STORAGE_KEY);
    return item ? JSON.parse(item) : initialData;
  });
  
  const [applications, setApplications] = useState<Application[]>(() => {
      if (typeof window === 'undefined') return mockApplications;
      const item = window.localStorage.getItem(APPLICATIONS_STORAGE_KEY);
      // Initialize with mock data if localStorage is empty
      return item ? JSON.parse(item) : mockApplications;
  });

  useEffect(() => {
    window.localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);
  
  useEffect(() => {
    window.localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);
  
  const addApplication = (data: RegistrationData) => {
      if (!data.businessInfo || !data.primaryContact) return;

      const newApplication: Application = {
          id: new Date().toISOString(), // Simple unique ID
          businessName: data.businessInfo.businessName,
          type: data.businessInfo.businessType,
          region: data.businessInfo.region,
          submittedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
          status: 'Submitted', // New applications are 'Submitted'
      };

      setApplications(prev => [newApplication, ...prev]);
  };

  const resetForm = () => {
      setFormData(initialData);
      window.localStorage.removeItem(FORM_DATA_STORAGE_KEY);
  };

  return (
    <RegistrationContext.Provider value={{ formData, setFormData, applications, addApplication, resetForm }}>
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