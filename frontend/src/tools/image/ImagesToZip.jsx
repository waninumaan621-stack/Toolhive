import { useState } from 'react';

export default function ImagesToZip() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setFiles(f => [...f, ...Array.from(e.target.files)]);
  const remove = (i) => setFiles(f => f.filter((_, idx) => idx !== i));

  const createZip = async () => {
    setLoading(true);
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      const folder = zip.folder('images');
      for (const file of files) folder.file(file.name, file);
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = 'images.zip'; a.click();
    } catch { alert('Failed to create ZIP.'); }
    finally { setLoading(false); }
  };

  const previews = files.map(f => URL.createObjectURL(f));

  return (
    <div className="space-y-5">
      <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('images-zip-input').click()}>
        <p className="text-3xl mb-2">📦</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload images to bundle</p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — Max 25MB each</p>
        <input id="images-zip-input" type="file" accept="image/*" multiple className="hidden" onChange={handle} />
      </div>
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {previews.map((url, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 dark:bg-slate-800">
                <img src={url} alt={files[i].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => remove(i)} className="text-white text-xl font-bold">×</button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-1 py-0.5 truncate">{files[i].name}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">{files.length} images — {(files.reduce((a, f) => a + f.size, 0) / 1024 / 1024).toFixed(2)}MB total</p>
          <button onClick={createZip} disabled={loading} className="btn-gold w-full py-3">
            {loading ? 'Creating ZIP…' : `📦 Download ZIP (${files.length} images)`}
          </button>
        </div>
      )}
    </div>
  );
}
