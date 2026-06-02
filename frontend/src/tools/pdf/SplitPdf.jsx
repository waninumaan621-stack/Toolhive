import { useState } from 'react';
import UploadZone from '../../components/UploadZone';
import { PDFDocument } from 'pdf-lib';

export default function SplitPdf() {
  const [info, setInfo] = useState(null);
  const [range, setRange] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfBuf, setPdfBuf] = useState(null);

  const handle = async (file) => {
    const buf = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buf);
    setPdfBuf(buf);
    setInfo({ pages: pdf.getPageCount(), name: file.name });
  };

  const split = async () => {
    if (!pdfBuf || !range.trim()) return;
    setLoading(true);
    try {
      const pdf = await PDFDocument.load(pdfBuf);
      const total = pdf.getPageCount();
      const pages = range.split(',').flatMap(r => {
        const [s, e] = r.trim().split('-').map(Number);
        if (e) return Array.from({ length: e - s + 1 }, (_, i) => s + i - 1);
        return [s - 1];
      }).filter(p => p >= 0 && p < total);

      if (!pages.length) return alert('Invalid page range.');
      const newPdf = await PDFDocument.create();
      const copied = await newPdf.copyPages(pdf, pages);
      copied.forEach(p => newPdf.addPage(p));
      const bytes = await newPdf.save();
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = 'split.pdf'; a.click();
    } catch { alert('Split failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF to split" />
      {info && (
        <div className="space-y-4">
          <div className="bg-gold-50 dark:bg-gold-900/20 border border-gold-200 rounded-xl p-4 text-sm">
            📄 <strong>{info.name}</strong> — {info.pages} pages total
          </div>
          <div>
            <label className="label">Page Range</label>
            <input className="input-field" placeholder="e.g. 1-3, 5, 7-9" value={range} onChange={e => setRange(e.target.value)} />
            <p className="text-xs text-gray-400 mt-1">Use commas and hyphens. Example: 1-3, 5, 8-10</p>
          </div>
          <button onClick={split} disabled={loading || !range.trim()} className="btn-gold w-full py-3">
            {loading ? 'Splitting…' : '✂️ Split & Download'}
          </button>
        </div>
      )}
    </div>
  );
}
