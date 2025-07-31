"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { RegistrationData, Application } from '@/types';
import { useAuthContext } from '@/hooks/useAuth';

interface RegistrationContextType {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  applications: Application[];
  addApplication: (data: RegistrationData) => Promise<void>;
  resetForm: () => void;
  isSubmitting: boolean;
  submissionError: Error | null;
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
  const { user } = useAuthContext();
  
  // Initialize with data from localStorage if user exists
  const [applications, setApplications] = useState<Application[]>(() => {
    if (typeof window === 'undefined' || !user) return [];
    try {
      const saved = localStorage.getItem(`fapshiApplications_${user.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState<RegistrationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<Error | null>(null);

  // Load user data when user changes
  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      try {
        const appsKey = `fapshiApplications_${user.id}`;
        const saved = localStorage.getItem(appsKey);
        setApplications(saved ? JSON.parse(saved) : []);
      } catch {
        setApplications([]);
      }
    } else {
      setApplications([]);
      setFormData(initialData);
    }
  }, [user]);

  // Save applications to localStorage
  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      try {
        localStorage.setItem(`fapshiApplications_${user.id}`, JSON.stringify(applications));
      } catch (error) {
        console.error('Failed to save applications:', error);
      }
    }
  }, [applications, user]);

  const addApplication = useCallback(async (data: RegistrationData) => {
    if (!user || !data.businessInfo) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const tempId = `temp_${Date.now()}`;
    const newApplication: Application = {
      ...data,
      id: tempId,
      status: 'Submitted',
      submittedDate: new Date().toISOString(),
      businessName: data.businessInfo.businessName,
      type: data.businessInfo.businessType,
      region: data.businessInfo.region,
      isOptimistic: true
    };

    // Add optimistically
    setApplications(prev => [newApplication, ...prev]);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Replace with server response
      const serverResponse: Application = {
        ...newApplication,
        id: `app_${Date.now()}`,
        isOptimistic: false
      };

      setApplications(prev => [
        serverResponse,
        ...prev.filter(app => app.id !== tempId)
      ]);

      setFormData(initialData);
    } catch (error) {
      // Remove on error
      setApplications(prev => prev.filter(app => app.id !== tempId));
      setSubmissionError(error as Error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [user]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
  }, []);

  const value = {
    formData,
    setFormData,
    applications,
    addApplication,
    resetForm,
    isSubmitting,
    submissionError
  };

  return (
    <RegistrationContext.Provider value={value}>
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