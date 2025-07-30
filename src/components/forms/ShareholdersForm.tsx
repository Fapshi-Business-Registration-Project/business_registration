// /components/forms/ShareholdersForm.tsx
"use client";

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/contexts/RegistrationContext';
import { shareholdersSchema } from '@/lib/validators';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormInput } from './FormParts';
import { toast } from "sonner";
import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';
import { Upload, File, X } from 'lucide-react';

// Use the exact Zod-inferred type for the form
type ShareholdersFormData = z.infer<typeof shareholdersSchema>;

// Document upload component
const DocumentUpload = ({ 
    label, 
    description, 
    onFileSelect, 
    selectedFile, 
    onRemoveFile 
}: {
    label: string;
    description: string;
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
    onRemoveFile: () => void;
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type (images and PDFs)
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Please upload only JPG, PNG, or PDF files');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }
            
            onFileSelect(file);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-medium text-sm">{label}</h4>
                    <p className="text-xs text-gray-600">{description}</p>
                </div>
                <File className="h-5 w-5 text-gray-400" />
            </div>
            
            {selectedFile ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center space-x-2">
                        <File className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700 truncate max-w-[200px]">
                            {selectedFile.name}
                        </span>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onRemoveFile}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div className="relative">
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors">
                        <div className="flex items-center space-x-2 text-gray-500">
                            <Upload className="h-5 w-5" />
                            <span className="text-sm">Click to upload</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ShareholdersForm = () => {
    const router = useRouter();
    const { formData, setFormData } = useRegistration();
    
    // State for managing uploaded documents for each shareholder
    const [shareholderDocuments, setShareholderDocuments] = useState<{
        [key: number]: {
            nationalId: File | null;
            proofOfAddress: File | null;
            nonConvictionAttestation: File | null;
        }
    }>({});

    const form = useForm<ShareholdersFormData>({
        resolver: zodResolver(shareholdersSchema),
        defaultValues: {
            shareholders: formData?.shareholders || [],
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "shareholders",
    });

    const primaryContact = formData?.primaryContact;
    
    const remainingShares = useMemo(() => {
        return 100 - (primaryContact?.shareholding || 0);
    }, [primaryContact?.shareholding]);

    const handleAddShareholder = useCallback(() => {
        const newIndex = fields.length;
        append({ 
            fullName: '', 
            email: '', 
            role: '', 
            shareholding: 0, 
            nationalId: '', 
            phone: '', 
            nationality: '', 
            dateOfBirth: ''
        });
        
        // Initialize document state for new shareholder
        setShareholderDocuments(prev => ({
            ...prev,
            [newIndex]: {
                nationalId: null,
                proofOfAddress: null,
                nonConvictionAttestation: null
            }
        }));
    }, [append, fields.length]);

    const handleRemoveShareholder = useCallback((index: number) => {
        remove(index);
        // Remove document state for this shareholder
        setShareholderDocuments(prev => {
            const newState = { ...prev };
            delete newState[index];
            // Reindex remaining shareholders
            const reindexed: typeof newState = {};
            Object.keys(newState).forEach((key) => {
                const numKey = parseInt(key);
                if (numKey > index) {
                    reindexed[numKey - 1] = newState[numKey];
                } else {
                    reindexed[numKey] = newState[numKey];
                }
            });
            return reindexed;
        });
    }, [remove]);

    const handleDocumentUpload = useCallback((shareholderIndex: number, documentType: 'nationalId' | 'proofOfAddress' | 'nonConvictionAttestation', file: File) => {
        setShareholderDocuments(prev => ({
            ...prev,
            [shareholderIndex]: {
                ...prev[shareholderIndex],
                [documentType]: file
            }
        }));
    }, []);

    const handleDocumentRemove = useCallback((shareholderIndex: number, documentType: 'nationalId' | 'proofOfAddress' | 'nonConvictionAttestation') => {
        setShareholderDocuments(prev => ({
            ...prev,
            [shareholderIndex]: {
                ...prev[shareholderIndex],
                [documentType]: null
            }
        }));
    }, []);

    const onSubmit = useCallback((data: ShareholdersFormData) => {
        if (!primaryContact) {
            toast.error('Primary contact information is missing.');
            router.push('/register/primary-contact');
            return;
        }

        const totalShares = (primaryContact.shareholding || 0) + data.shareholders.reduce((acc, s) => acc + (Number(s.shareholding) || 0), 0);

        if (Math.abs(totalShares - 100) > 0.001) {
            toast.error(`Total shares must be 100%. Current total is ${totalShares.toFixed(2)}%.`);
            return;
        }

        // Validate that all required documents are uploaded
        const missingDocuments: string[] = [];
        data.shareholders.forEach((_, index) => {
            const docs = shareholderDocuments[index];
            if (!docs?.nationalId) missingDocuments.push(`Shareholder ${index + 1}: National ID`);
            if (!docs?.proofOfAddress) missingDocuments.push(`Shareholder ${index + 1}: Proof of Address`);
            if (!docs?.nonConvictionAttestation) missingDocuments.push(`Shareholder ${index + 1}: Non-Conviction Attestation`);
        });

        if (missingDocuments.length > 0) {
            toast.error(`Missing required documents: ${missingDocuments.join(', ')}`);
            return;
        }

        // Include documents in the form data
        const shareholdersWithDocuments = data.shareholders.map((shareholder, index) => ({
            ...shareholder,
            documents: shareholderDocuments[index]
        }));

        setFormData(prev => ({ 
            ...prev, 
            shareholders: shareholdersWithDocuments,
            shareholderDocuments 
        }));
        router.push('/register/documents');
    }, [primaryContact, setFormData, router, shareholderDocuments]);

    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    if (!primaryContact) {
        setTimeout(() => {
            router.push('/register/primary-contact');
        }, 0);
        
        return (
            <div className="p-4">
                <p>Primary contact not found. Redirecting...</p>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-semibold">{primaryContact.fullName} (Primary Contact)</h3>
                    <p className="text-sm text-gray-600">Shareholding: {primaryContact.shareholding}%</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        You must add other shareholders to account for the remaining {remainingShares.toFixed(2)}% of shares.
                    </p>
                </div>

                {fields.map((field, index) => (
                    <Card key={field.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Shareholder #{index + 1}</CardTitle>
                            <Button 
                                type="button" 
                                variant="destructive" 
                                size="sm" 
                                onClick={() => handleRemoveShareholder(index)}
                            >
                                Remove
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-base border-b pb-2">Personal Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        control={form.control} 
                                        name={`shareholders.${index}.fullName`} 
                                        label="Full Name" 
                                    />
                                    <FormInput
                                        control={form.control} 
                                        name={`shareholders.${index}.email`} 
                                        label="Email" 
                                        type="email"
                                    />
                                    <FormInput
                                        control={form.control} 
                                        name={`shareholders.${index}.role`} 
                                        label="Role" 
                                    />
                                    <FormInput
                                        control={form.control} 
                                        name={`shareholders.${index}.shareholding`} 
                                        label="Shareholding (%)" 
                                        type="number"
                                    />
                                    <FormInput
                                        control={form.control} 
                                        name={`shareholders.${index}.nationalId`} 
                                        label="National ID" 
                                    />
                                    <FormInput
                                        control={form.control} 
                                        name={`shareholders.${index}.phone`} 
                                        label="Phone" 
                                        type="tel"
                                    />
                                    <FormInput
                                        control={form.control} 
                                        name={`shareholders.${index}.nationality`} 
                                        label="Nationality" 
                                    />
                                    <FormInput
                                        control={form.control} 
                                        name={`shareholders.${index}.dateOfBirth`} 
                                        label="Date of Birth" 
                                        type="date"
                                    />
                                </div>
                            </div>

                            {/* Document Upload Section */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-base border-b pb-2">Upload Documents</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <DocumentUpload
                                        label="National ID"
                                        description="Upload a clear copy of the shareholder's national ID"
                                        onFileSelect={(file) => handleDocumentUpload(index, 'nationalId', file)}
                                        selectedFile={shareholderDocuments[index]?.nationalId || null}
                                        onRemoveFile={() => handleDocumentRemove(index, 'nationalId')}
                                    />
                                    <DocumentUpload
                                        label="Proof of Address"
                                        description="Upload a recent utility bill or bank statement"
                                        onFileSelect={(file) => handleDocumentUpload(index, 'proofOfAddress', file)}
                                        selectedFile={shareholderDocuments[index]?.proofOfAddress || null}
                                        onRemoveFile={() => handleDocumentRemove(index, 'proofOfAddress')}
                                    />
                                    <DocumentUpload
                                        label="Attestation of Non-Conviction"
                                        description="Upload a signed declaration of non-conviction"
                                        onFileSelect={(file) => handleDocumentUpload(index, 'nonConvictionAttestation', file)}
                                        selectedFile={shareholderDocuments[index]?.nonConvictionAttestation || null}
                                        onRemoveFile={() => handleDocumentRemove(index, 'nonConvictionAttestation')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                
                <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAddShareholder}
                >
                    Add Shareholder
                </Button>

                {form.formState.errors.shareholders && (
                    <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.shareholders.message}
                    </p>
                )}

                <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={handleBack} className="focus:ring-2 focus:ring-[#0D80F2]">
                        Back
                    </Button>
                    <Button type="submit" disabled={form.formState.isSubmitting} className="bg-[#0D80F2]">
                        {form.formState.isSubmitting ? 'Processing...' : 'Continue'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ShareholdersForm;