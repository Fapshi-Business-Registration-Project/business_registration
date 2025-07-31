"use client";

import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { Button } from "@/components/ui/button";
import { useRegistration } from "@/contexts/RegistrationContext";
import { PlusCircle, DoorOpenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";




const DashboardPageContent = () => {
  const router = useRouter();
  const { applications } = useRegistration();
  const { user, logout } = useAuthContext();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold lg:text-2xl lg:font-bold">Hello {user?.name}</h1>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => router.push('/register')} 
            className="bg-[#0D80F2] rounded-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" />New Application
          </Button>
          <Button 
            onClick={logout} 
            variant="outline" 
            className="rounded-full"
          >
            <DoorOpenIcon className="mr-2 h-4 w-4" />Logout
          </Button>
        </div>
      </div>
      <DashboardClient applications={applications} />
    </div>
  );
};

const DashboardPage = () => {
  return (
    <ProtectedRoute requireAuth={true}>
      <DashboardPageContent />
    </ProtectedRoute>
  );
};

export default DashboardPage;