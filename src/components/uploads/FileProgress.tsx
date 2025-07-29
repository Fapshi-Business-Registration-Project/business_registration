import React from 'react';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

interface FileProgress {
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  fileName: string;
  fileSize: number;
  errorMessage?: string;
  className?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const FileProgress: React.FC<FileProgress> = ({
  progress,
  status,
  fileName,
  fileSize,
  errorMessage,
  className = ''
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'uploading':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'uploading':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Upload completed';
      case 'error':
        return errorMessage || 'Upload failed';
      case 'uploading':
        return `Uploading... ${Math.round(progress)}%`;
      case 'pending':
        return 'Waiting to upload';
      default:
        return 'Unknown status';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {/* Header with icon and file info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {fileName}
            </p>
            <p className="text-xs text-gray-500">
              {formatFileSize(fileSize)}
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {(status === 'uploading' || status === 'completed') && (
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">Progress</span>
            <span className="text-xs text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ease-out ${getStatusColor()}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Status message */}
      <div className="flex items-center justify-between">
        <p className={`text-xs ${
          status === 'error' ? 'text-red-600' : 
          status === 'completed' ? 'text-green-600' : 
          status === 'uploading' ? 'text-blue-600' : 
          'text-gray-600'
        }`}>
          {getStatusText()}
        </p>
        
        {status === 'uploading' && (
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileProgress;