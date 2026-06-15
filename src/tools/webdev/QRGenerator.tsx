import { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import QRCode from 'qrcode';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [color, setColor] = useState('#1e3a5f');
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (text && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        margin: 2,
        color: {
          dark: color,
          light: bgColor,
        },
      });
    }
  }, [text, size, color, bgColor]);

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter text or URL
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com or any text..."
          className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] dark:focus:ring-[#d4a843] focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={128}>128px</option>
            <option value={256}>256px</option>
            <option value={512}>512px</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            QR Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 rounded-xl cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Background
          </label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-10 rounded-xl cursor-pointer"
          />
        </div>
      </div>

      {text && (
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <canvas ref={canvasRef} className="rounded-lg shadow-lg" />
          <button
            onClick={download}
            className="flex items-center gap-2 px-6 py-2 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-semibold rounded-xl transition-colors"
          >
            <Download className="w-5 h-5" />
            Download QR Code
          </button>
        </div>
      )}

      {!text && (
        <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-400">
          Enter text or URL to generate QR code
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
