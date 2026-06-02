import { useState } from 'react';
import UploadZone from '../../components/UploadZone';
import { PDFDocument } from 'pdf-lib';

export function CompressPdf() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handle = async (file) => {
    setLoading(true); setResult(null);
    try {
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf, { updateMetadata: false });
      const bytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
      const originalKB = (buf.byteLength / 1024).toFixed(1);
      const newKB = (bytes.byteLength / 1024).toFixed(1);
      const saved = (((buf.byteLength - bytes.byteLength) / buf.byteLength) * 100).toFixed(1);
      setResult({ bytes, originalKB, newKB, saved, name: file.name });
    } catch { alert('Compression failed.'); }
    finally { setLoading(false); }
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([result.bytes], { type: 'application/pdf' }));
    a.download = 'compressed.pdf'; a.click();
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF to compress" />
      {loading && <div className="flex items-center gap-3 text-sm text-gray-500"><div className="w-5 h-5 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />Compressing…</div>}
      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-gray-400">Original</p><p className="font-bold text-navy-900 dark:text-white">{result.originalKB} KB</p></div>
            <div><p className="text-xs text-gray-400">Compressed</p><p className="font-bold text-green-600">{result.newKB} KB</p></div>
            <div><p className="text-xs text-gray-400">Saved</p><p className="font-bold text-green-600">{result.saved}%</p></div>
          </div>
          <button onClick={download} className="btn-gold w-full py-2.5">⬇ Download Compressed PDF</button>
        </div>
      )}
    </div>
  );
}

export function RotatePdf() {
  const [pdfBuf, setPdfBuf] = useState(null);
  const [angle, setAngle] = useState(90);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handle = async (file) => {
    const buf = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buf);
    setPageCount(pdf.getPageCount());
    setPdfBuf(buf);
  };

  const rotate = async () => {
    setLoading(true);
    try {
      const pdf = await PDFDocument.load(pdfBuf);
      pdf.getPages().forEach(p => p.setRotation({ type: 'degrees', angle: ((p.getRotation().angle + angle) % 360) }));
      const bytes = await pdf.save();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = 'rotated.pdf'; a.click();
    } catch { alert('Rotation failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF to rotate" />
      {pageCount > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">📄 {pageCount} pages — all pages will be rotated</p>
          <div>
            <label className="label">Rotation Angle</label>
            <div className="flex gap-2">
              {[90, 180, 270].map(a => (
                <button key={a} onClick={() => setAngle(a)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${angle === a ? 'bg-gold-500 text-white border-gold-500' : 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700 text-gray-700 dark:text-gray-300'}`}>
                  {a}°
                </button>
              ))}
            </div>
          </div>
          <button onClick={rotate} disabled={loading} className="btn-gold w-full py-3">
            {loading ? 'Rotating…' : `🔄 Rotate ${angle}°`}
          </button>
        </div>
      )}
    </div>
  );
}

export function PdfToText() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (file) => {
    setLoading(true); setText('');
    try {
      const buf = await file.arrayBuffer();
      const pdfjsLib = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs');
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';
      const doc = await pdfjsLib.getDocument({ data: buf }).promise;
      let fullText = '';
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        fullText += `--- Page ${i} ---\n` + content.items.map(s => s.str).join(' ') + '\n\n';
      }
      setText(fullText || 'No text found in this PDF.');
    } catch { setText('Could not extract text from this PDF.'); }
    finally { setLoading(false); }
  };

  const copy = () => navigator.clipboard.writeText(text);
  const download = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    a.download = 'extracted.txt'; a.click();
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF to extract text" />
      {loading && <div className="flex items-center gap-3 text-sm text-gray-500"><div className="w-5 h-5 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />Extracting text…</div>}
      {text && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <button onClick={copy} className="btn-ghost text-sm px-4 py-2">📋 Copy</button>
            <button onClick={download} className="btn-gold text-sm px-4 py-2">⬇ Download .txt</button>
          </div>
          <textarea className="input-field h-64 font-mono text-xs resize-none" value={text} readOnly />
        </div>
      )}
    </div>
  );
}

export function PdfWatermark() {
  const [pdfBuf, setPdfBuf] = useState(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [loading, setLoading] = useState(false);

  const handle = async (file) => {
    const buf = await file.arrayBuffer();
    setPdfBuf(buf);
  };

  const apply = async () => {
    if (!pdfBuf || !text) return;
    setLoading(true);
    try {
      const { rgb } = await import('pdf-lib');
      const pdf = await PDFDocument.load(pdfBuf);
      const font = await pdf.embedFont('Helvetica');
      pdf.getPages().forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - (text.length * 12), y: height / 2,
          size: 48, font, color: rgb(0.8, 0.8, 0.8), opacity: 0.3,
          rotate: { type: 'degrees', angle: 45 },
        });
      });
      const bytes = await pdf.save();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = 'watermarked.pdf'; a.click();
    } catch { alert('Failed to add watermark.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF" />
      {pdfBuf && (
        <div className="space-y-4">
          <div>
            <label className="label">Watermark Text</label>
            <input className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="CONFIDENTIAL" />
          </div>
          <button onClick={apply} disabled={loading || !text} className="btn-gold w-full py-3">
            {loading ? 'Adding watermark…' : '💧 Add Watermark'}
          </button>
        </div>
      )}
    </div>
  );
}

export function PdfPageCount() {
  const [info, setInfo] = useState(null);

  const handle = async (file) => {
    try {
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf);
      const pages = pdf.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      setInfo({ pages: pdf.getPageCount(), width: Math.round(width), height: Math.round(height), name: file.name, size: (buf.byteLength / 1024).toFixed(1) });
    } catch { alert('Could not read this PDF.'); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF to analyze" />
      {info && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Pages', value: info.pages },
            { label: 'File Size', value: info.size + ' KB' },
            { label: 'Page Width', value: info.width + ' pt' },
            { label: 'Page Height', value: info.height + ' pt' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="font-display font-bold text-xl text-navy-900 dark:text-white">{s.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
