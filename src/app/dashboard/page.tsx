// /app/dashboard/page.tsx
"use client"; // <-- Make this a client component

import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { Button } from "@/components/ui/button";
import { RegistrationProvider, useRegistration } from "@/contexts/RegistrationContext"; // <-- Import the hook
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Since this page uses a hook, it must be wrapped in the provider.
// Let's create a temporary wrapper here.
const DashboardPageContent = () => {
  const router = useRouter();
  const { applications } = useRegistration(); // <-- Get live data from context

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => router.push('/register')}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Application
        </Button>
      </div>
      <DashboardClient applications={applications} />
    </div>
  );
}

// The main export wraps the page content with the provider
const DashboardPage = () => {
    // Note: It might feel redundant, but this ensures the context is available on this page.
    // A better approach in large apps would be to have the provider in a top-level layout,
    // but this works perfectly for our case.
    return (
        <RegistrationProvider>
            <DashboardPageContent />
        </RegistrationProvider>
    );
};

export default DashboardPage;