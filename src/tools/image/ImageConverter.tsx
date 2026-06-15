import { useState, useRef } from 'react';
import { Upload, Download, RefreshCw } from 'lucide-react';

const ImageConverter = () => {
  const [image, setImage] = useState<string | null>(null);
  const [converted, setConverted] = useState<string | null>(null);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('png');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name.split('.')[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setConverted(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const convert = () => {
    if (!image) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // For PNG, fill with transparent background; for others, fill white
      if (format !== 'png') {
        ctx!.fillStyle = '#ffffff';
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx?.drawImage(img, 0, 0);
      const mimeType = `image/${format}`;
      const convertedDataUrl = canvas.toDataURL(mimeType, 0.92);
      setConverted(convertedDataUrl);
    };
    img.src = image;
  };

  const download = () => {
    if (!converted) return;
    const link = document.createElement('a');
    link.download = `${fileName}.${format}`;
    link.href = converted;
    link.click();
  };

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
          <p className="text-sm text-gray-400 mt-2">PNG, JPG, GIF, WEBP, BMP</p>
        </div>
      ) : (
        <>
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
            <img src={converted || image} alt="Preview" className="w-full h-full object-contain" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Convert to
            </label>
            <div className="flex gap-4">
              {(['jpeg', 'png', 'webp'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                    format === f
                      ? 'bg-[#1e3a5f] text-white dark:bg-[#d4a843] dark:text-[#1e3a5f]'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={convert}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Convert to {format.toUpperCase()}
            </button>
            {converted && (
              <button
                onClick={download}
                className="py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            )}
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 text-[#1e3a5f] dark:text-[#d4a843] hover:underline"
          >
            Upload a different image
          </button>
        </>
      )}
    </div>
  );
};

export default ImageConverter;
