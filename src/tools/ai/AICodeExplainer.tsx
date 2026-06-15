import { useState } from 'react';
import { Code, Copy, Check, Loader2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { callGeminiAPI, AI_PROMPTS } from '../../utils/geminiApi';
import AIToolWrapper from './AIToolWrapper';

const AICodeExplainer = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const { incrementAIUse, getRemainingAIUses, geminiApiKey } = useStore();

  const handleExplain = async () => {
    if (!input.trim()) {
      setError('Please enter some code to explain');
      return;
    }

    if (getRemainingAIUses() <= 0) {
      setError('Daily AI limit reached. Come back tomorrow!');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    const canUse = incrementAIUse();
    if (!canUse) {
      setError('Daily AI limit reached. Come back tomorrow!');
      setLoading(false);
      return;
    }

    const result = await callGeminiAPI(AI_PROMPTS.codeExplain(input), geminiApiKey);
    
    setLoading(false);
    
    if (result.success && result.text) {
      setOutput(result.text);
    } else {
      setError(result.error || 'Failed to explain code. Please try again.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AIToolWrapper>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Code to Explain
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your code here... (JavaScript, Python, Java, C++, etc.)"
            className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-900 text-green-400 font-mono text-sm placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          onClick={handleExplain}
          disabled={loading || !input.trim() || getRemainingAIUses() <= 0}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Code...
            </>
          ) : (
            <>
              <Code className="w-5 h-5" />
              Explain Code with AI
            </>
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Explanation
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-gray-900 dark:text-white whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}
      </div>
    </AIToolWrapper>
  );
};

export default AICodeExplainer;
