// /components/dashboard/DashboardClient.tsx
"use client";

import { Application } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationCard} from "../cards/ApplicationCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DashboardClientProps {
  applications: Application[];
}

const TABS = ["All", "Draft", "Submitted", "Approved", "Rejected"];

export const DashboardClient = ({ applications = [] }: DashboardClientProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {/* Left Column: Applications List */}
      <div className="md:col-span-1">
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            {TABS.slice(0,3).map(tab => <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>)}
          </TabsList>
          <TabsList className="grid w-full grid-cols-5 mb-4">
            {TABS.slice(3,5).map(tab => <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>)}
            <TabsTrigger value="All" className="col-span-3">All</TabsTrigger>
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
                      <ApplicationCard key={app.id} application={app} />
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

      {/* Right Column: Application Summary Placeholder */}
      <div className="md:col-span-2 hidden md:block">
        <Card>
            <CardHeader>
                <CardTitle>Application Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Select an application from the left to view its details.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};