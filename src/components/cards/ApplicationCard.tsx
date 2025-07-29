// /components/dashboard/ApplicationCard.tsx
import { Application } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  application: Application;
}

const statusColors = {
  Draft: "bg-gray-500",
  Submitted: "bg-blue-500",
  Approved: "bg-green-500",
  Rejected: "bg-red-500",
};

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle>{application.businessName}</CardTitle>
            <Badge className={cn("text-white", statusColors[application.status])}>
                {application.status}
            </Badge>
        </div>
        <CardDescription>
          {application.type} / {application.region}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Submitted: {new Date(application.submittedDate).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View</Button>
      </CardFooter>
    </Card>
  );
};