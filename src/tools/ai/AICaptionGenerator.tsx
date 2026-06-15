import { useState } from 'react';
import { Copy, Check, Loader2, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { callGeminiAPI, AI_PROMPTS } from '../../utils/geminiApi';
import AIToolWrapper from './AIToolWrapper';

const AICaptionGenerator = () => {
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const { incrementAIUse, getRemainingAIUses, geminiApiKey } = useStore();

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please describe your image');
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

    const result = await callGeminiAPI(AI_PROMPTS.imageCaption(description), geminiApiKey);
    
    setLoading(false);
    
    if (result.success && result.text) {
      setOutput(result.text);
    } else {
      setError(result.error || 'Failed to generate captions. Please try again.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleDescriptions = [
    "Sunset at the beach with golden waves",
    "Coffee cup on a cozy morning",
    "Group of friends hiking in mountains",
    "Cute puppy playing in the park",
    "Delicious homemade pizza",
  ];

  return (
    <AIToolWrapper>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Describe Your Image
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what's in your image... (e.g., 'A beautiful sunset over the ocean with silhouettes of palm trees')"
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Try an example:
          </label>
          <div className="flex flex-wrap gap-2">
            {exampleDescriptions.map((ex, i) => (
              <button
                key={i}
                onClick={() => setDescription(ex)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !description.trim() || getRemainingAIUses() <= 0}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Captions...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Captions with AI
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
                Generated Captions
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="p-4 bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 border border-pink-200 dark:border-pink-800 rounded-xl text-gray-900 dark:text-white whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}
      </div>
    </AIToolWrapper>
  );
};

export default AICaptionGenerator;
