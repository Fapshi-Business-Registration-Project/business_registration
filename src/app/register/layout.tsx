import { RegistrationProvider } from "@/contexts/RegistrationContext"
import { Toaster } from "@/components/ui/sonner";
import { StepIndicator } from "@/components/ui/StepIndicator";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RegistrationProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <StepIndicator />
         <main>
          {children}
         </main>
        </div>
        <Toaster />
      </div>
    </RegistrationProvider>
  );
}