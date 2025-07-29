import React, { useState, useRef, useCallback } from 'react';
import { Upload, Plus, AlertTriangle } from 'lucide-react';

interface DocumentRequirement {
  id: string;
  title: string;
  required: boolean;
  acceptedTypes: string[];
  maxSize: number; // in MB
  description?: string;
}

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

interface FileUploadProps {
  requirement: DocumentRequirement;
  onFileSelect: (files: File[]) => void;
  uploadedFile?: UploadedFile;
  disabled?: boolean;
  className?: string;
}

const validateFileType = (file: File, acceptedTypes: string[]): boolean => {
  if (acceptedTypes.length === 0) return true;
  
  return acceptedTypes.some(type => {
    if (type.startsWith('.')) {
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    } else {
      return file.type.match(type.replace('*', '.*'));
    }
  });
};

const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const FileUpload: React.FC<FileUploadProps> = ({
  requirement,
  onFileSelect,
  uploadedFile,
  disabled = false,
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const validateFiles = (files: File[]): { valid: File[], errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      // Check file type
      if (!validateFileType(file, requirement.acceptedTypes)) {
        const acceptedTypesStr = requirement.acceptedTypes.join(', ');
        errors.push(`${file.name}: File type not supported. Accepted types: ${acceptedTypesStr}`);
        return;
      }

      // Check file size
      if (!validateFileSize(file, requirement.maxSize)) {
        errors.push(`${file.name}: File size exceeds ${requirement.maxSize}MB limit`);
        return;
      }

      valid.push(file);
    });

    return { valid, errors };
  };

  const handleFileSelection = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const { valid, errors } = validateFiles(fileArray);

    if (errors.length > 0) {
      setError(errors.join(', '));
      return;
    }

    setError(null);
    onFileSelect(valid);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    handleFileSelection(files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, requirement, onFileSelect]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelection(e.target.files);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const getAcceptedTypesDisplay = () => {
    if (requirement.acceptedTypes.length === 0) return 'All file types';
    return requirement.acceptedTypes.join(', ');
  };

  const hasFile = uploadedFile && uploadedFile.status !== 'error';

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer
          ${isDragOver && !disabled
            ? 'border-blue-400 bg-blue-50'
            : hasFile
            ? 'border-green-300 bg-green-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          accept={requirement.acceptedTypes.join(',')}
          disabled={disabled}
        />

        <div className="p-6 text-center">
          {hasFile ? (
            <>
              <div className="w-10 h-10 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium text-green-800">File uploaded</p>
              <p className="text-xs text-green-600 mt-1">Click to replace</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                {isDragOver ? (
                  <Plus className="w-6 h-6 text-blue-600" />
                ) : (
                  <Upload className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <p className="text-sm font-medium text-gray-700">
                {isDragOver ? 'Drop files here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {getAcceptedTypesDisplay()} • Max {requirement.maxSize}MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">Upload Error</p>
            <p className="text-xs text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* File Requirements */}
      {requirement.description && (
        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
          <strong>Requirements:</strong> {requirement.description}
        </div>
      )}
    </div>
  );
};

export default FileUpload;