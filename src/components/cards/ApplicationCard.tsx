// /components/dashboard/ApplicationCard.tsx
import { Application } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ApplicationCardProps {
  application: Application;
  onSelect: (application: Application) => void;
}

export const ApplicationCard = ({ application, onSelect }: ApplicationCardProps) => {
  const handleViewClick = () => {
    onSelect(application);
  };

  return (
    <Card className="rounded-none border-0 drop-shadow-0">
      <div className="flex justify-between items-start">
        <div className="flex flex-col space-y-2 align-start w-2/3">
          <CardHeader>
            <div className="text-sm font-normal text-[#5C738A]">
              {application.status}
            </div>
            <CardTitle>{application.businessName}</CardTitle>
            <CardDescription>
              <p>Type: {application.type} </p>
              <p>Region: {application.region}</p>
              <p className="text-sm text-muted-foreground">
                Submitted: {new Date(application.submittedDate).toLocaleDateString()}
              </p>
            
              <Button 
                variant="outline" 
                className="mt-4 rounded-full px-4 bg-[#] w-2/3"
                onClick={handleViewClick}
              >
                View
              </Button>
            </CardDescription>
          </CardHeader>
        </div>
       <div className="mr-4">
         <Image 
          src="/image.png"
          alt="Application Image"
          width={160}
          height={160}
        />
       </div>
      </div>
    </Card>
  );
};