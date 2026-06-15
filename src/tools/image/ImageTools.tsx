import { useState, useRef } from 'react';
import { Upload, Download, RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react';
import { validateImageFile, formatFileSize, FILE_LIMITS } from '../../utils/fileUtils';

// Grayscale Image
export const GrayscaleImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const convert = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
      }
      ctx.putImageData(imageData, 0, 0);
      setResult(canvas.toDataURL('image/png'));
    };
    img.src = image;
  };

  const download = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.download = 'grayscale-image.png';
    link.href = result;
    link.click();
  };

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*" className="hidden" />
      <div className="text-sm text-gray-500 dark:text-gray-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        ℹ️ Maximum file size: {formatFileSize(FILE_LIMITS.maxImageSize)}
      </div>
      {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">{error}</div>}
      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-[#1e3a5f]">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">Click to upload image</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Original</p>
              <img src={image} alt="Original" className="w-full rounded-xl" />
            </div>
            {result && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Grayscale</p>
                <img src={result} alt="Grayscale" className="w-full rounded-xl" />
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button onClick={convert} className="flex-1 py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold">Convert to Grayscale</button>
            {result && <button onClick={download} className="py-3 px-6 bg-green-500 text-white rounded-xl"><Download className="w-5 h-5" /></button>}
          </div>
          <button onClick={() => fileInputRef.current?.click()} className="w-full text-[#1e3a5f] dark:text-[#d4a843]">Upload different image</button>
        </>
      )}
    </div>
  );
};

// Flip & Rotate Image
export const FlipRotateImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) { setError(validation.message); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => { setImage(e.target?.result as string); setResult(null); setRotation(0); setFlipH(false); setFlipV(false); };
    reader.readAsDataURL(file);
  };

  const apply = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const isRotated = rotation === 90 || rotation === 270;
      canvas.width = isRotated ? img.height : img.width;
      canvas.height = isRotated ? img.width : img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      setResult(canvas.toDataURL('image/png'));
    };
    img.src = image;
  };

  const download = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.download = 'transformed-image.png';
    link.href = result;
    link.click();
  };

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*" className="hidden" />
      <div className="text-sm text-gray-500 dark:text-gray-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        ℹ️ Maximum file size: {formatFileSize(FILE_LIMITS.maxImageSize)}
      </div>
      {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">{error}</div>}
      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-[#1e3a5f]">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">Click to upload image</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <img src={result || image} alt="Preview" className="max-h-64 rounded-xl" style={{ transform: `rotate(${result ? 0 : rotation}deg) scaleX(${result ? 1 : flipH ? -1 : 1}) scaleY(${result ? 1 : flipV ? -1 : 1})` }} />
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setRotation((r) => (r + 90) % 360)} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <RotateCw className="w-6 h-6" /> 
            </button>
            <button onClick={() => setFlipH(!flipH)} className={`p-3 rounded-xl ${flipH ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <FlipHorizontal className="w-6 h-6" />
            </button>
            <button onClick={() => setFlipV(!flipV)} className={`p-3 rounded-xl ${flipV ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <FlipVertical className="w-6 h-6" />
            </button>
          </div>
          <div className="flex gap-4">
            <button onClick={apply} className="flex-1 py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold">Apply Changes</button>
            {result && <button onClick={download} className="py-3 px-6 bg-green-500 text-white rounded-xl"><Download className="w-5 h-5" /></button>}
          </div>
        </>
      )}
    </div>
  );
};

