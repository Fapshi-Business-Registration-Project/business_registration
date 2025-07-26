// /components/forms/SummaryView.tsx
"use client";

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
    const router = useRouter();
    const { formData, resetForm } = useRegistration();

    const handleSubmit = () => {
        console.log("Final Submission Data:", formData);
        toast.info("Simulating submission...");

        setTimeout(() => {
            toast.success("Application Submitted!", {
                description: "Your business registration is now In Review. You will be redirected.",
            });
            resetForm(); // Clear context and localStorage
            // In a real app, you would redirect to a dashboard.
            setTimeout(() => router.push('/'), 2000);
        }, 1500);
    };
    
    const { businessInfo, primaryContact, shareholders, documents } = formData;
    const allShareholders = [
        ...(primaryContact ? [{...primaryContact, role: `${primaryContact.role} (Primary)`}] : []), 
        ...(shareholders || [])
    ];

    return (
        <div className="space-y-6">
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
            
            <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => router.push('/register/documents')}>Back</Button>
                <Button onClick={handleSubmit}>Confirm & Submit Application</Button>
            </div>
        </div>
    );
};

export default SummaryView;