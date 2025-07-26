// /components/ui/StepIndicator.tsx
"use client";

import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, Circle } from 'lucide-react';
import { STEPS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRegistration } from '@/contexts/RegistrationContext';

export const StepIndicator = () => {
    const params = useParams();
    const router = useRouter();
    const { formData } = useRegistration();

    const currentPath = params.step as string;
    const currentIndex = STEPS.findIndex(step => step.path === currentPath);

    const isStepCompleted = (stepIndex: number): boolean => {
        if (stepIndex < currentIndex) return true;
        
        // Check if the data for the step is actually present
        switch(stepIndex) {
            case 0: return !!formData.businessInfo;
            case 1: return !!formData.primaryContact;
            // The logic can be expanded if deeper validation is needed per step
            default: return stepIndex < currentIndex;
        }
    };
    
    const handleStepClick = (stepIndex: number, path: string) => {
        // Allow navigation only to completed steps
        if(isStepCompleted(stepIndex) || stepIndex === currentIndex) {
            router.push(`/register/${path}`);
        }
    };

    return (
        <nav aria-label="Progress" className="w-full mb-8">
            <ol role="list" className="flex items-center">
                {STEPS.map((step, index) => {
                    const isCompleted = isStepCompleted(index);
                    const isCurrent = index === currentIndex;
                    const canNavigate = isCompleted || isCurrent;

                    return (
                        <li key={step.name} className={cn('relative flex-1', { 'pr-8 sm:pr-20': index !== STEPS.length - 1 })}>
                            {/* Connector line */}
                            {index !== STEPS.length - 1 && (
                                <div 
                                    className="absolute inset-0 top-4 left-4 h-0.5 w-full bg-gray-200" 
                                    aria-hidden="true"
                                />
                            )}
                            
                            <button
                                onClick={() => handleStepClick(index, step.path)}
                                disabled={!canNavigate}
                                className={cn(
                                    "relative flex h-8 w-8 items-center justify-center rounded-full",
                                    isCompleted ? "bg-sky-600 hover:bg-sky-700" : "border-2 border-gray-300 bg-white",
                                    isCurrent && "border-sky-600 bg-white",
                                    canNavigate ? "cursor-pointer" : "cursor-default"
                                )}
                            >
                                {isCompleted ? (
                                    <CheckCircle className="h-5 w-5 text-white" />
                                ) : (
                                    <Circle className={cn("h-2.5 w-2.5", isCurrent ? "text-sky-600" : "text-gray-300")} />
                                )}
                            </button>
                            <p className={cn(
                                "mt-2 text-sm font-medium", 
                                isCurrent ? "text-sky-600" : "text-gray-500",
                                isCompleted && "text-gray-900"
                            )}>
                                {step.name}
                            </p>
                        </li>
                    )
                })}
            </ol>
        </nav>
    );
};