// Image Filter
export const ImageFilter = () => {
  const [image, setImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) { setError(validation.message); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia}%)`;

  const download = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.filter = filter;
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = 'filtered-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = image;
  };

  const reset = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    setSepia(0);
  };

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*" className="hidden" />
      {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">{error}</div>}
      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-[#1e3a5f]">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">Click to upload image</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <img src={image} alt="Preview" style={{ filter, maxHeight: '300px' }} className="rounded-lg" />
          </div>
          <div className="space-y-4">
            {[
              { label: 'Brightness', value: brightness, setter: setBrightness, min: 0, max: 200 },
              { label: 'Contrast', value: contrast, setter: setContrast, min: 0, max: 200 },
              { label: 'Saturation', value: saturation, setter: setSaturation, min: 0, max: 200 },
              { label: 'Blur', value: blur, setter: setBlur, min: 0, max: 10 },
              { label: 'Sepia', value: sepia, setter: setSepia, min: 0, max: 100 },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{s.label}</span>
                  <span className="font-medium">{s.value}{s.label === 'Blur' ? 'px' : '%'}</span>
                </div>
                <input type="range" min={s.min} max={s.max} value={s.value} onChange={(e) => s.setter(parseInt(e.target.value))} className="w-full" />
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={reset} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl">Reset</button>
            <button onClick={download} className="flex-1 py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Color Extractor
export const ColorExtractor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) { setError(validation.message); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgSrc = e.target?.result as string;
      setImage(imgSrc);
      extractColors(imgSrc);
    };
    reader.readAsDataURL(file);
  };

  const extractColors = (imgSrc: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 50;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size).data;
      const colorMap: Record<string, number> = {};
      for (let i = 0; i < imageData.length; i += 4) {
        const r = Math.round(imageData[i] / 32) * 32;
        const g = Math.round(imageData[i + 1] / 32) * 32;
        const b = Math.round(imageData[i + 2] / 32) * 32;
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }
      const sorted = Object.entries(colorMap).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([color]) => color);
      setColors(sorted);
    };
    img.src = imgSrc;
  };

  const copy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*" className="hidden" />
      {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">{error}</div>}
      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-[#1e3a5f]">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">Upload image to extract colors</p>
        </div>
      ) : (
        <>
          <img src={image} alt="Uploaded" className="w-full max-h-64 object-contain rounded-xl" />
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Extracted Colors</h3>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color, i) => (
                <button key={i} onClick={() => copy(color)} className="group relative">
                  <div className="aspect-square rounded-xl shadow-md" style={{ backgroundColor: color }} />
                  <p className="mt-1 text-xs text-center font-mono text-gray-600 dark:text-gray-400">{color}</p>
                  {copied === color && (
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded">Copied!</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => fileInputRef.current?.click()} className="w-full text-[#1e3a5f] dark:text-[#d4a843]">Upload different image</button>
        </>
      )}
    </div>
  );
};

// Image to Base64
export const ImageToBase64 = () => {
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) { setError(validation.message); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBase64(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*" className="hidden" />
      <div className="text-sm text-gray-500 dark:text-gray-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        ℹ️ Maximum file size: {formatFileSize(FILE_LIMITS.maxImageSize)}
      </div>
      {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">{error}</div>}
      <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-[#1e3a5f]">
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-40 mx-auto mb-4 rounded-lg" />
        ) : (
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        )}
        <p className="text-gray-600 dark:text-gray-400">{preview ? 'Click to change image' : 'Click to upload image'}</p>
      </div>
      {base64 && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Base64 Output</label>
            <button onClick={() => { navigator.clipboard.writeText(base64); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-sm text-[#1e3a5f] dark:text-[#d4a843]">
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <textarea value={base64} readOnly className="w-full h-40 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl font-mono text-xs resize-none" />
          <p className="text-sm text-gray-500 mt-2">Length: {base64.length.toLocaleString()} characters</p>
        </div>
      )}
    </div>
  );
};

// Screen Resolution
export const ScreenResolution = () => {
  const [resolution, setResolution] = useState({
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    colorDepth: window.screen.colorDepth,
    pixelRatio: window.devicePixelRatio,
    orientation: window.screen.orientation?.type || 'unknown'
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Screen Width', value: `${resolution.screenWidth}px` },
          { label: 'Screen Height', value: `${resolution.screenHeight}px` },
          { label: 'Viewport Width', value: `${resolution.viewportWidth}px` },
          { label: 'Viewport Height', value: `${resolution.viewportHeight}px` },
          { label: 'Color Depth', value: `${resolution.colorDepth} bit` },
          { label: 'Pixel Ratio', value: `${resolution.pixelRatio}x` },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
            <p className="text-2xl font-bold text-[#1e3a5f] dark:text-[#d4a843]">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 rounded-xl text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">Orientation</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">{resolution.orientation.replace('-', ' ')}</p>
      </div>
      <button onClick={() => setResolution({
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        colorDepth: window.screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
        orientation: window.screen.orientation?.type || 'unknown'
      })} className="w-full py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-semibold">
        Refresh
      </button>
    </div>
  );
};
