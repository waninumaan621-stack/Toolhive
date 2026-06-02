import { useState } from 'react';

export default function SvgToPng() {
  const [result, setResult] = useState('');
  const [size, setSize] = useState(512);
  const [error, setError] = useState('');

  const handle = (file) => {
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const svgText = e.target.result;
      const img = new Image();
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        setResult(canvas.toDataURL('image/png'));
        URL.revokeObjectURL(url);
      };
      img.onerror = () => setError('Could not load SVG. Make sure it is a valid SVG file.');
      img.src = url;
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="label">Output Size: {size}×{size}px</label>
        <input type="range" min="64" max="2048" step="64" value={size} onChange={e => setSize(+e.target.value)} className="w-full accent-amber-500" />
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>64px</span><span>2048px</span></div>
      </div>
      <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('svg-input').click()}>
        <p className="text-3xl mb-2">🔷</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload SVG file</p>
        <p className="text-xs text-gray-400 mt-1">Max 10MB</p>
        <input id="svg-input" type="file" accept=".svg" className="hidden" onChange={e => e.target.files[0] && handle(e.target.files[0])} />
      </div>
      {error && <p className="text-sm text-red-500">⚠️ {error}</p>}
      {result && (
        <div className="space-y-3">
          <img src={result} alt="Converted PNG" className="max-w-full rounded-xl border border-gray-100 dark:border-slate-700 mx-auto block" style={{ maxHeight: 300 }} />
          <a href={result} download={`converted-${size}px.png`} className="btn-gold px-6 py-2.5">⬇ Download PNG</a>
        </div>
      )}
    </div>
  );
}
