// /app/register/[step]/page.tsx
"use client";

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRegistration } from '@/contexts/RegistrationContext';

// Import form components
import BusinessInfoForm from '@/components/forms/BusinessInfoForm';
import PrimaryContactForm from '@/components/forms/PrimaryContactForm';
import ShareholdersForm from '@/components/forms/ShareholdersForm';
import DocumentUploadsForm from '@/components/forms/DocumentUploadsForm';
import SummaryView from '@/components/forms/SummaryView';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { STEPS } from '@/lib/constants';

const StepPage = () => {
  const params = useParams();
  const router = useRouter();
  const { formData } = useRegistration();
  const step = params.step as string;

  const currentStep = STEPS.find(s => s.path === step);
  const stepIndex = STEPS.findIndex(s => s.path === step);
  
  // Basic navigation protection
  useEffect(() => {
      if (stepIndex > 0 && !formData.businessInfo) {
          router.push(`/register/${STEPS[0].path}`);
      } else if (stepIndex > 1 && !formData.primaryContact) {
          router.push(`/register/${STEPS[1].path}`);
      }
  }, [stepIndex, formData, router]);


  const renderStepContent = () => {
    switch (step) {
      case 'business-info':
        return <BusinessInfoForm />;
      case 'primary-contact':
        return <PrimaryContactForm />;
      case 'shareholders':
        return <ShareholdersForm />;
      case 'documents':
        return <DocumentUploadsForm />;
      case 'summary':
        return <SummaryView />;
      default:
        router.push('/register/business-info');
        return <p>Invalid step. Redirecting...</p>;
    }
  };

  if (!currentStep) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step {currentStep.id}: {currentStep.name}</CardTitle>
        <CardDescription>Please fill out the details below.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderStepContent()}
      </CardContent>
    </Card>
  );
};

export default StepPage;