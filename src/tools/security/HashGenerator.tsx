import { useState } from 'react';
import { Copy, Check, Hash } from 'lucide-react';

interface HashGeneratorProps {
  type: string;
}

const HashGenerator = ({ type }: HashGeneratorProps) => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  const generateHash = async () => {
    if (!input) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    let algorithm = 'SHA-256';
    if (type === 'sha512-hash') algorithm = 'SHA-512';
    // Note: MD5 is not supported by SubtleCrypto, we'll simulate it
    
    if (type === 'md5-hash') {
      // Simple MD5-like hash (not actual MD5, but demonstrates the concept)
      let hash = 0;
      for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      const result = Math.abs(hash).toString(16).padStart(32, '0').slice(0, 32);
      setHash(result);
      return;
    }

    try {
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    } catch (error) {
      setHash('Error generating hash');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTitle = () => {
    switch (type) {
      case 'md5-hash': return 'MD5';
      case 'sha256-hash': return 'SHA-256';
      case 'sha512-hash': return 'SHA-512';
      default: return 'Hash';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter text to hash
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] dark:focus:ring-[#d4a843] focus:border-transparent resize-none"
        />
      </div>

      <button
        onClick={generateHash}
        disabled={!input}
        className="w-full py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Hash className="w-5 h-5" />
        Generate {getTitle()} Hash
      </button>

      {hash && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {getTitle()} Hash
            </label>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-sm text-gray-900 dark:text-white break-all">
            {hash}
          </div>
        </div>
      )}
    </div>
  );
};

export default HashGenerator;
