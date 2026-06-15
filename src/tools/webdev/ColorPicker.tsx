import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const ColorPicker = () => {
  const [color, setColor] = useState('#1e3a5f');
  const [copied, setCopied] = useState('');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const colorFormats = [
    { name: 'HEX', value: color.toUpperCase() },
    { name: 'RGB', value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '' },
    { name: 'RGBA', value: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : '' },
    { name: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '' },
  ];

  const copyToClipboard = (value: string, name: string) => {
    navigator.clipboard.writeText(value);
    setCopied(name);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pick a Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-40 rounded-xl cursor-pointer border-0"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter HEX Code
          </label>
          <input
            type="text"
            value={color}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                setColor(val);
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
          />
          <div
            className="mt-4 h-24 rounded-xl border border-gray-200 dark:border-gray-700"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colorFormats.map((format) => (
          <div
            key={format.name}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl"
          >
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{format.name}</span>
              <p className="font-mono text-gray-900 dark:text-white">{format.value}</p>
            </div>
            <button
              onClick={() => copyToClipboard(format.value, format.name)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copied === format.name ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Color Shades */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Color Shades
        </label>
        <div className="flex rounded-xl overflow-hidden">
          {[0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2].map((opacity, i) => (
            <div
              key={i}
              className="flex-1 h-16 cursor-pointer hover:scale-105 transition-transform"
              style={{
                backgroundColor: color,
                opacity: i < 4 ? opacity : 1,
                filter: i >= 5 ? `brightness(${opacity + 0.2})` : undefined,
              }}
              onClick={() => copyToClipboard(color, 'shade')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
