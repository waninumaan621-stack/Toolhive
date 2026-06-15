import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { Tool } from '../types';

interface GenericToolProps {
  tool: Tool;
}

const GenericTool = ({ tool }: GenericToolProps) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const processInput = () => {
    // Generic processing based on tool type
    let result = input;
    
    // Text transformations
    if (tool.id.includes('reverse')) {
      result = input.split('').reverse().join('');
    } else if (tool.id.includes('uppercase') || tool.id === 'case-converter') {
      result = input.toUpperCase();
    } else if (tool.id.includes('lowercase')) {
      result = input.toLowerCase();
    } else if (tool.id.includes('remove-duplicates')) {
      result = [...new Set(input.split('\n'))].join('\n');
    } else if (tool.id.includes('line-counter')) {
      const lines = input.split('\n').length;
      const words = input.trim().split(/\s+/).filter(Boolean).length;
      const chars = input.length;
      result = `Lines: ${lines}\nWords: ${words}\nCharacters: ${chars}`;
    } else if (tool.id.includes('slug')) {
      result = input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    } else if (tool.id.includes('sort')) {
      result = input.split('\n').sort().join('\n');
    } else if (tool.id.includes('shuffle') || tool.id.includes('randomize')) {
      const arr = input.split('\n');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      result = arr.join('\n');
    } else if (tool.id.includes('repeat')) {
      result = (input + '\n').repeat(5).trim();
    } else if (tool.id.includes('vowel')) {
      const vowels = (input.match(/[aeiouAEIOU]/g) || []).length;
      result = `Vowel count: ${vowels}`;
    } else if (tool.id.includes('sentence')) {
      const sentences = input.split(/[.!?]+/).filter(Boolean).length;
      result = `Sentence count: ${sentences}`;
    } else {
      result = `Tool "${tool.name}" is ready to use!\n\nYour input:\n${input}`;
    }
    
    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResult = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.id}-result.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] dark:focus:ring-[#d4a843] focus:border-transparent resize-none"
        />
      </div>

      <button
        onClick={processInput}
        className="w-full py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all"
      >
        Process
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={downloadResult}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <div className="w-full min-h-[100px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white whitespace-pre-wrap font-mono text-sm">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericTool;
