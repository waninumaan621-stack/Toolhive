import { useState } from 'react';
import UploadZone from '../../components/UploadZone';
import { PDFDocument } from 'pdf-lib';

export default function CompressPdf() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = async (file) => {
    setLoading(true); setResult(null);
    try {
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf, { updateMetadata: false });
      const bytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false, objectsPerTick: 50 });
      const blob = new Blob([bytes], { type: 'application/pdf' });
      setResult({
        url: URL.createObjectURL(blob),
        original: (file.size / 1024).toFixed(1),
        compressed: (bytes.length / 1024).toFixed(1),
        saved: (((file.size - bytes.length) / file.size) * 100).toFixed(1),
        name: file.name,
      });
    } catch { alert('Compression failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF to compress" />
      {loading && <div className="flex items-center gap-3 text-sm text-gray-500"><div className="w-5 h-5 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"/>Compressing…</div>}
      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Original</p>
              <p className="font-bold text-lg">{result.original} KB</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Saved</p>
              <p className="font-bold text-lg text-green-600">{result.saved}%</p>
            </div>
            <div className="bg-gold-50 dark:bg-gold-900/20 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Compressed</p>
              <p className="font-bold text-lg text-gold-600">{result.compressed} KB</p>
            </div>
          </div>
          <a href={result.url} download="compressed.pdf" className="btn-gold w-full py-3 text-center block">⬇ Download Compressed PDF</a>
        </div>
      )}
    </div>
  );
}
