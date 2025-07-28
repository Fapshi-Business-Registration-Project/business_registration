"use client";

import { useParams } from 'next/navigation';
import { STEPS } from '@/lib/constants';


export const StepIndicator = () => {
    const params = useParams();
    

    const currentPath = params.step as string;
    const currentIndex = STEPS.findIndex(step => step.path === currentPath);



    // Calculate progress percentage
    const progressPercentage = ((currentIndex + 1) / STEPS.length) * 100;

    const currentStep = STEPS[currentIndex];

    return (
        <div className="w-full mb-8 ">
            {/* Current Step Name */}
            <div className="mb-2 flex items-center justify-center bg-[#F7FAFC]">
                <h1 className="text-xl font-semibold text-gray-900">
                    {currentStep?.name || 'Loading...'}
                </h1>
            </div>

            {/* Step counter */}
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Step {currentIndex + 1} of {STEPS.length}
                </p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                {/* Progress fill */}
                <div 
                    className="h-full bg-[#0D80F2] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    );
};