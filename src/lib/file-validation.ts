// lib/file-validation.ts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UploadConfig, DocumentRequirement } from '../types/upload';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const validateFileType = (file: File, acceptedTypes: string[]): boolean => {
  if (acceptedTypes.length === 0) return true;
  
  return acceptedTypes.some(type => {
    if (type.startsWith('.')) {
      // Extension-based validation
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    } else {
      // MIME type validation
      return file.type.match(type.replace('*', '.*'));
    }
  });
};

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

export const validateFile = (
  file: File, 
  requirement: DocumentRequirement
): ValidationResult => {
  const errors: string[] = [];
  
  // Check file type
  if (!validateFileType(file, requirement.acceptedTypes)) {
    const acceptedTypesStr = requirement.acceptedTypes.join(', ');
    errors.push(`File type not supported. Accepted types: ${acceptedTypesStr}`);
  }
  
  // Check file size
  if (!validateFileSize(file, requirement.maxSize)) {
    errors.push(`File size exceeds ${requirement.maxSize}MB limit`);
  }
  
  // Check if file name is too long
  if (file.name.length > 255) {
    errors.push('File name is too long (max 255 characters)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateFiles = (
  files: File[], 
  requirement: DocumentRequirement
): ValidationResult => {
  const errors: string[] = [];
  
  if (files.length === 0) {
    if (requirement.required) {
      errors.push(`${requirement.title} is required`);
    }
    return { isValid: !requirement.required, errors };
  }
  
  // Validate each file
  files.forEach((file, index) => {
    const fileValidation = validateFile(file, requirement);
    if (!fileValidation.isValid) {
      errors.push(`File ${index + 1}: ${fileValidation.errors.join(', ')}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const createFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    } else {
      // For non-images, we'll return a default icon or document representation
      resolve('');
    }
  });
};

export const getFileIcon = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  const iconMap: Record<string, string> = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    txt: '📄',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    svg: '🖼️',
    zip: '📦',
    rar: '📦',
    '7z': '📦',
  };
  
  return iconMap[extension] || '📎';
};