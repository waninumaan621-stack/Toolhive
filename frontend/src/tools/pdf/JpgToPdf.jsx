import { useState } from 'react';
import UploadZone from '../../components/UploadZone';
import { PDFDocument } from 'pdf-lib';

export default function JpgToPdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handle = (f) => setFiles(p => [...p, ...(Array.isArray(f) ? f : [f])]);
  const remove = (i) => setFiles(f => f.filter((_, idx) => idx !== i));

  const convert = async () => {
    setLoading(true);
    try {
      const pdf = await PDFDocument.create();
      for (const file of files) {
        const buf = await file.arrayBuffer();
        const img = file.type === 'image/png' ? await pdf.embedPng(buf) : await pdf.embedJpg(buf);
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const bytes = await pdf.save();
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = 'converted.pdf'; a.click();
    } catch { alert('Conversion failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={10} onFile={handle} label="Upload images" multiple />
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-navy-800 rounded-xl px-4 py-2.5">
              <span className="text-sm truncate">🖼️ {f.name}</span>
              <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 ml-2 text-lg leading-none">×</button>
            </div>
          ))}
          <button onClick={convert} disabled={loading} className="btn-gold w-full py-3">
            {loading ? 'Converting…' : `⬇ Convert ${files.length} image${files.length > 1 ? 's' : ''} to PDF`}
          </button>
        </div>
      )}
    </div>
  );
}
