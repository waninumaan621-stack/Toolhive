import { useState, useRef, useEffect } from 'react';
import UploadZone from '../../components/UploadZone';
import imageCompression from 'browser-image-compression';

// ── Compress Image ────────────────────────────────────────────────────────
export function CompressImage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(80);

  const handle = async (file) => {
    setLoading(true); setResult(null);
    try {
      const compressed = await imageCompression(file, { maxSizeMB: (file.size / 1024 / 1024) * (quality / 100), useWebWorker: true });
      const url = URL.createObjectURL(compressed);
      setResult({ url, originalKB: (file.size/1024).toFixed(1), newKB: (compressed.size/1024).toFixed(1), saved: (((file.size-compressed.size)/file.size)*100).toFixed(1), name: file.name });
    } catch { alert('Compression failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <div><label className="label">Quality: {quality}%</label><input type="range" min="10" max="95" value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-gold-500" /></div>
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={10} onFile={handle} />
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><div className="w-4 h-4 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />Compressing…</div>}
      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-gray-400">Original</p><p className="font-bold">{result.originalKB} KB</p></div>
            <div><p className="text-xs text-gray-400">Compressed</p><p className="font-bold text-green-600">{result.newKB} KB</p></div>
            <div><p className="text-xs text-gray-400">Saved</p><p className="font-bold text-green-600">{result.saved}%</p></div>
          </div>
          <a href={result.url} download={'compressed_' + result.name} className="btn-gold w-full py-2.5 block text-center">⬇ Download</a>
        </div>
      )}
    </div>
  );
}

// ── Resize Image ──────────────────────────────────────────────────────────
export function ResizeImage() {
  const [img, setImg] = useState(null);
  const [w, setW] = useState(''); const [h, setH] = useState('');
  const [keepRatio, setKeepRatio] = useState(true);
  const [origW, setOrigW] = useState(0); const [origH, setOrigH] = useState(0);

  const handle = (file) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => { setOrigW(image.width); setOrigH(image.height); setW(image.width); setH(image.height); };
    image.src = url;
    setImg({ url, name: file.name, type: file.type });
  };

  const onW = (val) => { setW(val); if (keepRatio && origW) setH(Math.round(val * origH / origW)); };
  const onH = (val) => { setH(val); if (keepRatio && origH) setW(Math.round(val * origW / origH)); };

  const resize = () => {
    const canvas = document.createElement('canvas');
    canvas.width = +w; canvas.height = +h;
    const ctx = canvas.getContext('2d');
    const image = new Image(); image.src = img.url;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, +w, +h);
      const a = document.createElement('a'); a.href = canvas.toDataURL(img.type || 'image/jpeg', 0.92);
      a.download = 'resized_' + img.name; a.click();
    };
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={10} onFile={handle} />
      {img && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Width (px)</label><input className="input-field" type="number" value={w} onChange={e => onW(e.target.value)} /></div>
            <div><label className="label">Height (px)</label><input className="input-field" type="number" value={h} onChange={e => onH(e.target.value)} /></div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input type="checkbox" checked={keepRatio} onChange={e => setKeepRatio(e.target.checked)} className="accent-gold-500" />
            Keep aspect ratio
          </label>
          <button onClick={resize} className="btn-gold w-full py-3">📐 Resize & Download</button>
        </div>
      )}
    </div>
  );
}

