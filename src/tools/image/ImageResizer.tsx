import { useState, useRef } from 'react';
import { Upload, Download, Maximize2 } from 'lucide-react';

const ImageResizer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [resized, setResized] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = e.target?.result as string;
        setImage(e.target?.result as string);
        setResized(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspect && originalWidth > 0) {
      setHeight(Math.round((newWidth / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspect && originalHeight > 0) {
      setWidth(Math.round((newHeight / originalHeight) * originalWidth));
    }
  };

  const resize = () => {
    if (!image) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      setResized(canvas.toDataURL('image/png'));
    };
    img.src = image;
  };

  const download = () => {
    if (!resized) return;
    const link = document.createElement('a');
    link.download = `resized-${width}x${height}.png`;
    link.href = resized;
    link.click();
  };

  const presets = [
    { name: 'HD', w: 1280, h: 720 },
    { name: 'Full HD', w: 1920, h: 1080 },
    { name: 'Instagram', w: 1080, h: 1080 },
    { name: 'Twitter', w: 1200, h: 675 },
    { name: 'Facebook', w: 1200, h: 630 },
  ];

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {!image ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-[#1e3a5f] dark:hover:border-[#d4a843] transition-colors"
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">Click to upload an image</p>
        </div>
      ) : (
        <>
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
            <img src={resized || image} alt="Preview" className="w-full h-full object-contain" />
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Original: {originalWidth} × {originalHeight}px
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Width (px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Height (px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={maintainAspect}
              onChange={(e) => setMaintainAspect(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
            />
            <span className="text-gray-700 dark:text-gray-300">Maintain aspect ratio</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => { setWidth(preset.w); setHeight(preset.h); setMaintainAspect(false); }}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm"
                >
                  {preset.name} ({preset.w}×{preset.h})
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={resize}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Maximize2 className="w-5 h-5" />
              Resize Image
            </button>
            {resized && (
              <button
                onClick={download}
                className="py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageResizer;
