import { useState, useRef, useEffect } from 'react';

export default function QrScanner() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

  const startScan = async () => {
    setError('');
    setResult('');
    setLoading(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
      setLoading(false);
      startFrameCapture();
    } catch (err) {
      setLoading(false);
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permission in your browser settings and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Camera not available. Please upload an image containing a QR code instead.');
      }
    }
  };

  const startFrameCapture = () => {
    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || !videoRef.current.videoWidth) return;
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

      // Use BarcodeDetector if available (Chrome/Android)
      if ('BarcodeDetector' in window) {
        try {
          const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
          const codes = await detector.detect(canvas);
          if (codes.length > 0) {
            setResult(codes[0].rawValue);
            stopScan();
          }
        } catch {}
      }
    }, 500);
  };

  const stopScan = () => {
    clearInterval(intervalRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setScanning(false);
    setLoading(false);
  };

  const scanFile = async (file) => {
    setError('');
    setResult('');

    if ('BarcodeDetector' in window) {
      try {
        const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise(r => img.onload = r);
        const codes = await detector.detect(img);
        if (codes.length > 0) {
          setResult(codes[0].rawValue);
        } else {
          setError('No QR code found in this image. Make sure the QR code is clearly visible.');
        }
      } catch {
        setError('Could not scan QR code. Try a clearer image.');
      }
    } else {
      // Fallback for browsers without BarcodeDetector
      setError('QR scanning from file requires Chrome or Edge. Please use camera scan instead.');
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
          <span>⚠️</span><span>{error}</span>
        </div>
      )}

      {/* Camera button */}
      <div className="flex gap-3">
        <button
          onClick={scanning ? stopScan : startScan}
          disabled={loading}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
            scanning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'btn-gold'
          }`}
        >
          {loading ? '⏳ Opening camera…' : scanning ? '⏹ Stop Camera' : '📷 Start Camera Scan'}
        </button>
      </div>

      {/* Video */}
      {scanning && (
        <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400">
          <video ref={videoRef} className="w-full rounded-xl" muted playsInline />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-amber-400 rounded-xl opacity-60" />
          </div>
          <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-white bg-black/40 py-1">
            Point camera at QR code
          </p>
        </div>
      )}

      {/* Upload image */}
      <div
        className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('qr-file-input').click()}
      >
        <p className="text-2xl mb-2">📁</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Or upload an image with QR code</p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — Max 5MB</p>
        <input
          id="qr-file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => e.target.files[0] && scanFile(e.target.files[0])}
        />
      </div>

      {/* Result */}
      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">QR Code Scanned!</p>
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-200 break-all font-mono bg-white dark:bg-slate-800 rounded-lg p-3">
            {result}
          </p>
          <div className="flex gap-2">
            <button onClick={copyResult} className="btn-gold text-sm px-4 py-2">📋 Copy Result</button>
            {result.startsWith('http') && (
              <a href={result} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm px-4 py-2">
                🔗 Open Link
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