// ── Crop Image ────────────────────────────────────────────────────────────
export function CropImage() {
  const [img, setImg] = useState(null);
  const [x, setX] = useState(0); const [y, setY] = useState(0);
  const [w, setW] = useState(200); const [h, setH] = useState(200);

  const handle = (file) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => { setW(Math.floor(image.width/2)); setH(Math.floor(image.height/2)); };
    image.src = url;
    setImg({ url, name: file.name, type: file.type });
  };

  const crop = () => {
    const canvas = document.createElement('canvas');
    canvas.width = +w; canvas.height = +h;
    const ctx = canvas.getContext('2d');
    const image = new Image(); image.src = img.url;
    image.onload = () => {
      ctx.drawImage(image, +x, +y, +w, +h, 0, 0, +w, +h);
      const a = document.createElement('a'); a.href = canvas.toDataURL(img.type || 'image/jpeg', 0.92);
      a.download = 'cropped_' + img.name; a.click();
    };
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={10} onFile={handle} />
      {img && (
        <div className="space-y-4">
          {img && <img src={img.url} alt="preview" className="w-full max-h-48 object-contain rounded-xl border border-gray-100 dark:border-navy-700" />}
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">X (left offset)</label><input className="input-field" type="number" value={x} onChange={e => setX(e.target.value)} /></div>
            <div><label className="label">Y (top offset)</label><input className="input-field" type="number" value={y} onChange={e => setY(e.target.value)} /></div>
            <div><label className="label">Width</label><input className="input-field" type="number" value={w} onChange={e => setW(e.target.value)} /></div>
            <div><label className="label">Height</label><input className="input-field" type="number" value={h} onChange={e => setH(e.target.value)} /></div>
          </div>
          <button onClick={crop} className="btn-gold w-full py-3">✂️ Crop & Download</button>
        </div>
      )}
    </div>
  );
}

// ── Convert Image ─────────────────────────────────────────────────────────
export function ConvertImage() {
  const [img, setImg] = useState(null);
  const [format, setFormat] = useState('image/png');

  const handle = (file) => setImg({ url: URL.createObjectURL(file), name: file.name.replace(/\.[^.]+$/, '') });

  const convert = () => {
    const ext = format.split('/')[1];
    const image = new Image(); image.src = img.url;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width; canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0);
      const a = document.createElement('a'); a.href = canvas.toDataURL(format, 0.92);
      a.download = `${img.name}.${ext}`; a.click();
    };
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp,.gif" maxMB={10} onFile={handle} />
      {img && (
        <div className="space-y-4">
          <div><label className="label">Convert To</label>
            <div className="flex gap-2">
              {[['image/jpeg','JPG'],['image/png','PNG'],['image/webp','WEBP']].map(([val, label]) => (
                <button key={val} onClick={() => setFormat(val)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${format === val ? 'bg-gold-500 text-white border-gold-500' : 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700 text-gray-700 dark:text-gray-300'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={convert} className="btn-gold w-full py-3">🔄 Convert & Download</button>
        </div>
      )}
    </div>
  );
}

// ── Grayscale ─────────────────────────────────────────────────────────────
export function GrayscaleImage() {
  const [result, setResult] = useState(null);
  const handle = (file) => {
    const image = new Image(); image.src = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width; canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < data.data.length; i += 4) {
        const gray = 0.299 * data.data[i] + 0.587 * data.data[i+1] + 0.114 * data.data[i+2];
        data.data[i] = data.data[i+1] = data.data[i+2] = gray;
      }
      ctx.putImageData(data, 0, 0);
      setResult({ url: canvas.toDataURL('image/jpeg', 0.92), name: file.name });
    };
  };
  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={10} onFile={handle} />
      {result && (
        <div className="space-y-3">
          <img src={result.url} alt="grayscale" className="w-full max-h-64 object-contain rounded-xl" />
          <a href={result.url} download={'gray_' + result.name} className="btn-gold w-full py-2.5 block text-center">⬇ Download</a>
        </div>
      )}
    </div>
  );
}

