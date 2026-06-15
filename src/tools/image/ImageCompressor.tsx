import { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';

const ImageCompressor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setCompressed(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const compress = () => {
    if (!image) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressed(compressedDataUrl);
      
      // Calculate compressed size
      const base64Length = compressedDataUrl.split(',')[1].length;
      setCompressedSize(Math.round((base64Length * 3) / 4));
    };
    img.src = image;
  };

  const download = () => {
    if (!compressed) return;
    const link = document.createElement('a');
    link.download = 'compressed-image.jpg';
    link.href = compressed;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const savings = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

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
          <p className="text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-400 mt-2">PNG, JPG, WEBP up to 10MB</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original</h3>
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                <img src={image} alt="Original" className="w-full h-full object-contain" />
              </div>
              <p className="text-sm text-gray-500 mt-2">Size: {formatSize(originalSize)}</p>
            </div>
            
            {compressed && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compressed</h3>
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                  <img src={compressed} alt="Compressed" className="w-full h-full object-contain" />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Size: {formatSize(compressedSize)} 
                  <span className="text-green-500 ml-2">(-{savings}%)</span>
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quality
              </label>
              <span className="text-sm font-bold text-[#1e3a5f] dark:text-[#d4a843]">{quality}%</span>
            </div>
            <input
              type="range"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              min={10}
              max={100}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1e3a5f] dark:accent-[#d4a843]"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={compress}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-5 h-5" />
              Compress Image
            </button>
            {compressed && (
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

export default ImageCompressor;
