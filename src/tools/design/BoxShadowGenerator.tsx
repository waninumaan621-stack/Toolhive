import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const BoxShadowGenerator = () => {
  const [horizontal, setHorizontal] = useState(5);
  const [vertical, setVertical] = useState(5);
  const [blur, setBlur] = useState(15);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#1e3a5f');
  const [opacity, setOpacity] = useState(30);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
  };

  const shadow = `${inset ? 'inset ' : ''}${horizontal}px ${vertical}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const cssCode = `box-shadow: ${shadow};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sliders = [
    { label: 'Horizontal', value: horizontal, setter: setHorizontal, min: -50, max: 50 },
    { label: 'Vertical', value: vertical, setter: setVertical, min: -50, max: 50 },
    { label: 'Blur', value: blur, setter: setBlur, min: 0, max: 100 },
    { label: 'Spread', value: spread, setter: setSpread, min: -50, max: 50 },
    { label: 'Opacity', value: opacity, setter: setOpacity, min: 0, max: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="flex items-center justify-center p-12 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div
          className="w-48 h-48 bg-white dark:bg-gray-700 rounded-2xl"
          style={{ boxShadow: shadow }}
        />
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        {sliders.map((slider) => (
          <div key={slider.label}>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {slider.label}
              </label>
              <span className="text-sm font-bold text-[#1e3a5f] dark:text-[#d4a843]">
                {slider.value}{slider.label === 'Opacity' ? '%' : 'px'}
              </span>
            </div>
            <input
              type="range"
              value={slider.value}
              onChange={(e) => slider.setter(parseInt(e.target.value))}
              min={slider.min}
              max={slider.max}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1e3a5f] dark:accent-[#d4a843]"
            />
          </div>
        ))}
      </div>

      {/* Color & Inset */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Shadow Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer border-0"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={inset}
              onChange={(e) => setInset(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
            />
            <span className="text-gray-700 dark:text-gray-300">Inset</span>
          </label>
        </div>
      </div>

      {/* CSS Code */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            CSS Code
          </label>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="p-4 bg-gray-900 rounded-xl">
          <code className="text-green-400 text-sm break-all">{cssCode}</code>
        </div>
      </div>
    </div>
  );
};

export default BoxShadowGenerator;