// ── Flip & Rotate ─────────────────────────────────────────────────────────
export function FlipRotateImage() {
  const [img, setImg] = useState(null);
  const [action, setAction] = useState('rotate90');
  const handle = (file) => setImg({ url: URL.createObjectURL(file), name: file.name });

  const apply = () => {
    const image = new Image(); image.src = img.url;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (action === 'rotate90') { canvas.width = image.height; canvas.height = image.width; ctx.translate(canvas.width,0); ctx.rotate(Math.PI/2); }
      else if (action === 'rotate180') { canvas.width = image.width; canvas.height = image.height; ctx.translate(canvas.width, canvas.height); ctx.rotate(Math.PI); }
      else if (action === 'rotate270') { canvas.width = image.height; canvas.height = image.width; ctx.translate(0, canvas.height); ctx.rotate(-Math.PI/2); }
      else if (action === 'flipH') { canvas.width = image.width; canvas.height = image.height; ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
      else if (action === 'flipV') { canvas.width = image.width; canvas.height = image.height; ctx.translate(0, canvas.height); ctx.scale(1, -1); }
      ctx.drawImage(image, 0, 0);
      const a = document.createElement('a'); a.href = canvas.toDataURL('image/jpeg', 0.92);
      a.download = 'transformed_' + img.name; a.click();
    };
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={10} onFile={handle} />
      {img && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[['rotate90','↷ Rotate 90°'],['rotate180','↻ Rotate 180°'],['rotate270','↶ Rotate 270°'],['flipH','↔ Flip Horizontal'],['flipV','↕ Flip Vertical']].map(([val, label]) => (
              <button key={val} onClick={() => setAction(val)}
                className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${action===val ? 'bg-gold-500 text-white border-gold-500' : 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700 text-gray-700 dark:text-gray-300'}`}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={apply} className="btn-gold w-full py-3">Apply & Download</button>
        </div>
      )}
    </div>
  );
}

// ── Image to Base64 ───────────────────────────────────────────────────────
export function ImageToBase64() {
  const [result, setResult] = useState('');
  const handle = (file) => {
    const reader = new FileReader();
    reader.onload = e => setResult(e.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp,.gif" maxMB={5} onFile={handle} />
      {result && (
        <div className="space-y-3">
          <textarea className="input-field h-32 font-mono text-xs resize-none" value={result} readOnly />
          <button onClick={() => navigator.clipboard.writeText(result)} className="btn-gold px-5 py-2.5">📋 Copy Base64</button>
        </div>
      )}
    </div>
  );
}

// ── Base64 to Image ───────────────────────────────────────────────────────
export function Base64ToImage() {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    try {
      const src = input.trim().startsWith('data:') ? input.trim() : 'data:image/png;base64,' + input.trim();
      const img = new Image();
      img.onload = () => setPreview(src);
      img.onerror = () => setError('Invalid Base64 image string.');
      img.src = src;
    } catch { setError('Invalid input.'); }
  };

  return (
    <div className="space-y-5">
      <div><label className="label">Paste Base64 String</label><textarea className="input-field h-32 font-mono text-xs resize-none" placeholder="data:image/png;base64,..." value={input} onChange={e => setInput(e.target.value)} /></div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button onClick={convert} disabled={!input} className="btn-gold px-6 py-2.5">Convert to Image</button>
      {preview && (
        <div className="space-y-3">
          <img src={preview} alt="result" className="max-w-full rounded-xl border border-gray-100 dark:border-navy-700" />
          <a href={preview} download="image.png" className="btn-gold px-5 py-2.5 inline-block">⬇ Download</a>
        </div>
      )}
    </div>
  );
}

// ── Image Watermark ───────────────────────────────────────────────────────
export function ImageWatermark() {
  const [img, setImg] = useState(null);
  const [text, setText] = useState('© ToolHive');
  const [opacity, setOpacity] = useState(50);
  const [size, setSize] = useState(30);

  const handle = (file) => setImg({ url: URL.createObjectURL(file), name: file.name });

  const apply = () => {
    const image = new Image(); image.src = img.url;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width; canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(text, canvas.width / 2, canvas.height - 30);
      const a = document.createElement('a'); a.href = canvas.toDataURL('image/jpeg', 0.92);
      a.download = 'watermarked_' + img.name; a.click();
    };
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={10} onFile={handle} />
      {img && (
        <div className="space-y-4">
          <div><label className="label">Watermark Text</label><input className="input-field" value={text} onChange={e => setText(e.target.value)} /></div>
          <div><label className="label">Opacity: {opacity}%</label><input type="range" min="10" max="100" value={opacity} onChange={e => setOpacity(+e.target.value)} className="w-full accent-gold-500" /></div>
          <div><label className="label">Font Size: {size}px</label><input type="range" min="12" max="80" value={size} onChange={e => setSize(+e.target.value)} className="w-full accent-gold-500" /></div>
          <button onClick={apply} className="btn-gold w-full py-3">💧 Apply Watermark & Download</button>
        </div>
      )}
    </div>
  );
}

// ── Add Text to Image ─────────────────────────────────────────────────────
export function AddTextImage() {
  const [img, setImg] = useState(null);
  const [text, setText] = useState('Hello World');
  const [x, setX] = useState(50); const [y, setY] = useState(50);
  const [color, setColor] = useState('#ffffff');
  const [size, setSize] = useState(32);

  const handle = (file) => setImg({ url: URL.createObjectURL(file), name: file.name });

  const apply = () => {
    const image = new Image(); image.src = img.url;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width; canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      ctx.fillStyle = color; ctx.font = `bold ${size}px sans-serif`;
      ctx.fillText(text, +x, +y);
      const a = document.createElement('a'); a.href = canvas.toDataURL('image/jpeg', 0.92);
      a.download = 'text_' + img.name; a.click();
    };
  };

  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={10} onFile={handle} />
      {img && (
        <div className="space-y-4">
          <div><label className="label">Text</label><input className="input-field" value={text} onChange={e => setText(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">X Position</label><input className="input-field" type="number" value={x} onChange={e => setX(e.target.value)} /></div>
            <div><label className="label">Y Position</label><input className="input-field" type="number" value={y} onChange={e => setY(e.target.value)} /></div>
            <div><label className="label">Color</label><input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-10 rounded-xl border border-gray-200 dark:border-navy-700 cursor-pointer" /></div>
            <div><label className="label">Font Size</label><input className="input-field" type="number" value={size} onChange={e => setSize(e.target.value)} /></div>
          </div>
          <button onClick={apply} className="btn-gold w-full py-3">✍️ Add Text & Download</button>
        </div>
      )}
    </div>
  );
}

// ── Color Extractor ───────────────────────────────────────────────────────
export function ColorExtractor() {
  const [colors, setColors] = useState([]);
  const handle = (file) => {
    const image = new Image(); image.src = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 100;
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      const colorMap = {};
      for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i]/32)*32, g = Math.round(data[i+1]/32)*32, b = Math.round(data[i+2]/32)*32;
        const key = `${r},${g},${b}`;
        colorMap[key] = (colorMap[key] || 0) + 1;
      }
      const sorted = Object.entries(colorMap).sort((a,b) => b[1]-a[1]).slice(0,10);
      setColors(sorted.map(([k]) => { const [r,g,b] = k.split(',').map(Number); return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`; }));
    };
  };
  return (
    <div className="space-y-5">
      <UploadZone accept=".jpg,.jpeg,.png,.webp" maxMB={5} onFile={handle} />
      {colors.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Dominant Colors</p>
          <div className="flex flex-wrap gap-3">
            {colors.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => navigator.clipboard.writeText(c)}>
                <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-navy-700 shadow-sm" style={{ background: c }} />
                <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{c}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">Click any color to copy HEX</p>
        </div>
      )}
    </div>
  );
}

// ── Screen Resolution ─────────────────────────────────────────────────────
export function ScreenResolution() {
  const info = {
    screen: `${window.screen.width} × ${window.screen.height}`,
    viewport: `${window.innerWidth} × ${window.innerHeight}`,
    devicePixelRatio: window.devicePixelRatio,
    colorDepth: window.screen.colorDepth + ' bit',
    orientation: window.screen.orientation?.type || 'unknown',
  };
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">Your display information detected automatically:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(info).map(([k, v]) => (
          <div key={k} className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1 capitalize">{k.replace(/([A-Z])/g, ' $1')}</p>
            <p className="font-bold text-navy-900 dark:text-white">{String(v)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
