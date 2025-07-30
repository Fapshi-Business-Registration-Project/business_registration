import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useState } from 'react';
import { useRegistration } from '@/contexts/RegistrationContext';
import { documentUploadsSchema } from '@/lib/validators';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

// Import upload components
import FileUpload from '@/components/uploads/FileUpload';
import DocumentPreview from '@/components/uploads/DocumentPreview';
import FileProgress from '@/components/uploads/FileProgress';

// Types for uploaded files
interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  errorMessage?: string;
  previewUrl?: string;
}

interface DocumentRequirement {
  id: string;
  title: string;
  required: boolean;
  acceptedTypes: string[];
  maxSize: number; // in MB
  description?: string;
}

type DocumentUploads = z.infer<typeof documentUploadsSchema>;

const DocumentUploadsForm = () => {
    const router = useRouter();
    const { formData, setFormData } = useRegistration();
    const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});

    const form = useForm<DocumentUploads>({
        resolver: zodResolver(documentUploadsSchema),
        defaultValues: formData.documents || {
            nationalId: '',
            proofOfAddress: '',
            attestationOfNonConviction: '',
            photoOrSelfie: '',
            articlesOfAssociation: '',
            businessLicense: '',
        },
    });

    // Document requirements configuration
    const documentRequirements: DocumentRequirement[] = [
        {
            id: 'nationalId',
            title: 'National ID',
            required: true,
            acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
            maxSize: 5,
            description: 'Clear photo or scan of your national identification document'
        },
        {
            id: 'proofOfAddress',
            title: 'Proof of Address',
            required: true,
            acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
            maxSize: 5,
            description: 'Utility bill, bank statement, or official mail (max 3 months old)'
        },
        {
            id: 'attestationOfNonConviction',
            title: 'Attestation of Non-Conviction',
            required: true,
            acceptedTypes: ['.pdf'],
            maxSize: 3,
            description: 'Official document confirming no criminal record'
        },
        {
            id: 'photoOrSelfie',
            title: 'Photo/Selfie for Verification',
            required: true,
            acceptedTypes: ['.jpg', '.jpeg', '.png'],
            maxSize: 2,
            description: 'Clear selfie photo for identity verification'
        },
        {
            id: 'articlesOfAssociation',
            title: 'Articles of Association',
            required: false,
            acceptedTypes: ['.pdf', '.doc', '.docx'],
            maxSize: 10,
            description: 'Legal document defining company structure and operations'
        },
        {
            id: 'businessLicense',
            title: 'Business License',
            required: false,
            acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
            maxSize: 5,
            description: 'Valid business registration or license document'
        }
    ];

    // Handle file selection for a specific document type
    const handleFileSelect = (requirementId: string, files: File[]) => {
        if (files.length === 0) return;

        const file = files[0]; // Take first file only
        const fileId = `${requirementId}-${Date.now()}`;
        
        const uploadedFile: UploadedFile = {
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            uploadProgress: 0,
            status: 'pending',
            previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        };

        // Update uploaded files state
        setUploadedFiles(prev => ({
            ...prev,
            [requirementId]: uploadedFile
        }));

        // Update form value with filename
        form.setValue(requirementId as keyof DocumentUploads, file.name, { shouldValidate: true });

        // Simulate upload process
        simulateUpload(requirementId, fileId);
    };
