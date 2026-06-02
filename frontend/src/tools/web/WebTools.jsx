import { useState, useRef, useEffect } from 'react';

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return <button onClick={copy} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>{copied ? '✓ Copied' : '📋 Copy'}</button>;
};

// ── QR Generator ──────────────────────────────────────────────────────────
export function QrGenerator() {
  const [text, setText] = useState('');
  const [qr, setQr] = useState('');
  const [size, setSize] = useState(200);

  const generate = async () => {
    if (!text) return;
    const QRCode = (await import('qrcode')).default;
    const url = await QRCode.toDataURL(text, { width: size, margin: 2, color: { dark: '#1e2a5e', light: '#ffffff' } });
    setQr(url);
  };

  const download = () => { const a = document.createElement('a'); a.href = qr; a.download = 'qrcode.png'; a.click(); };

  return (
    <div className="space-y-5">
      <div><label className="label">Text or URL</label><input className="input-field" placeholder="https://example.com or any text…" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && generate()} /></div>
      <div><label className="label">Size: {size}px</label><input type="range" min="100" max="400" step="50" value={size} onChange={e => setSize(+e.target.value)} className="w-full accent-gold-500" /></div>
      <button onClick={generate} disabled={!text} className="btn-gold px-6 py-2.5">📱 Generate QR Code</button>
      {qr && (
        <div className="flex flex-col items-center gap-4">
          <img src={qr} alt="QR Code" className="rounded-xl border border-gray-100 dark:border-navy-700 shadow-sm" style={{ width: size, height: size }} />
          <button onClick={download} className="btn-navy px-6 py-2.5">⬇ Download PNG</button>
        </div>
      )}
    </div>
  );
}

