import { useState } from 'react';
import { Copy, Check, Hash, RefreshCw } from 'lucide-react';

const hashtagSets: Record<string, string[]> = {
  business: ['entrepreneur', 'business', 'success', 'motivation', 'startup', 'marketing', 'branding', 'growth', 'leadership', 'mindset', 'goals', 'hustle', 'smallbusiness', 'businessowner', 'ceo'],
  fitness: ['fitness', 'gym', 'workout', 'fitnessmotivation', 'fit', 'training', 'health', 'bodybuilding', 'muscle', 'exercise', 'healthy', 'lifestyle', 'fitfam', 'gains', 'strong'],
  food: ['food', 'foodie', 'foodporn', 'instafood', 'yummy', 'delicious', 'foodstagram', 'homemade', 'cooking', 'recipe', 'chef', 'foodlover', 'tasty', 'dinner', 'lunch'],
  travel: ['travel', 'wanderlust', 'adventure', 'explore', 'vacation', 'travelphotography', 'travelgram', 'instatravel', 'nature', 'photography', 'trip', 'traveling', 'tourist', 'holiday', 'world'],
  fashion: ['fashion', 'style', 'ootd', 'fashionista', 'outfit', 'fashionblogger', 'streetstyle', 'instafashion', 'trendy', 'shopping', 'dress', 'clothes', 'fashionstyle', 'model', 'beauty'],
  tech: ['technology', 'tech', 'innovation', 'coding', 'programming', 'developer', 'software', 'ai', 'machinelearning', 'startup', 'digital', 'data', 'computer', 'future', 'science'],
  photography: ['photography', 'photo', 'photooftheday', 'photographer', 'nature', 'art', 'instagood', 'picoftheday', 'portrait', 'landscape', 'camera', 'photoshoot', 'canon', 'nikon', 'naturephotography'],
};

const HashtagGenerator = () => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('business');
  const [count, setCount] = useState(15);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let baseHashtags = hashtagSets[category] || [];
    
    // Add custom topic-based hashtags
    if (topic) {
      const topicWords = topic.toLowerCase().split(/\s+/);
      const customTags = topicWords.map(w => w.replace(/[^a-z0-9]/g, ''));
      baseHashtags = [...customTags, ...baseHashtags];
    }
    
    // Shuffle and select
    const shuffled = [...baseHashtags].sort(() => Math.random() - 0.5);
    setHashtags(shuffled.slice(0, count).map(h => `#${h}`));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Topic or Keywords (optional)
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., summer vacation, new product launch"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(hashtagSets).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl capitalize font-medium transition-all ${
                category === cat
                  ? 'bg-[#1e3a5f] text-white dark:bg-[#d4a843] dark:text-[#1e3a5f]'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Hashtags
          </label>
          <span className="text-sm font-bold text-[#1e3a5f] dark:text-[#d4a843]">{count}</span>
        </div>
        <input
          type="range"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          min={5}
          max={30}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1e3a5f] dark:accent-[#d4a843]"
        />
      </div>

      <button
        onClick={generate}
        className="w-full py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <Hash className="w-5 h-5" />
        Generate Hashtags
      </button>

      {hashtags.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Generated Hashtags
            </label>
            <div className="flex gap-2">
              <button
                onClick={generate}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 text-[#1e3a5f] dark:text-[#d4a843] rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HashtagGenerator;
