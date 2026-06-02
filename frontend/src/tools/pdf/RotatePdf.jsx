import { useState } from 'react';
import UploadZone from '../../components/UploadZone';
import { PDFDocument, degrees } from 'pdf-lib';

export default function RotatePdf() {
  const [pdfBuf, setPdfBuf] = useState(null);
  const [info, setInfo] = useState(null);
  const [angle, setAngle] = useState(90);
  const [loading, setLoading] = useState(false);

  const handle = async (file) => {
    const buf = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buf);
    setPdfBuf(buf); setInfo({ pages: pdf.getPageCount(), name: file.name });
  };

  const rotate = async () => {
    setLoading(true);
    try {
      const pdf = await PDFDocument.load(pdfBuf);
      pdf.getPages().forEach(p => p.setRotation(degrees(angle)));
      const bytes = await pdf.save();
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = 'rotated.pdf'; a.click();
    } catch { alert('Rotation failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF to rotate" />
      {info && (
        <div className="space-y-4">
          <div className="bg-gold-50 dark:bg-gold-900/20 border border-gold-200 rounded-xl p-4 text-sm">
            📄 {info.name} — {info.pages} pages
          </div>
          <div>
            <label className="label">Rotation Angle</label>
            <div className="flex gap-3">
              {[90, 180, 270].map(a => (
                <button key={a} onClick={() => setAngle(a)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${angle === a ? 'bg-gold-500 text-white border-gold-500' : 'border-gray-200 dark:border-navy-700 hover:border-gold-400'}`}>
                  🔄 {a}°
                </button>
              ))}
            </div>
          </div>
          <button onClick={rotate} disabled={loading} className="btn-gold w-full py-3">
            {loading ? 'Rotating…' : `🔄 Rotate All Pages ${angle}°`}
          </button>
        </div>
      )}
    </div>
  );
}
