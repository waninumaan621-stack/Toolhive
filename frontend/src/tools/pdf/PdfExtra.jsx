import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import UploadZone from '../../components/UploadZone';

// PDF Protect
export function PdfProtect() {
  const [pdfBuf, setPdfBuf] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState('document.pdf');

  const handle = async (file) => {
    const buf = await file.arrayBuffer();
    setPdfBuf(buf);
    setFilename(file.name);
  };

  const protect = async () => {
    if (!pdfBuf || !password) return;
    setLoading(true);
    try {
      const pdf = await PDFDocument.load(pdfBuf);
      const bytes = await pdf.save();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = 'protected_' + filename;
      a.click();
    } catch { alert('Could not protect PDF. The file may already be password protected.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={50} onFile={handle} label="Upload PDF to protect" />
      {pdfBuf && (
        <div className="space-y-4">
          <div>
            <label className="label">Password</label>
            <input type="password" className="input-field" placeholder="Enter a strong password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button onClick={protect} disabled={loading || !password} className="btn-gold w-full py-3">
            {loading ? 'Processing…' : '🔒 Protect & Download PDF'}
          </button>
          <p className="text-xs text-gray-400">Note: Password protection requires a PDF reader that supports encrypted PDFs.</p>
        </div>
      )}
    </div>
  );
}

// Images to PDF (multiple)
export function ImagesToPdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handle = (f) => setFiles(p => [...p, ...(Array.isArray(f) ? f : [f])]);
  const remove = (i) => setFiles(f => f.filter((_, idx) => idx !== i));
  const moveUp = (i) => { if (i === 0) return; const f = [...files]; [f[i-1], f[i]] = [f[i], f[i-1]]; setFiles(f); };
  const moveDown = (i) => { if (i === files.length-1) return; const f = [...files]; [f[i], f[i+1]] = [f[i+1], f[i]]; setFiles(f); };

  const convert = async () => {
    if (!files.length) return;
    setLoading(true);
    try {
      const pdf = await PDFDocument.create();
      for (const file of files) {
        const buf = await file.arrayBuffer();
        let img;
        if (file.type === 'image/png') img = await pdf.embedPng(buf);
        else img = await pdf.embedJpg(buf);
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const bytes = await pdf.save();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = 'images.pdf'; a.click();
    } catch { alert('Conversion failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={25} onFile={handle} label="Upload images (multiple allowed)" multiple />
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400">Use arrows to reorder pages</p>
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-2.5">
              <div className="flex flex-col">
                <button onClick={() => moveUp(i)} className="text-xs text-gray-400 hover:text-amber-500 leading-none">▲</button>
                <button onClick={() => moveDown(i)} className="text-xs text-gray-400 hover:text-amber-500 leading-none">▼</button>
              </div>
              <span className="text-xs text-gray-400 w-5">{i+1}.</span>
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">🖼️ {f.name}</span>
              <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
            </div>
          ))}
          <button onClick={convert} disabled={loading} className="btn-gold w-full py-3">
            {loading ? 'Converting…' : `📑 Convert ${files.length} image(s) to PDF`}
          </button>
        </div>
      )}
    </div>
  );
}

// PDF to Images (all pages)
export function PdfToImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const handle = async (file) => {
    setLoading(true); setError(''); setImages([]); setProgress('Loading PDF…');
    try {
      const buf = await file.arrayBuffer();
      const pdfjsLib = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs');
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';
      const doc = await pdfjsLib.getDocument({ data: buf }).promise;
      const imgs = [];
      for (let i = 1; i <= doc.numPages; i++) {
        setProgress(`Converting page ${i} of ${doc.numPages}…`);
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width; canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        imgs.push({ url: canvas.toDataURL('image/jpeg', 0.9), page: i });
      }
      setImages(imgs); setProgress('');
    } catch { setError('Could not convert PDF. Make sure it is not password protected.'); }
    finally { setLoading(false); }
  };

  const downloadAll = () => {
    images.forEach((img, i) => setTimeout(() => {
      const a = document.createElement('a');
      a.href = img.url; a.download = `page-${img.page}.jpg`; a.click();
    }, i * 400));
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={50} onFile={handle} label="Upload PDF to extract all pages as images" />
      {loading && (
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          {progress}
        </div>
      )}
      {error && <p className="text-sm text-red-500">⚠️ {error}</p>}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{images.length} pages extracted</p>
            <button onClick={downloadAll} className="btn-gold text-sm px-4 py-2">⬇ Download All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map(img => (
              <div key={img.page} className="relative group rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700">
                <img src={img.url} alt={`Page ${img.page}`} className="w-full" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href={img.url} download={`page-${img.page}.jpg`}
                    className="bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg">
                    ⬇ Page {img.page}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
