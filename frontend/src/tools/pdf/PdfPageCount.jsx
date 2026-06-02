import { useState } from 'react';
import UploadZone from '../../components/UploadZone';
import { PDFDocument } from 'pdf-lib';

export default function PdfPageCount() {
  const [result, setResult] = useState(null);

  const handle = async (file) => {
    try {
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      setResult({ pages: pdf.getPageCount(), name: file.name, size: (file.size / 1024).toFixed(1) });
    } catch { setResult({ error: 'Could not read PDF.' }); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload any PDF file" />
      {result && (
        result.error ? <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">{result.error}</div> :
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="card p-5"><p className="text-xs text-gray-400 mb-1">Pages</p><p className="font-display text-4xl font-bold text-gold-500">{result.pages}</p></div>
          <div className="card p-5"><p className="text-xs text-gray-400 mb-1">File Size</p><p className="font-display text-2xl font-bold">{result.size} KB</p></div>
          <div className="card p-5"><p className="text-xs text-gray-400 mb-1">Format</p><p className="font-display text-2xl font-bold">PDF</p></div>
        </div>
      )}
    </div>
  );
}
