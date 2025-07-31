"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/contexts/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";

const SummaryItem = ({ label, value }: { label: string; value?: string | number }) => (
  <div className="flex justify-between py-2 border-b">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-sm text-gray-900">{value || 'N/A'}</p>
  </div>
);

const SummaryView = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { formData, addApplication, resetForm } = useRegistration();

  // ✅ FIX #1: Make the handler async to use await
  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // ✅ FIX #2: Await the completion of the addApplication function
      // This ensures the data is saved BEFORE moving to the next step.
      await addApplication(formData);

      // ✅ FIX #3: These actions now run only AFTER the submission is successful.
      toast.success("Application Submitted!", {
        description: "Your registration is now In Review. Redirecting to dashboard...",
      });

      // Reset the form only after a successful submission.
      resetForm();

      // Redirect after a delay.
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error) {
      // Handle any errors that might occur during submission.
      console.error("Submission Failed:", error);
      toast.error("Submission Failed", {
        description: "There was an error submitting your application. Please try again.",
      });
      // Allow the user to try again if it fails.
      setIsSubmitting(false);
    }
  };
  
  const { businessInfo, primaryContact, shareholders, documents } = formData;
  const allShareholders = [
    ...(primaryContact ? [{...primaryContact, role: `${primaryContact.role} (Primary)`}] : []), 
    ...(shareholders || [])
  ];

  return (
    <div className="space-y-6">
      {/* Business Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryItem label="Business Name" value={businessInfo?.businessName} />
          <SummaryItem label="Business Type" value={businessInfo?.businessType} />
          <SummaryItem label="Industry" value={businessInfo?.activityCategory} />
          <SummaryItem label="Location" value={`${businessInfo?.city}, ${businessInfo?.region}`} />
          <SummaryItem label="Contact" value={`${businessInfo?.businessEmail} / ${businessInfo?.businessPhone}`} />
        </CardContent>
      </Card>

      {/* Founders & Shareholders Card */}
      <Card>
        <CardHeader>
          <CardTitle>Founders & Shareholders</CardTitle>
        </CardHeader>
        <CardContent>
          {allShareholders.map((founder, index) => (
            <div key={index} className="p-3 mb-2 border rounded-md">
              <p className="font-semibold">{founder.fullName} - {founder.role}</p>
              <p className="text-sm text-muted-foreground">{founder.email} | {founder.shareholding}% Shares</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Uploaded Documents Card */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {documents && Object.entries(documents).map(([key, value]) => (
            value && <SummaryItem key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} value={value as string} />
          ))}
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Confirm & Submit Application"}
        </Button>
      </div>
    </div>
  );
};

export default SummaryView;
