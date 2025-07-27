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
import { useCallback, useMemo } from 'react';
//import type { Founder } from '@/types';
import { z } from 'zod';

// Use the exact Zod-inferred type for the form
type ShareholdersFormData = z.infer<typeof shareholdersSchema>;

const ShareholdersForm = () => {
    const router = useRouter();
    const { formData, setFormData } = useRegistration();

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
    }, [append]);

    const handleRemoveShareholder = useCallback((index: number) => {
        remove(index);
    }, [remove]);

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

        setFormData(prev => ({ ...prev, shareholders: data.shareholders }));
        router.push('/register/documents');
    }, [primaryContact, setFormData, router]);

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
                        <CardContent className="space-y-4">
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
                    <Button type="button" variant="outline" onClick={handleBack}>
                        Back
                    </Button>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Processing...' : 'Next Step'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ShareholdersForm;