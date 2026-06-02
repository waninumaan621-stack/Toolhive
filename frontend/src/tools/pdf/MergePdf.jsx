import { useState } from 'react';
import UploadZone from '../../components/UploadZone';
import { PDFDocument } from 'pdf-lib';

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handle = (f) => setFiles(p => [...p, ...(Array.isArray(f) ? f : [f])]);
  const remove = (i) => setFiles(f => f.filter((_, idx) => idx !== i));
  const move = (i, dir) => {
    const f = [...files];
    const j = i + dir;
    if (j < 0 || j >= f.length) return;
    [f[i], f[j]] = [f[j], f[i]]; setFiles(f);
  };

  const merge = async () => {
    if (files.length < 2) return alert('Upload at least 2 PDFs.');
    setLoading(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const buf = await file.arrayBuffer();
        const pdf = await PDFDocument.load(buf);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      const bytes = await merged.save();
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = 'merged.pdf'; a.click();
    } catch { alert('Merge failed. Make sure all files are valid PDFs.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDFs to merge" multiple />
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400">Use arrows to reorder pages</p>
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-navy-800 rounded-xl px-4 py-2.5">
              <div className="flex flex-col gap-0.5">
                <button onClick={() => move(i, -1)} className="text-xs text-gray-400 hover:text-gold-500">▲</button>
                <button onClick={() => move(i, 1)} className="text-xs text-gray-400 hover:text-gold-500">▼</button>
              </div>
              <span className="text-xs text-gray-400 w-5">{i + 1}.</span>
              <span className="text-sm flex-1 truncate">📄 {f.name}</span>
              <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
            </div>
          ))}
          <button onClick={merge} disabled={loading || files.length < 2} className="btn-gold w-full py-3">
            {loading ? 'Merging…' : `🔗 Merge ${files.length} PDFs`}
          </button>
        </div>
      )}
    </div>
  );
}