// Improved simulateUpload function with better error handling
const simulateUpload = (requirementId: string, fileId: string) => {
    // Start uploading
    setUploadedFiles(prev => ({
        ...prev,
        [requirementId]: {
            ...prev[requirementId],
            status: 'uploading',
            uploadProgress: 0
        }
    }));

    // Add timeout to prevent infinite hanging
    const uploadTimeout = setTimeout(() => {
        setUploadedFiles(prev => ({
            ...prev,
            [requirementId]: {
                ...prev[requirementId],
                status: 'error',
                uploadProgress: 0,
                errorMessage: 'Upload timeout. Please try again.'
            }
        }));
    }, 30000); // 30 second timeout

    // Simulate progress
    const interval = setInterval(() => {
        setUploadedFiles(prev => {
            const currentFile = prev[requirementId];
            
            // Clear interval and timeout if file doesn't exist or ID mismatch
            if (!currentFile || currentFile.id !== fileId) {
                clearInterval(interval);
                clearTimeout(uploadTimeout);
                return prev;
            }

            // Ensure we don't exceed 100%
            const increment = Math.min(Math.random() * 15 + 5, 100 - currentFile.uploadProgress);
            const newProgress = Math.min(currentFile.uploadProgress + increment, 100);
            
            if (newProgress >= 100) {
                clearInterval(interval);
                clearTimeout(uploadTimeout);
                
                // Simulate success (95% success rate for demo)
                const success = Math.random() > 0.05;
                
                return {
                    ...prev,
                    [requirementId]: {
                        ...currentFile,
                        uploadProgress: 100,
                        status: success ? 'completed' : 'error',
                        errorMessage: success ? undefined : 'Upload failed. Please try again.'
                    }
                };
            }

            return {
                ...prev,
                [requirementId]: {
                    ...currentFile,
                    uploadProgress: newProgress
                }
            };
        });
    }, 300); // Slightly slower for more realistic feel

    // Store interval ID for cleanup if needed
    return { interval, timeout: uploadTimeout };
};

    const onSubmit = (data: DocumentUploads) => {
        // Check if all required files are uploaded successfully
        const requiredFields = documentRequirements.filter(req => req.required);
        const missingRequired = requiredFields.filter(req => {
            const file = uploadedFiles[req.id];
            return !file || file.status !== 'completed';
        });

        if (missingRequired.length > 0) {
            toast.error(`Please complete upload for: ${missingRequired.map(r => r.title).join(', ')}`);
            return;
        }

        setFormData(prev => ({ ...prev, documents: data }));
        toast.success("Documents uploaded successfully!");
        router.push('/register/summary');
    };

    const completedUploads = Object.values(uploadedFiles).filter(file => file.status === 'completed').length;
    const totalRequired = documentRequirements.filter(req => req.required).length;

    return (
        <div className="space-y-6">
            {/* Progress indicator */}
            <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Upload Progress</h3>
                    <span className="text-sm text-gray-600">
                        {completedUploads} of {totalRequired} required
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${totalRequired > 0 ? (completedUploads / totalRequired) * 100 : 0}%` }}
                    />
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                        Please upload the required documents. Files will be validated for type and size.
                    </p>

                    {documentRequirements.map((requirement) => {
                        const uploadedFile = uploadedFiles[requirement.id];
                        
                        const handleRemoveFile = (id: string) => {
                            // Remove the file from uploadedFiles state
                            setUploadedFiles(prev => {
                                const newFiles = { ...prev };
                                delete newFiles[id];
                                return newFiles;
                            });

                            // Reset the form value for this field
                            form.setValue(id as keyof DocumentUploads, '', { shouldValidate: true });
                        };

                        const handleReupload = (id: string) => {
                            handleRemoveFile(id);
                        };

                        return (
                            <FormField
                                key={requirement.id}
                                control={form.control}
                                name={requirement.id as keyof DocumentUploads}
                                render={() => (
                                    <FormItem>
                                        <div className="bg-white rounded-lg border p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <FormLabel className="text-lg font-semibold">
                                                    {requirement.title}
                                                </FormLabel>
                                                {!requirement.required && (
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                        Optional
                                                    </span>
                                                )}
                                            </div>

                                            <FormControl>
                                                <div>
                                                    {/* Show uploaded file preview or upload area */}
                                                    {uploadedFile ? (
                                                        <div className="space-y-4">
                                                            <DocumentPreview
                                                                file={uploadedFile}
                                                                onRemove={() => handleRemoveFile(requirement.id)}
                                                                onReupload={() => handleReupload(requirement.id)}
                                                            />
                                                            
                                                            {/* Show progress if uploading */}
                                                            {uploadedFile.status === 'uploading' && (
                                                                <FileProgress
                                                                    progress={uploadedFile.uploadProgress}
                                                                    status={uploadedFile.status}
                                                                    fileName={uploadedFile.name}
                                                                    fileSize={uploadedFile.size}
                                                                />
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <FileUpload
                                                            requirement={requirement}
                                                            onFileSelect={(files) => handleFileSelect(requirement.id, files)}
                                                        />
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        );
                    })}
                    
                    <div className="flex justify-between pt-6 border-t">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Back
                        </Button>
                        <Button 
                            type="submit"
                            disabled={completedUploads < totalRequired}
                            className={completedUploads < totalRequired ? 'opacity-50' : ''}
                        >
                            Go to Summary
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default DocumentUploadsForm;