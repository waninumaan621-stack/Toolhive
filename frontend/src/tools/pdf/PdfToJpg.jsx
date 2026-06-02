import { useState } from 'react';
import UploadZone from '../../components/UploadZone';

export default function PdfToJpg() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPdfJs = () => new Promise((resolve) => {
    if (window.pdfjsLib) { resolve(window.pdfjsLib); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      resolve(window.pdfjsLib);
    };
    document.head.appendChild(script);
  });

  const handle = async (file) => {
    setLoading(true); setError(''); setImages([]);
    try {
      const buf = await file.arrayBuffer();
      const lib = await loadPdfJs();
      const doc = await lib.getDocument({ data: buf }).promise;
      const imgs = [];
      for (let i = 1; i <= Math.min(doc.numPages, 10); i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width; canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        imgs.push({ url: canvas.toDataURL('image/jpeg', 0.9), page: i });
      }
      setImages(imgs);
    } catch { setError('Could not convert. Make sure PDF is not password protected.'); }
    finally { setLoading(false); }
  };

  const dl = (img) => { const a = document.createElement('a'); a.href = img.url; a.download = `page-${img.page}.jpg`; a.click(); };

  return (
    <div className="space-y-5">
      <UploadZone accept=".pdf" maxMB={20} onFile={handle} label="Upload PDF file" />
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
      {loading && <div className="flex items-center gap-3 text-sm text-gray-500"><div className="w-5 h-5 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"/>Converting pages…</div>}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{images.length} pages converted</p>
            <button onClick={() => images.forEach(img => setTimeout(() => dl(img), img.page * 300))} className="btn-gold text-sm px-4 py-2">⬇ Download All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map(img => (
              <div key={img.page} className="relative group rounded-xl overflow-hidden border border-gray-100 dark:border-navy-700">
                <img src={img.url} alt={`Page ${img.page}`} className="w-full" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => dl(img)} className="bg-white text-navy-900 text-xs font-semibold px-3 py-1.5 rounded-lg">⬇ Page {img.page}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
