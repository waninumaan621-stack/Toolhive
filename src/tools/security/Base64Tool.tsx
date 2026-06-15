import { useState } from 'react';
import { Copy, Check, ArrowUpDown } from 'lucide-react';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e) {
      setError('Invalid input for ' + (mode === 'decode' ? 'decoding' : 'encoding'));
      setOutput('');
    }
  };

  const swap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
        <button
          onClick={() => setMode('encode')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'encode'
              ? 'bg-white dark:bg-gray-700 text-[#1e3a5f] dark:text-[#d4a843] shadow'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'decode'
              ? 'bg-white dark:bg-gray-700 text-[#1e3a5f] dark:text-[#d4a843] shadow'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Decode
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] dark:focus:ring-[#d4a843] focus:border-transparent resize-none font-mono"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={process}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all"
        >
          {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
        </button>
        <button
          onClick={swap}
          disabled={!output}
          className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors disabled:opacity-50"
          title="Swap input and output"
        >
          <ArrowUpDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Result
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
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

export default Base64Tool;
