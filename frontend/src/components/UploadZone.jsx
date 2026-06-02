import { useState, useRef } from 'react';

export default function UploadZone({ accept, maxMB, onFile, label, multiple = false }) {
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const validate = (file) => {
    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > maxMB) {
      setError(`"${file.name}" is ${sizeMB.toFixed(1)}MB. Maximum allowed is ${maxMB}MB.`);
      return false;
    }
    setError('');
    return true;
  };

  const handleFiles = (files) => {
    const fileArr = Array.from(files);
    if (multiple) {
      const valid = fileArr.filter(validate);
      if (valid.length) onFile(valid);
    } else {
      if (validate(fileArr[0])) onFile(fileArr[0]);
    }
  };

  const formats = accept
    ? accept.split(',').map(a => a.trim().replace('.', '').toUpperCase()).join(', ')
    : 'Any file';

  return (
    <div>
      <div
        className={`upload-zone ${drag ? 'dragover' : ''}`}
        onClick={() => inputRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
      >
        <div className="text-4xl mb-3">📂</div>
        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1 text-sm">
          {label || 'Click to upload or drag & drop'}
        </p>
        <p className="text-xs text-gray-400">
          {formats}
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-1">
          <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
            📏 Max size: {maxMB}MB
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </div>
      {error && (
        <div className="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
          <span className="flex-shrink-0">⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
