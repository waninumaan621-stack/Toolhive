// File utility functions with size limits and validation

export const FILE_LIMITS = {
  maxImageSize: 10 * 1024 * 1024, // 10MB
  maxPdfSize: 50 * 1024 * 1024, // 50MB
  maxTextSize: 5 * 1024 * 1024, // 5MB
  maxFileSize: 25 * 1024 * 1024, // 25MB general
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFileSize = (file: File, maxSize: number): { valid: boolean; message: string } => {
  if (file.size > maxSize) {
    return {
      valid: false,
      message: `File size (${formatFileSize(file.size)}) exceeds the maximum limit of ${formatFileSize(maxSize)}. Please use a smaller file.`
    };
  }
  return { valid: true, message: '' };
};

export const validateImageFile = (file: File): { valid: boolean; message: string } => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, message: 'Invalid file type. Please upload JPG, PNG, GIF, WebP, BMP, or SVG.' };
  }
  return validateFileSize(file, FILE_LIMITS.maxImageSize);
};

export const validatePdfFile = (file: File): { valid: boolean; message: string } => {
  if (file.type !== 'application/pdf') {
    return { valid: false, message: 'Invalid file type. Please upload a PDF file.' };
  }
  return validateFileSize(file, FILE_LIMITS.maxPdfSize);
};

export const validateTextFile = (file: File): { valid: boolean; message: string } => {
  const validTypes = ['text/plain', 'text/csv', 'text/html', 'text/css', 'text/javascript', 'application/json', 'application/xml'];
  if (!validTypes.includes(file.type) && !file.name.match(/\.(txt|csv|json|xml|html|css|js|md)$/i)) {
    return { valid: false, message: 'Invalid file type. Please upload a text-based file.' };
  }
  return validateFileSize(file, FILE_LIMITS.maxTextSize);
};

export const downloadFile = (content: string | Blob, filename: string, type: string = 'text/plain') => {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};
