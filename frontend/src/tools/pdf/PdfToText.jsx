import { useState } from 'react';
import UploadZone from '../../components/UploadZone';

export default function PdfToText() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const loadPdfJs = () => new Promise((resolve) => {
    if (window.pdfjsLib) { resolve(window.pdfjsLib); return; }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; resolve(window.pdfjsLib); };
    document.head.appendChild(s);
  });

  const handle = async (file) => {
    setLoading(true); setText('');
    try {
      const buf = await file.arrayBuffer();
      const lib = await loadPdfJs();
      const doc = await lib.getDocument({ data: buf }).promise;
      let full = '';
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        full += `--- Page ${i} ---\n` + content.items.map(item => item.str).join(' ') + '\n\n';
      }
      setText(full);
    } catch { setText('Could not extract text from this PDF.'); }
    finally { setLoading(false); }
  };

  const copy = () => { navigator.clipboard.writeText(text); };
  const download = () => {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    a.download = 'extracted.txt'; a.click();
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF to extract text" />
      {loading && <div className="flex items-center gap-3 text-sm text-gray-500"><div className="w-5 h-5 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"/>Extracting text…</div>}
      {text && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <button onClick={copy} className="btn-ghost text-sm px-4 py-2">📋 Copy</button>
            <button onClick={download} className="btn-gold text-sm px-4 py-2">⬇ Download .txt</button>
          </div>
          <textarea readOnly value={text} rows={12} className="input-field font-mono text-xs resize-none" />
        </div>
      )}
    </div>
  );
}
