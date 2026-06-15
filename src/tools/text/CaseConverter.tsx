import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CaseConverter = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState('');

  const conversions = [
    { name: 'UPPERCASE', fn: (t: string) => t.toUpperCase() },
    { name: 'lowercase', fn: (t: string) => t.toLowerCase() },
    { name: 'Title Case', fn: (t: string) => t.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) },
    { name: 'Sentence case', fn: (t: string) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()) },
    { name: 'aLtErNaTiNg CaSe', fn: (t: string) => t.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('') },
    { name: 'InVeRsE cAsE', fn: (t: string) => t.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
  ];

  const copyToClipboard = (result: string, name: string) => {
    navigator.clipboard.writeText(result);
    setCopied(name);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text to convert..."
          className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] dark:focus:ring-[#d4a843] focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conversions.map((conv) => {
          const result = conv.fn(text);
          return (
            <div
              key={conv.name}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {conv.name}
                </span>
                <button
                  onClick={() => copyToClipboard(result, conv.name)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  disabled={!text}
                >
                  {copied === conv.name ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="text-gray-900 dark:text-white break-words min-h-[2rem]">
                {result || <span className="text-gray-400">Result will appear here</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseConverter;
