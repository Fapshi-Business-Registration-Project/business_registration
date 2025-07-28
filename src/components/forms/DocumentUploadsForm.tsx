"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useRegistration } from '@/contexts/RegistrationContext';
import { documentUploadsSchema } from '@/lib/validators';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

type DocumentUploads = z.infer<typeof documentUploadsSchema>;

const DocumentUploadsForm = () => {
    const router = useRouter();
    const { formData, setFormData } = useRegistration();

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

    // Mock handler to just get the filename
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof DocumentUploads) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue(fieldName, file.name, { shouldValidate: true });
        }
    };
    
    const onSubmit = (data: DocumentUploads) => {
        setFormData(prev => ({ ...prev, documents: data }));
        toast.success("Documents recorded successfully!");
        router.push('/register/summary');
    };

    const documentFields: {name: keyof DocumentUploads, label: string, required: boolean}[] = [
        { name: 'nationalId', label: 'National ID', required: true },
        { name: 'proofOfAddress', label: 'Proof of Address', required: true },
        { name: 'attestationOfNonConviction', label: 'Attestation of Non-Conviction', required: true },
        { name: 'photoOrSelfie', label: 'Photo/Selfie for Verification', required: true },
        { name: 'articlesOfAssociation', label: 'Articles of Association', required: false },
        { name: 'businessLicense', label: 'Business License (if available)', required: false },
    ];


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Please upload the required documents. This is a simulation; only filenames will be recorded.
                </p>
                {documentFields.map(({name, label, required}) => (
                    <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={() => (
                            <FormItem>
                                <FormLabel>{label} {required && '*'}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, name)}
                                        className="pt-2"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                
                <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" className="focus:ring-2 focus:ring-[#0D80F2]" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" className = "bg-[#0D80F2]">Go to Summary</Button>
                </div>
            </form>
        </Form>
    );
};

export default DocumentUploadsForm;