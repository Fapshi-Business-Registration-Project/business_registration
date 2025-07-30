// /components/dashboard/ApplicationSummary.tsx
"use client";

import { Application } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Building2, Users, FileText, MapPin, Calendar, Phone, Mail } from "lucide-react";
import { useRegistration } from "@/contexts/RegistrationContext";

interface ApplicationSummaryProps {
  application: Application | null;
  onClose?: () => void;
  isMobile?: boolean;
}

const SummaryItem = ({ label, value, icon }: { 
  label: string; 
  value?: string | number; 
  icon?: React.ReactNode 
}) => (
  <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center gap-2">
      {icon && <div className="text-gray-400 mt-0.5">{icon}</div>}
      <p className="text-sm font-medium text-gray-600">{label}</p>
    </div>
    <p className="text-sm text-gray-900 text-right max-w-[60%] break-words">
      {value || 'N/A'}
    </p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
    status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-200' :
    status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
    status === 'Submitted' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
    'bg-gray-50 text-gray-700 border border-gray-200'
  }`}>
    {status}
  </span>
);

export const ApplicationSummary = ({ application, onClose, isMobile = false }: ApplicationSummaryProps) => {
  const { formData } = useRegistration();

  if (!application) {
    return (
      <div className={`${isMobile ? 'h-screen bg-gray-50' : ''}`}>
        <Card className={`${isMobile ? 'm-4 shadow-sm border-0' : ''}`}>
          <CardHeader className={`${isMobile ? 'pb-4' : ''}`}>
            <CardTitle className={`${isMobile ? 'text-lg' : ''}`}>
              Application Summary
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isMobile ? 'pt-0' : ''}`}>
            <div className="text-center py-8">
              <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">
                Select an application from the left to view its details.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { businessInfo, primaryContact, shareholders, documents } = formData;
  const allShareholders = [
    ...(primaryContact ? [{...primaryContact, role: `${primaryContact.role} (Primary)`}] : []),
    ...(shareholders || [])
  ];

  const content = (
    <div className={`${isMobile ? 'min-h-screen bg-gray-50' : ''}`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Application Details</h1>
              <p className="text-sm text-gray-500">{application.businessName}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className={`${isMobile ? 'p-4 space-y-6' : 'space-y-6'}`}>
        {/* Application Overview */}
        <Card className={`${isMobile ? 'shadow-sm border-0 bg-white' : ''}`}>
          <CardHeader className={`${isMobile ? 'pb-4' : ''}`}>
            <div className="flex items-center justify-between">
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                <Building2 className="h-5 w-5 text-blue-600" />
                Application Overview
              </CardTitle>
              {!isMobile && <StatusBadge status={application.status} />}
            </div>
            {isMobile && (
              <div className="mt-3">
                <StatusBadge status={application.status} />
              </div>
            )}
          </CardHeader>
          <CardContent className={`${isMobile ? 'pt-0' : ''}`}>
            <div className="space-y-1">
              <SummaryItem 
                label="Business Name" 
                value={application.businessName}
                icon={<Building2 className="h-4 w-4" />}
              />
              <SummaryItem 
                label="Business Type" 
                value={application.type}
              />
              <SummaryItem 
                label="Region" 
                value={application.region}
                icon={<MapPin className="h-4 w-4" />}
              />
              <SummaryItem 
                label="Submitted Date" 
                value={new Date(application.submittedDate).toLocaleDateString()}
                icon={<Calendar className="h-4 w-4" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        {businessInfo && (
          <Card className={`${isMobile ? 'shadow-sm border-0 bg-white' : ''}`}>
            <CardHeader className={`${isMobile ? 'pb-4' : ''}`}>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                <Building2 className="h-5 w-5 text-green-600" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className={`${isMobile ? 'pt-0' : ''}`}>
              <div className="space-y-1">
                <SummaryItem 
                  label="Business Name" 
                  value={businessInfo.businessName}
                />
                <SummaryItem 
                  label="Business Type" 
                  value={businessInfo.businessType}
                />
                <SummaryItem 
                  label="Industry" 
                  value={businessInfo.activityCategory}
                />
                <SummaryItem 
                  label="Location" 
                  value={`${businessInfo.city}, ${businessInfo.region}`}
                  icon={<MapPin className="h-4 w-4" />}
                />
                <SummaryItem 
                  label="Email" 
                  value={businessInfo.businessEmail}
                  icon={<Mail className="h-4 w-4" />}
                />
                <SummaryItem 
                  label="Phone" 
                  value={businessInfo.businessPhone}
                  icon={<Phone className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Founders & Shareholders */}
        {allShareholders.length > 0 && (
          <Card className={`${isMobile ? 'shadow-sm border-0 bg-white' : ''}`}>
            <CardHeader className={`${isMobile ? 'pb-4' : ''}`}>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                <Users className="h-5 w-5 text-purple-600" />
                Founders & Shareholders
              </CardTitle>
            </CardHeader>
            <CardContent className={`${isMobile ? 'pt-0' : ''}`}>
              <div className="space-y-4">
                {allShareholders.map((founder, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {founder.fullName}
                      </h4>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        {founder.shareholding}%
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 font-medium mb-1">
                      {founder.role}
                    </p>
                    <p className="text-xs text-gray-600">
                      {founder.email}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents */}
        {documents && Object.values(documents).some(doc => doc) && (
          <Card className={`${isMobile ? 'shadow-sm border-0 bg-white' : ''}`}>
            <CardHeader className={`${isMobile ? 'pb-4' : ''}`}>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
                <FileText className="h-5 w-5 text-orange-600" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent className={`${isMobile ? 'pt-0' : ''}`}>
              <div className="space-y-1">
                {Object.entries(documents).map(([key, value]) => (
                  value && <SummaryItem 
                    key={key} 
                    label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
                    value={value as string}
                    icon={<FileText className="h-4 w-4" />}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile Close Button */}
        {isMobile && (
          <div className="pb-8 pt-4">
            <Button 
              onClick={onClose} 
              className="w-full h-12 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm"
            >
              Close Details
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="space-y-6">
        {content}
      </div>
    </div>
  );
};