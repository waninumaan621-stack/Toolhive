import { useState } from 'react';
import UploadZone from '../../components/UploadZone';
import { PDFDocument, rgb, degrees } from 'pdf-lib';

export default function PdfWatermark() {
  const [pdfBuf, setPdfBuf] = useState(null);
  const [info, setInfo] = useState(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.3);
  const [loading, setLoading] = useState(false);

  const handle = async (file) => {
    const buf = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buf);
    setPdfBuf(buf); setInfo({ pages: pdf.getPageCount(), name: file.name });
  };

  const apply = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const pdf = await PDFDocument.load(pdfBuf);
      const font = await pdf.embedFont('Helvetica-Bold');
      pdf.getPages().forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 4, y: height / 2,
          size: 48, font, color: rgb(0.5, 0.5, 0.5),
          opacity, rotate: degrees(45),
        });
      });
      const bytes = await pdf.save();
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = 'watermarked.pdf'; a.click();
    } catch { alert('Failed to add watermark.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF file" />
      {info && (
        <div className="space-y-4">
          <div>
            <label className="label">Watermark Text</label>
            <input className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="e.g. CONFIDENTIAL" />
          </div>
          <div>
            <label className="label">Opacity: {Math.round(opacity * 100)}%</label>
            <input type="range" min="0.1" max="0.8" step="0.05" value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} className="w-full accent-gold-500" />
          </div>
          <button onClick={apply} disabled={loading || !text.trim()} className="btn-gold w-full py-3">
            {loading ? 'Adding watermark…' : '💧 Add Watermark & Download'}
          </button>
        </div>
      )}
    </div>
  );
}
