// /components/dashboard/DashboardClient.tsx
"use client";

import { useState } from "react";
import { Application } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationCard} from "../cards/ApplicationCard";
import { ApplicationSummary } from "./ApplicationSummary";

interface DashboardClientProps {
  applications: Application[];
}

const TABS = ["All", "Draft", "Submitted", "Approved", "Rejected"];

export const DashboardClient = ({ applications = [] }: DashboardClientProps) => {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const handleApplicationSelect = (application: Application) => {
    setSelectedApplication(application);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {/* Left Column: Applications List */}
      <div className="md:col-span-1">
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            {TABS.map(tab => (
              <TabsTrigger key={tab} value={tab} className="text-sm">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
                     
          {TABS.map((tab) => {
            const filteredApps = tab === "All" 
               ? applications 
               : applications.filter(app => app.status === tab);
                         
            return (
              <TabsContent key={tab} value={tab}>
                <div className="space-y-4">
                  {filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                      <ApplicationCard 
                        key={app.id} 
                        application={app} 
                        onSelect={handleApplicationSelect}
                      />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground pt-8">No applications in this category.</p>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
       
      {/* Right Column: Application Summary */}
      <div className="md:col-span-2 hidden md:block">
        <ApplicationSummary application={selectedApplication} />
      </div>

      {/* Mobile Modal for Application Summary */}
      {selectedApplication && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[90vh] overflow-y-auto rounded-t-lg">
            <ApplicationSummary 
              application={selectedApplication} 
              onClose={() => setSelectedApplication(null)}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};