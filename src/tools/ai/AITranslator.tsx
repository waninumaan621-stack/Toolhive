import { useState } from 'react';
import { Languages, Copy, Check, Loader2, ArrowRightLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { callGeminiAPI, AI_PROMPTS } from '../../utils/geminiApi';
import AIToolWrapper from './AIToolWrapper';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
];

const AITranslator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [targetLang, setTargetLang] = useState('es');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const { incrementAIUse, getRemainingAIUses, geminiApiKey } = useStore();

  const handleTranslate = async () => {
    if (!input.trim()) {
      setError('Please enter some text to translate');
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

    const langName = languages.find(l => l.code === targetLang)?.name || targetLang;
    const result = await callGeminiAPI(AI_PROMPTS.translate(input, langName), geminiApiKey);
    
    setLoading(false);
    
    if (result.success && result.text) {
      setOutput(result.text);
    } else {
      setError(result.error || 'Failed to translate. Please try again.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapTexts = () => {
    if (output) {
      setInput(output);
      setOutput('');
    }
  };

  return (
    <AIToolWrapper>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Source Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Translation
              </label>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
            <div className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white overflow-auto">
              {output || <span className="text-gray-400">Translation will appear here...</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Translate to
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          {output && (
            <button
              onClick={swapTexts}
              className="mt-6 p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
              title="Use translation as source"
            >
              <ArrowRightLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>

        <button
          onClick={handleTranslate}
          disabled={loading || !input.trim() || getRemainingAIUses() <= 0}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <Languages className="w-5 h-5" />
              Translate with AI
            </>
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    </AIToolWrapper>
  );
};

export default AITranslator;
