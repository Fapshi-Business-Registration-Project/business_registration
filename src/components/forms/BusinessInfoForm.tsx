"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/contexts/RegistrationContext';
import { businessInfoSchema } from '@/lib/validators';
import { BusinessInfo } from '@/types';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormInput, FormSelect } from './FormParts';
import { BUSINESS_TYPES, CAMEROON_REGIONS } from '@/lib/constants';

const BusinessInfoForm = () => {
    const router = useRouter();
    const { formData, setFormData } = useRegistration();

    const form = useForm<BusinessInfo>({
        resolver: zodResolver(businessInfoSchema),
        defaultValues: formData.businessInfo || {
            businessName: '',
            businessType: undefined,
            rcNumber: '',
            activityCategory: '',
            region: undefined,
            city: '',
            businessPhone: '',
            businessEmail: '',
        },
    });

    const onSubmit = (data: BusinessInfo) => {
        setFormData(prev => ({ ...prev, businessInfo: data }));
        router.push('/register/primary-contact');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormInput  control={form.control} name="businessName" label="Business Name" placeholder="e.g., Fapshi Inc."  />
                <FormSelect control={form.control} name="businessType" label="Business Type" placeholder="Select a type" items={BUSINESS_TYPES} />
                <FormInput control={form.control} name="rcNumber" label="RC Number (Optional)" />
                <FormInput control={form.control} name="activityCategory" label="Activity / Industry" placeholder="e.g., FinTech" />
                <FormSelect control={form.control} name="region" label="Region" placeholder="Select a region" items={CAMEROON_REGIONS} />
                <FormInput control={form.control} name="city" label="City" placeholder="e.g., Buea" />
                <FormInput control={form.control} name="businessPhone" label="Business Phone" placeholder="e.g., 670000000" />
                <FormInput control={form.control} name="businessEmail" label="Business Email" placeholder="e.g., contact@fapshi.com" />
                <div className='flex items-end justify-end'><Button type="submit" className='bg-[#0D80F2]'>Next Step</Button></div>
            </form>
        </Form>
    );
};

export default BusinessInfoForm;