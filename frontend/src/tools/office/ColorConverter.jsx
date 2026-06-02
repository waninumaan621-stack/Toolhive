import { useState } from 'react';

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 hover:bg-gray-200'}`}>
      {copied ? '✓' : '📋'}
    </button>
  );
};

export default function ColorConverter() {
  const [hex, setHex] = useState('#f59e0b');
  const [r, setR] = useState(245);
  const [g, setG] = useState(158);
  const [b, setB] = useState(11);

  const hexToRgb = (h) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result ? { r: parseInt(result[1],16), g: parseInt(result[2],16), b: parseInt(result[3],16) } : null;
  };

  const rgbToHex = (r,g,b) => '#' + [r,g,b].map(v => Math.max(0,Math.min(255,+v)).toString(16).padStart(2,'0')).join('');

  const rgbToHsl = (r,g,b) => {
    r/=255; g/=255; b/=255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b);
    let h,s,l=(max+min)/2;
    if(max===min) { h=s=0; } else {
      const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
      switch(max){ case r: h=((g-b)/d+(g<b?6:0))/6; break; case g: h=((b-r)/d+2)/6; break; case b: h=((r-g)/d+4)/6; break; }
    }
    return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
  };

  const onHexChange = (v) => {
    setHex(v);
    const rgb = hexToRgb(v);
    if (rgb) { setR(rgb.r); setG(rgb.g); setB(rgb.b); }
  };

  const onRgbChange = (nr, ng, nb) => {
    setR(nr); setG(ng); setB(nb);
    setHex(rgbToHex(nr, ng, nb));
  };

  const hsl = rgbToHsl(r, g, b);
  const hexVal = rgbToHex(r,g,b);
  const rgbVal = `rgb(${r}, ${g}, ${b})`;
  const hslVal = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cssVar = `--color: ${hexVal};`;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <input type="color" value={hexVal} onChange={e => onHexChange(e.target.value)}
          className="w-20 h-20 rounded-2xl cursor-pointer border-0 p-0 flex-shrink-0" />
        <div className="flex-1">
          <div className="h-12 rounded-xl shadow-sm" style={{ background: hexVal }} />
          <p className="text-xs text-gray-400 mt-1 text-center">{hexVal}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="label">HEX</label>
          <input className="input-field font-mono" value={hex} onChange={e => onHexChange(e.target.value)} placeholder="#f59e0b" />
        </div>
        <div>
          <label className="label">RGB</label>
          <div className="grid grid-cols-3 gap-2">
            {[['R',r,nr=>onRgbChange(nr,g,b)],['G',g,ng=>onRgbChange(r,ng,b)],['B',b,nb=>onRgbChange(r,g,nb)]].map(([l,v,fn])=>(
              <div key={l}>
                <span className="text-xs text-gray-400 block text-center mb-1">{l}</span>
                <input type="number" min="0" max="255" className="input-field text-center text-sm" value={v} onChange={e=>fn(+e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {[['HEX', hexVal],['RGB', rgbVal],['HSL', hslVal],['CSS Variable', cssVar]].map(([label, val]) => (
          <div key={label} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3">
            <span className="text-xs text-gray-400 w-24 flex-shrink-0">{label}</span>
            <code className="text-sm font-mono text-slate-900 dark:text-white flex-1">{val}</code>
            <CopyBtn text={val} />
          </div>
        ))}
      </div>
    </div>
  );
}
