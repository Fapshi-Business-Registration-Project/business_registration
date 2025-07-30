import { useState } from 'react';
import { toast } from "sonner";

//existing upload components
import FileUpload from '@/components/uploads/FileUpload';
import DocumentPreview from '@/components/uploads/DocumentPreview';
import FileProgress from '@/components/uploads/FileProgress';

// Types for uploaded files
interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  errorMessage?: string;
  previewUrl?: string;
}

interface DocumentRequirement {
  id: string;
  title: string;
  required: boolean;
  acceptedTypes: string[];
  maxSize: number; // in MB
  description?: string;
}

interface ShareholderDocumentsSectionProps {
  shareholderId: string;
  shareholderName: string;
  onDocumentsComplete?: (shareholderId: string, documents: Record<string, string>) => void;
}

const ShareholderDocumentsSection: React.FC<ShareholderDocumentsSectionProps> = ({
  shareholderId,
  shareholderName,
  onDocumentsComplete
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});

  // Only mandatory documents for shareholders
  const mandatoryDocuments: DocumentRequirement[] = [
    {
      id: 'nationalId',
      title: 'National ID',
      required: true,
      acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
      maxSize: 5,
      description: 'Clear photo or scan of shareholder\'s national identification document'
    },
    {
      id: 'proofOfAddress',
      title: 'Proof of Address',
      required: true,
      acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
      maxSize: 5,
      description: 'Utility bill, bank statement, or official mail (max 3 months old)'
    },
    {
      id: 'attestationOfNonConviction',
      title: 'Attestation of Non-Conviction',
      required: true,
      acceptedTypes: ['.pdf'],
      maxSize: 3,
      description: 'Official document confirming no criminal record'
    },
    {
      id: 'photoOrSelfie',
      title: 'Photo/Selfie for Verification',
      required: true,
      acceptedTypes: ['.jpg', '.jpeg', '.png'],
      maxSize: 2,
      description: 'Clear selfie photo for identity verification'
    }
  ];

  // Handle file selection for a specific document type
  const handleFileSelect = (requirementId: string, files: File[]) => {
    if (files.length === 0) return;

    const file = files[0]; // Take first file only
    const fileId = `${shareholderId}-${requirementId}-${Date.now()}`;
    
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploadProgress: 0,
      status: 'pending',
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    };

    // Update uploaded files state
    setUploadedFiles(prev => ({
      ...prev,
      [requirementId]: uploadedFile
    }));

    // Simulate upload process
    simulateUpload(requirementId, fileId);
  };

  // Simulate file upload with progress
  const simulateUpload = (requirementId: string, fileId: string) => {
    // Start uploading
    setUploadedFiles(prev => ({
      ...prev,
      [requirementId]: {
        ...prev[requirementId],
        status: 'uploading',
        uploadProgress: 0
      }
    }));

    // Simulate progress
    const interval = setInterval(() => {
      setUploadedFiles(prev => {
        const currentFile = prev[requirementId];
        if (!currentFile || currentFile.id !== fileId) {
          clearInterval(interval);
          return prev;
        }

        const newProgress = Math.min(currentFile.uploadProgress + Math.random() * 25, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Simulate success (90% success rate for demo)
          const success = Math.random() > 0.1;
          
          const updatedFiles = {
            ...prev,
            [requirementId]: {
              ...currentFile,
              uploadProgress: 100,
              status: success ? 'completed' as const : 'error' as const,
              errorMessage: success ? undefined : 'Upload failed. Please try again.'
            }
          };

          // Check if all mandatory documents are completed and notify parent
          if (success) {
            const allCompleted = mandatoryDocuments.every(doc => {
              const file = updatedFiles[doc.id];
              return file && file.status === 'completed';
            });

            if (allCompleted && onDocumentsComplete) {
              const documentData = mandatoryDocuments.reduce((acc, doc) => {
                const file = updatedFiles[doc.id];
                if (file && file.status === 'completed') {
                  acc[doc.id] = file.name;
                }
                return acc;
              }, {} as Record<string, string>);
              
              onDocumentsComplete(shareholderId, documentData);
            }
          }

          return updatedFiles;
        }

        return {
          ...prev,
          [requirementId]: {
            ...currentFile,
            uploadProgress: newProgress
          }
        };
      });
    }, 200);
  };

  // Handle file removal
  const handleRemoveFile = (requirementId: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      if (newFiles[requirementId]?.previewUrl) {
        URL.revokeObjectURL(newFiles[requirementId].previewUrl);
      }
      delete newFiles[requirementId];
      return newFiles;
    });

    toast.info(`Document removed for ${shareholderName}`);
  };

  // Handle file reupload
  const handleReupload = (requirementId: string) => {
    const currentFile = uploadedFiles[requirementId];
    if (currentFile) {
      setUploadedFiles(prev => ({
        ...prev,
        [requirementId]: {
          ...currentFile,
          status: 'pending',
          uploadProgress: 0,
          errorMessage: undefined
        }
      }));
      
      simulateUpload(requirementId, currentFile.id);
    }
  };

  const completedUploads = Object.values(uploadedFiles).filter(file => file.status === 'completed').length;
  const totalRequired = mandatoryDocuments.length;
  const isComplete = completedUploads === totalRequired;

  return (
    <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">
          Documents for {shareholderName}
        </h4>
        {isComplete && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Complete
          </span>
        )}
      </div>

      {/* Progress indicator */}
      <div className="bg-white p-3 rounded border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Upload Progress</span>
          <span className="text-sm text-gray-600">
            {completedUploads} of {totalRequired} required
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isComplete ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${totalRequired > 0 ? (completedUploads / totalRequired) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Document upload fields */}
      <div className="space-y-4">
        {mandatoryDocuments.map((requirement) => {
          const uploadedFile = uploadedFiles[requirement.id];
          
          return (
            <div key={requirement.id} className="bg-white rounded border p-3">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-800">
                  {requirement.title}
                </h5>
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                  Required
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{requirement.description}</p>

              {/* Show uploaded file preview or upload area */}
              {uploadedFile ? (
                <div className="space-y-3">
                  <DocumentPreview
                    file={uploadedFile}
                    onRemove={() => handleRemoveFile(requirement.id)}
                    onReupload={() => handleReupload(requirement.id)}
                  />
                  
                  {/* Show progress if uploading */}
                  {uploadedFile.status === 'uploading' && (
                    <FileProgress
                      progress={uploadedFile.uploadProgress}
                      status={uploadedFile.status}
                      fileName={uploadedFile.name}
                      fileSize={uploadedFile.size}
                    />
                  )}
                </div>
              ) : (
                <FileUpload
                  requirement={requirement}
                  onFileSelect={(files) => handleFileSelect(requirement.id, files)}
                />
              )}
            </div>
          );
        })}
      </div>

      {!isComplete && (
        <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded border border-amber-200">
          <p className="font-medium">⚠️ Incomplete Documents</p>
          <p>Please upload all required documents for this shareholder to continue.</p>
        </div>
      )}
    </div>
  );
};

export default ShareholderDocumentsSection;