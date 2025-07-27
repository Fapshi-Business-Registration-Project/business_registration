// /components/forms/PrimaryContactForm.tsx
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/contexts/RegistrationContext';
import { founderSchema } from '@/lib/validators';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormInput } from './FormParts';

// Use the exact Zod-inferred type for the form
type FormData = z.infer<typeof founderSchema>;

const PrimaryContactForm = () => {
    const router = useRouter();
    const { formData, setFormData } = useRegistration();

    const form = useForm<FormData>({
        resolver: zodResolver(founderSchema),
        defaultValues: formData.primaryContact || {
            fullName: '',
            nationalId: '',
            phone: '',
            email: '',
            role: 'CEO',
            shareholding: 100,
            nationality: 'Cameroonian',
            dateOfBirth: '',
        },
    });

    const onSubmit = (data: FormData) => {
        // Convert FormData to Founder type for context
        setFormData(prev => ({ 
            ...prev, 
            primaryContact: {
                fullName: data.fullName,
                nationalId: data.nationalId,
                phone: data.phone,
                email: data.email,
                role: data.role,
                shareholding: data.shareholding,
                nationality: data.nationality,
                dateOfBirth: data.dateOfBirth,
            }
        }));
        
        if (data.shareholding === 100) {
            setFormData(prev => ({ ...prev, shareholders: [] }));
            router.push('/register/documents');
        } else {
            router.push('/register/shareholders');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
                <FormInput control={form.control} name="fullName" label="Full Name" />
                
                <FormInput control={form.control} name="nationalId" label="National ID Number" />
                
                <FormInput control={form.control} name="dateOfBirth" label="Date of Birth" type="date" />
                
                <FormInput control={form.control} name="nationality" label="Nationality" />
                
                <FormInput control={form.control} name="phone" label="Phone Number" />
                
                <FormInput control={form.control} name="email" label="Email Address" />
                
                <FormInput control={form.control} name="role" label="Role" placeholder="e.g., CEO, Director" />
                
                <FormInput
                    control={form.control} 
                    name="shareholding" 
                    label="Shareholding (%)" 
                    type="number"
                />

                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Back</Button>
                    <Button type="submit">Next Step</Button>
                </div>
            </form>
        </Form>
    );
};

export default PrimaryContactForm;