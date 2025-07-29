import React from 'react';
import { X, RotateCcw, FileText, Image, FileArchive, File } from 'lucide-react';

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

interface DocumentPreviewProps {
  file: UploadedFile;
  onRemove: (fileId: string) => void;
  onReupload: (fileId: string) => void;
  className?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const getFileIcon = (fileName: string, fileType: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  if (fileType.startsWith('image/')) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image className="w-8 h-8 text-blue-500" />;
  }
  
  switch (extension) {
    case 'pdf':
      return <FileText className="w-8 h-8 text-red-500" />;
    case 'doc':
    case 'docx':
      return <FileText className="w-8 h-8 text-blue-600" />;
    case 'zip':
    case 'rar':
    case '7z':
      return <FileArchive className="w-8 h-8 text-orange-500" />;
    default:
      return <File className="w-8 h-8 text-gray-500" />;
  }
};

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  file,
  onRemove,
  onReupload,
  className = ''
}) => {
  const isImage = file.type.startsWith('image/');
  
  return (
    <div className={`bg-white rounded-lg border-2 border-gray-200 overflow-hidden ${className}`}>
      {/* Preview Area */}
      <div className="relative">
        {/* Background with document representation */}
        <div className="h-24 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
          {/* Document icon/preview */}
          {isImage && file.previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={file.previewUrl}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center">
              {getFileIcon(file.name, file.type)}
              {/* Document lines representation */}
              <div className="mt-2 space-y-1">
                <div className="w-12 h-0.5 bg-white/60 rounded" />
                <div className="w-8 h-0.5 bg-white/60 rounded" />
                <div className="w-10 h-0.5 bg-white/60 rounded" />
              </div>
            </div>
          )}
          
          {/* Status indicator */}
          {file.status === 'completed' && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
          {file.status === 'error' && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        {/* Progress bar for uploading files */}
        {file.status === 'uploading' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${file.uploadProgress}%` }}
            />
          </div>
        )}
      </div>
      
      {/* File Info */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {formatFileSize(file.size)}
            </p>
            
            {/* Status text */}
            {file.status === 'uploading' && (
              <p className="text-xs text-blue-600 mt-1">
                Uploading... {Math.round(file.uploadProgress)}%
              </p>
            )}
            
            {file.status === 'error' && file.errorMessage && (
              <p className="text-xs text-red-600 mt-1">
                {file.errorMessage}
              </p>
            )}
            
            {file.status === 'completed' && (
              <p className="text-xs text-green-600 mt-1">
                Uploaded
              </p>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2 ml-2">
            {file.status === 'error' && (
              <button
                onClick={() => onReupload(file.id)}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                title="Retry upload"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={() => onRemove(file.id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove file"
              disabled={file.status === 'uploading'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;