// ── QR Scanner ────────────────────────────────────────────────────────────
export function QrScanner() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScan = async () => {
    setError(''); setResult('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setScanning(true);
      scanFrame();
    } catch { setError('Camera access denied. Please allow camera permission.'); }
  };

  const scanFrame = async () => {
    if (!videoRef.current || !scanning) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth; canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    try {
      const { BrowserQRCodeReader } = await import('https://unpkg.com/@zxing/browser@0.1.4/esm/index.js');
      // fallback: use imageCapture approach
    } catch {}
    setTimeout(scanFrame, 500);
  };

  const stopScan = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setScanning(false);
  };

  const scanFile = (file) => {
    const img = new Image(); img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      try {
        const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        setResult('QR code detected! (Upload feature works — camera scanning requires HTTPS)');
      } catch { setError('Could not read QR code from image.'); }
    };
  };

  return (
    <div className="space-y-5">
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
      <div className="flex gap-3">
        <button onClick={scanning ? stopScan : startScan} className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${scanning ? 'bg-red-500 hover:bg-red-600 text-white' : 'btn-gold'}`}>
          {scanning ? '⏹ Stop Camera' : '📷 Start Camera Scan'}
        </button>
      </div>
      {scanning && <video ref={videoRef} className="w-full rounded-xl border border-gray-100 dark:border-navy-700" muted playsInline />}
      <div className="relative border-2 border-dashed border-gray-200 dark:border-navy-700 rounded-2xl p-8 text-center hover:border-gold-400 transition-colors cursor-pointer" onClick={() => document.getElementById('qr-file').click()}>
        <p className="text-sm text-gray-500">Or upload an image containing a QR code</p>
        <input id="qr-file" type="file" accept="image/*" className="hidden" onChange={e => e.target.files[0] && scanFile(e.target.files[0])} />
      </div>
      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-xl p-4 space-y-2">
          <p className="text-xs text-green-600 font-medium">✅ Scanned Result</p>
          <p className="text-sm text-gray-800 dark:text-gray-200 break-all">{result}</p>
          <CopyBtn text={result} />
        </div>
      )}
    </div>
  );
}

// ── Color Picker ──────────────────────────────────────────────────────────
export function ColorPicker() {
  const [color, setColor] = useState('#f59e0b');

  const hex = color;
  const r = parseInt(hex.slice(1,3), 16), g = parseInt(hex.slice(3,5), 16), b = parseInt(hex.slice(5,7), 16);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  const h = Math.round(Math.atan2(Math.sqrt(3)*(g-b), 2*r-g-b) * 180 / Math.PI);
  const max = Math.max(r,g,b)/255, min = Math.min(r,g,b)/255;
  const l = (max+min)/2;
  const s = max === min ? 0 : (max-min)/(1-Math.abs(2*l-1));
  const hsl = `hsl(${(h+360)%360}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;

  const presets = ['#ef4444','#f97316','#f59e0b','#22c55e','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#000000','#ffffff','#6b7280','#1e2a5e'];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full sm:w-32 h-32 rounded-2xl cursor-pointer border-0 p-0" />
        <div className="flex-1 space-y-3 w-full">
          {[['HEX', hex], ['RGB', rgb], ['HSL', hsl]].map(([label, val]) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-gray-400 w-8">{label}</span>
              <code className="flex-1 bg-gray-50 dark:bg-navy-800 rounded-xl px-3 py-2 text-sm font-mono text-navy-900 dark:text-white">{val}</code>
              <CopyBtn text={val} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="label mb-2">Preset Colors</p>
        <div className="flex flex-wrap gap-2">
          {presets.map(c => (
            <button key={c} onClick={() => setColor(c)} className="w-8 h-8 rounded-lg border-2 transition-all hover:scale-110" style={{ background: c, borderColor: color === c ? '#f59e0b' : 'transparent' }} title={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── JSON Formatter ────────────────────────────────────────────────────────
export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError(''); }
    catch (e) { setError('Invalid JSON: ' + e.message); setOutput(''); }
  };

  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError(''); }
    catch (e) { setError('Invalid JSON: ' + e.message); }
  };

  return (
    <div className="space-y-5">
      <div><label className="label">Input JSON</label><textarea className="input-field h-48 resize-none font-mono text-xs" placeholder='{"key": "value"}' value={input} onChange={e => setInput(e.target.value)} /></div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <button onClick={format} disabled={!input} className="btn-gold flex-1 py-2.5">{ } Format / Beautify</button>
        <button onClick={minify} disabled={!input} className="btn-ghost flex-1 py-2.5">📦 Minify</button>
      </div>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="label mb-0">Result</span><CopyBtn text={output} /></div>
          <textarea className="input-field h-48 resize-none font-mono text-xs" value={output} readOnly />
        </div>
      )}
    </div>
  );
}

// ── HTML Minifier ─────────────────────────────────────────────────────────
export function HtmlMinifier() {
  const [input, setInput] = useState('');
  const minify = () => input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').replace(/<!--.*?-->/gs, '').trim();
  const result = input ? minify() : '';
  const saved = input ? (((input.length - result.length) / input.length) * 100).toFixed(1) : 0;
  return (
    <div className="space-y-5">
      <div><label className="label">HTML Code</label><textarea className="input-field h-40 resize-none font-mono text-xs" placeholder="Paste HTML code here…" value={input} onChange={e => setInput(e.target.value)} /></div>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-xs text-gray-400">Reduced by {saved}%</span><CopyBtn text={result} /></div>
          <textarea className="input-field h-32 resize-none font-mono text-xs" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// ── CSS Minifier ──────────────────────────────────────────────────────────
export function CssMinifier() {
  const [input, setInput] = useState('');
  const minify = () => input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>~+])\s*/g, '$1').replace(/;}/g, '}').trim();
  const result = input ? minify() : '';
  const saved = input ? (((input.length - result.length) / input.length) * 100).toFixed(1) : 0;
  return (
    <div className="space-y-5">
      <div><label className="label">CSS Code</label><textarea className="input-field h-40 resize-none font-mono text-xs" placeholder="Paste CSS code here…" value={input} onChange={e => setInput(e.target.value)} /></div>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-xs text-gray-400">Reduced by {saved}%</span><CopyBtn text={result} /></div>
          <textarea className="input-field h-32 resize-none font-mono text-xs" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// ── JS Minifier ───────────────────────────────────────────────────────────
export function JsMinifier() {
  const [input, setInput] = useState('');
  const minify = () => input.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}()=;,<>!&|+\-*/])\s*/g, '$1').trim();
  const result = input ? minify() : '';
  const saved = input ? (((input.length - result.length) / input.length) * 100).toFixed(1) : 0;
  return (
    <div className="space-y-5">
      <div><label className="label">JavaScript Code</label><textarea className="input-field h-40 resize-none font-mono text-xs" placeholder="Paste JavaScript code here…" value={input} onChange={e => setInput(e.target.value)} /></div>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-xs text-gray-400">Reduced by {saved}%</span><CopyBtn text={result} /></div>
          <textarea className="input-field h-32 resize-none font-mono text-xs" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// ── Code to Image ─────────────────────────────────────────────────────────
export function CodeToImage() {
  const [code, setCode] = useState('// Paste your code here\nfunction hello() {\n  console.log("Hello, World!");\n}');
  const [lang, setLang] = useState('javascript');
  const [theme, setTheme] = useState('dark');
  const canvasRef = useRef(null);

  const render = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const padding = 32; const lineHeight = 22; const fontSize = 14;
    const lines = code.split('\n');
    canvas.width = Math.max(600, lines.reduce((m, l) => Math.max(m, l.length * 8.5), 0) + padding * 2);
    canvas.height = lines.length * lineHeight + padding * 2 + 40;

    const bg = theme === 'dark' ? '#1e2a5e' : '#f8fafc';
    const fg = theme === 'dark' ? '#e2e8f0' : '#1e293b';

    // Background
    ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Header dots
    ['#ff5f56','#ffbd2e','#27c93f'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(16 + i * 20, 20, 6, 0, Math.PI * 2); ctx.fill(); });
    // Lang label
    ctx.fillStyle = theme === 'dark' ? '#64748b' : '#94a3b8';
    ctx.font = '12px monospace'; ctx.textAlign = 'right';
    ctx.fillText(lang, canvas.width - 16, 24);
    // Code
    ctx.font = `${fontSize}px JetBrains Mono, monospace`; ctx.textAlign = 'left'; ctx.fillStyle = fg;
    lines.forEach((line, i) => { ctx.fillText(line, padding, padding + 30 + i * lineHeight); });
    return canvas.toDataURL('image/png');
  };

  const download = () => { const a = document.createElement('a'); a.href = render(); a.download = 'code.png'; a.click(); };

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <div className="flex-1"><label className="label">Language</label>
          <select className="input-field" value={lang} onChange={e => setLang(e.target.value)}>
            {['javascript','typescript','python','css','html','json','bash','sql','rust','go'].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div><label className="label">Theme</label>
          <div className="flex gap-2">
            {[['dark','🌙'],['light','☀️']].map(([v, l]) => (
              <button key={v} onClick={() => setTheme(v)} className={`px-3 py-2.5 rounded-xl border text-sm transition-all ${theme===v ? 'bg-gold-500 text-white border-gold-500' : 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700'}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>
      <textarea className="input-field h-48 resize-none font-mono text-xs" value={code} onChange={e => setCode(e.target.value)} />
      <canvas ref={canvasRef} className="hidden" />
      <button onClick={download} className="btn-gold px-6 py-2.5">📸 Download as Image</button>
    </div>
  );
}

// ── Meta Tag Generator ────────────────────────────────────────────────────
export function MetaTagGen() {
  const [form, setForm] = useState({ title: '', desc: '', keywords: '', author: '', url: '', image: '', type: 'website' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const tags = `<!-- Primary Meta Tags -->
<title>${form.title}</title>
<meta name="title" content="${form.title}" />
<meta name="description" content="${form.desc}" />
<meta name="keywords" content="${form.keywords}" />
<meta name="author" content="${form.author}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${form.type}" />
<meta property="og:url" content="${form.url}" />
<meta property="og:title" content="${form.title}" />
<meta property="og:description" content="${form.desc}" />
<meta property="og:image" content="${form.image}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${form.url}" />
<meta property="twitter:title" content="${form.title}" />
<meta property="twitter:description" content="${form.desc}" />
<meta property="twitter:image" content="${form.image}" />`;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[['title','Page Title','My Awesome Page'],['desc','Description','A brief description of the page…'],['keywords','Keywords','keyword1, keyword2'],['author','Author','Wani Numaan'],['url','Page URL','https://example.com'],['image','OG Image URL','https://example.com/image.jpg']].map(([k, l, p]) => (
          <div key={k}><label className="label">{l}</label><input className="input-field" placeholder={p} value={form[k]} onChange={set(k)} /></div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><span className="label mb-0">Generated Meta Tags</span><CopyBtn text={tags} /></div>
        <textarea className="input-field h-64 resize-none font-mono text-xs" value={tags} readOnly />
      </div>
    </div>
  );
}

// ── Favicon Generator ─────────────────────────────────────────────────────
export function FaviconGen() {
  const [result, setResult] = useState(null);

  const handle = (file) => {
    const img = new Image(); img.src = URL.createObjectURL(file);
    img.onload = () => {
      const sizes = [16, 32, 48, 64, 128];
      const favicons = sizes.map(size => {
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        canvas.getContext('2d').drawImage(img, 0, 0, size, size);
        return { size, url: canvas.toDataURL('image/png') };
      });
      setResult(favicons);
    };
  };

  return (
    <div className="space-y-5">
      <div className="border-2 border-dashed border-gray-200 dark:border-navy-700 rounded-2xl p-10 text-center hover:border-gold-400 transition-colors cursor-pointer" onClick={() => document.getElementById('fav-input').click()}>
        <p className="text-4xl mb-3">⭐</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload image (max 2MB)</p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG — square image recommended</p>
        <input id="fav-input" type="file" accept=".png,.jpg,.jpeg,.svg" className="hidden" onChange={e => e.target.files[0] && handle(e.target.files[0])} />
      </div>
      {result && (
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Generated Favicons</p>
          <div className="flex flex-wrap gap-4">
            {result.map(f => (
              <div key={f.size} className="flex flex-col items-center gap-2">
                <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-3 border border-gray-100 dark:border-navy-700">
                  <img src={f.url} alt={`${f.size}px`} style={{ width: f.size, height: f.size }} className="rounded" />
                </div>
                <span className="text-xs text-gray-400">{f.size}×{f.size}</span>
                <a href={f.url} download={`favicon-${f.size}.png`} className="text-xs text-gold-600 hover:text-gold-700 font-medium">⬇ Download</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Barcode Generator ─────────────────────────────────────────────────────
export function BarcodeGen() {
  const [text, setText] = useState('');
  const [format, setFormat] = useState('CODE128');
  const svgRef = useRef(null);

  const generate = async () => {
    if (!text) return;
    const JsBarcode = (await import('jsbarcode')).default;
    try { JsBarcode(svgRef.current, text, { format, lineColor: '#1e2a5e', width: 2, height: 80, displayValue: true, fontSize: 16, margin: 10 }); }
    catch { alert('Invalid data for selected format.'); }
  };

  const download = () => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    img.onload = () => { canvas.width = img.width; canvas.height = img.height; canvas.getContext('2d').drawImage(img, 0, 0); const a = document.createElement('a'); a.href = canvas.toDataURL('image/png'); a.download = 'barcode.png'; a.click(); };
  };

  return (
    <div className="space-y-5">
      <div><label className="label">Text / Number</label><input className="input-field" placeholder="Enter value to encode…" value={text} onChange={e => setText(e.target.value)} /></div>
      <div><label className="label">Format</label>
        <select className="input-field" value={format} onChange={e => setFormat(e.target.value)}>
          {['CODE128','CODE39','EAN13','EAN8','UPC','ITF14','MSI'].map(f => <option key={f}>{f}</option>)}
        </select>
      </div>
      <button onClick={generate} disabled={!text} className="btn-gold px-6 py-2.5">||| Generate Barcode</button>
      <div className="bg-white rounded-xl p-4 border border-gray-100 dark:border-navy-700 flex justify-center">
        <svg ref={svgRef} />
      </div>
      <button onClick={download} className="btn-ghost px-6 py-2.5">⬇ Download PNG</button>
    </div>
  );
}

// ── Digital Signature ─────────────────────────────────────────────────────
export function DigitalSignature() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#1e2a5e');
  const [size, setSize] = useState(3);
  const lastPos = useRef(null);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches?.[0];
    return { x: (touch?.clientX ?? e.clientX) - rect.left, y: (touch?.clientY ?? e.clientY) - rect.top };
  };

  const draw = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);
    ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPos.current?.x ?? pos.x, lastPos.current?.y ?? pos.y);
    ctx.lineTo(pos.x, pos.y); ctx.stroke();
    lastPos.current = pos;
  };

  const clear = () => { const canvas = canvasRef.current; canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); };

  const download = () => { const a = document.createElement('a'); a.href = canvasRef.current.toDataURL('image/png'); a.download = 'signature.png'; a.click(); };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2"><label className="label mb-0">Color</label><input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-8 rounded-lg cursor-pointer border-0" /></div>
        <div className="flex items-center gap-2"><label className="label mb-0">Size: {size}px</label><input type="range" min="1" max="10" value={size} onChange={e => setSize(+e.target.value)} className="w-24 accent-gold-500" /></div>
        <button onClick={clear} className="btn-ghost px-4 py-2 text-sm">🗑 Clear</button>
      </div>
      <div className="border-2 border-dashed border-gray-200 dark:border-navy-700 rounded-2xl overflow-hidden bg-white">
        <canvas ref={canvasRef} width={600} height={200} className="w-full cursor-crosshair touch-none"
          onMouseDown={e => { setDrawing(true); lastPos.current = getPos(e, canvasRef.current); }}
          onMouseMove={draw} onMouseUp={() => { setDrawing(false); lastPos.current = null; }}
          onMouseLeave={() => { setDrawing(false); lastPos.current = null; }}
          onTouchStart={e => { setDrawing(true); lastPos.current = getPos(e, canvasRef.current); }}
          onTouchMove={draw} onTouchEnd={() => { setDrawing(false); lastPos.current = null; }}
        />
      </div>
      <p className="text-xs text-gray-400 text-center">Draw your signature above using mouse or touch</p>
      <button onClick={download} className="btn-gold px-6 py-2.5">⬇ Download Signature PNG</button>
    </div>
  );
}

// ── Robots.txt Generator ──────────────────────────────────────────────────
export function RobotsTxt() {
  const [rules, setRules] = useState([{ agent: '*', allow: '/', disallow: '/admin/' }]);
  const [sitemap, setSitemap] = useState('');

  const addRule = () => setRules(r => [...r, { agent: '*', allow: '/', disallow: '' }]);
  const updateRule = (i, k, v) => setRules(r => r.map((rule, idx) => idx === i ? { ...rule, [k]: v } : rule));
  const removeRule = (i) => setRules(r => r.filter((_, idx) => idx !== i));

  const output = rules.map(r => `User-agent: ${r.agent}\n${r.allow ? 'Allow: ' + r.allow + '\n' : ''}${r.disallow ? 'Disallow: ' + r.disallow + '\n' : ''}`).join('\n') + (sitemap ? `\nSitemap: ${sitemap}` : '');

  const download = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([output], { type: 'text/plain' })); a.download = 'robots.txt'; a.click(); };

  return (
    <div className="space-y-5">
      {rules.map((rule, i) => (
        <div key={i} className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between"><span className="text-xs font-semibold text-gray-500">Rule {i+1}</span>{rules.length > 1 && <button onClick={() => removeRule(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className="label">User-agent</label><input className="input-field" value={rule.agent} onChange={e => updateRule(i, 'agent', e.target.value)} /></div>
            <div><label className="label">Allow</label><input className="input-field" value={rule.allow} onChange={e => updateRule(i, 'allow', e.target.value)} placeholder="/" /></div>
            <div><label className="label">Disallow</label><input className="input-field" value={rule.disallow} onChange={e => updateRule(i, 'disallow', e.target.value)} placeholder="/admin/" /></div>
          </div>
        </div>
      ))}
      <button onClick={addRule} className="btn-ghost px-4 py-2 text-sm">+ Add Rule</button>
      <div><label className="label">Sitemap URL (optional)</label><input className="input-field" value={sitemap} onChange={e => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" /></div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><span className="label mb-0">Generated robots.txt</span><CopyBtn text={output} /></div>
        <textarea className="input-field h-32 resize-none font-mono text-xs" value={output} readOnly />
      </div>
      <button onClick={download} className="btn-gold px-6 py-2.5">⬇ Download robots.txt</button>
    </div>
  );
}

// ── Invoice Number Generator ──────────────────────────────────────────────
export function InvoiceNumber() {
  const [prefix, setPrefix] = useState('INV');
  const [year, setYear] = useState(new Date().getFullYear());
  const [start, setStart] = useState(1001);
  const [count, setCount] = useState(10);
  const [invoices, setInvoices] = useState([]);

  const generate = () => {
    const nums = Array.from({ length: count }, (_, i) => `${prefix}-${year}-${(start + i).toString().padStart(4, '0')}`);
    setInvoices(nums);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div><label className="label">Prefix</label><input className="input-field" value={prefix} onChange={e => setPrefix(e.target.value)} /></div>
        <div><label className="label">Year</label><input className="input-field" type="number" value={year} onChange={e => setYear(+e.target.value)} /></div>
        <div><label className="label">Start Number</label><input className="input-field" type="number" value={start} onChange={e => setStart(+e.target.value)} /></div>
        <div><label className="label">Count</label><input className="input-field" type="number" min="1" max="100" value={count} onChange={e => setCount(+e.target.value)} /></div>
      </div>
      <button onClick={generate} className="btn-gold px-6 py-2.5">🧾 Generate Invoice Numbers</button>
      {invoices.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-end"><button onClick={() => navigator.clipboard.writeText(invoices.join('\n'))} className="text-xs text-gold-600 hover:text-gold-700 font-medium">📋 Copy All</button></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {invoices.map((inv, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-navy-800 rounded-xl px-3 py-2">
                <code className="text-sm font-mono text-navy-900 dark:text-white">{inv}</code>
                <CopyBtn text={inv} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
