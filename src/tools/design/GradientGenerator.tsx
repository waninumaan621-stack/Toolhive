import { useState } from 'react';
import { Copy, Check, Plus, Trash2 } from 'lucide-react';

const GradientGenerator = () => {
  const [colors, setColors] = useState(['#1e3a5f', '#d4a843']);
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [copied, setCopied] = useState(false);

  const gradient = type === 'linear'
    ? `linear-gradient(${angle}deg, ${colors.join(', ')})`
    : `radial-gradient(circle, ${colors.join(', ')})`;

  const cssCode = `background: ${gradient};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, '#ffffff']);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div
        className="h-48 rounded-xl shadow-inner"
        style={{ background: gradient }}
      />

      {/* Type */}
      <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
        <button
          onClick={() => setType('linear')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            type === 'linear'
              ? 'bg-white dark:bg-gray-700 text-[#1e3a5f] dark:text-[#d4a843] shadow'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Linear
        </button>
        <button
          onClick={() => setType('radial')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            type === 'radial'
              ? 'bg-white dark:bg-gray-700 text-[#1e3a5f] dark:text-[#d4a843] shadow'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Radial
        </button>
      </div>

      {/* Angle (for linear) */}
      {type === 'linear' && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Angle
            </label>
            <span className="text-sm font-bold text-[#1e3a5f] dark:text-[#d4a843]">{angle}°</span>
          </div>
          <input
            type="range"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            min={0}
            max={360}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1e3a5f] dark:accent-[#d4a843]"
          />
        </div>
      )}

      {/* Colors */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Colors
          </label>
          {colors.length < 5 && (
            <button
              onClick={addColor}
              className="flex items-center gap-1 text-sm text-[#1e3a5f] dark:text-[#d4a843] hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Color
            </button>
          )}
        </div>
        <div className="space-y-2">
          {colors.map((color, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              />
              {colors.length > 2 && (
                <button
                  onClick={() => removeColor(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
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
          <code className="text-green-400 text-sm">{cssCode}</code>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
