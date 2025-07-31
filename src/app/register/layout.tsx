// /app/register/layout.tsx
import { RegistrationProvider } from "@/contexts/RegistrationContext"
import { Toaster } from "@/components/ui/sonner";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requireAuth={true}>
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
    </ProtectedRoute>
  );
}