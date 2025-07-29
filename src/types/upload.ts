// types/upload.ts

export interface UploadedFile {
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

export interface DocumentRequirement {
  id: string;
  title: string;
  required: boolean;
  acceptedTypes: string[];
  maxSize: number; // in MB
  description?: string;
}

export interface UploadConfig {
  maxFileSize: number; // in MB
  acceptedTypes: string[];
  maxFiles?: number;
}

export interface FileUploadProps {
  requirement: DocumentRequirement;
  onFileSelect: (files: File[]) => void;
  uploadedFile?: UploadedFile;
  disabled?: boolean;
  className?: string;
}

export interface DocumentPreviewProps {
  file: UploadedFile;
  onRemove: (fileId: string) => void;
  onReupload: (fileId: string) => void;
  className?: string;
}

export interface FileProgressProps {
  progress: number;
  status: UploadedFile['status'];
  fileName: string;
  fileSize: number;
  errorMessage?: string;
  className?: string;
}