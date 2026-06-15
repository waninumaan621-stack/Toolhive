import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { downloadFile } from '../../utils/fileUtils';

// Text Reverser
export const TextReverser = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chars' | 'words' | 'lines'>('chars');
  const [copied, setCopied] = useState(false);

  const reverse = () => {
    switch (mode) {
      case 'chars': return input.split('').reverse().join('');
      case 'words': return input.split(' ').reverse().join(' ');
      case 'lines': return input.split('\n').reverse().join('\n');
      default: return input;
    }
  };

  const output = reverse();

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to reverse..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      <div className="flex gap-2">
        {(['chars', 'words', 'lines'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg capitalize ${mode === m ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
          >
            {m}
          </button>
        ))}
      </div>
      {input && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Result</label>
            <button onClick={copy} className="flex items-center gap-1 text-sm text-gray-500">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white whitespace-pre-wrap break-all">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

// Remove Duplicate Lines
export const RemoveDuplicates = () => {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [copied, setCopied] = useState(false);

  const removeDuplicates = () => {
    const lines = input.split('\n');
    const seen = new Set<string>();
    return lines.filter(line => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).join('\n');
  };

  const output = removeDuplicates();
  const removedCount = input.split('\n').length - output.split('\n').length;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input (one item per line)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text with duplicate lines..."
          className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" />
        <span className="text-gray-700 dark:text-gray-300">Case sensitive</span>
      </label>
      {input && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Result ({removedCount} duplicates removed)
            </label>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-40 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white resize-none"
          />
        </div>
      )}
    </div>
  );
};

// Find and Replace
export const FindReplace = () => {
  const [input, setInput] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [copied, setCopied] = useState(false);

  const doReplace = () => {
    if (!find) return input;
    try {
      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(find, flags);
        return input.replace(regex, replace);
      } else {
        if (caseSensitive) {
          return input.split(find).join(replace);
        } else {
          const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          return input.replace(regex, replace);
        }
      }
    } catch {
      return input;
    }
  };

  const output = doReplace();
  const matchCount = input && find ? (input.match(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), caseSensitive ? 'g' : 'gi')) || []).length : 0;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your text..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Find</label>
          <input
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder="Text to find..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Replace with</label>
          <input
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            placeholder="Replacement text..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" />
          <span className="text-gray-700 dark:text-gray-300 text-sm">Case sensitive</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="rounded" />
          <span className="text-gray-700 dark:text-gray-300 text-sm">Use Regex</span>
        </label>
      </div>
      {find && <p className="text-sm text-gray-500">{matchCount} matches found</p>}
      {input && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Result</label>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white resize-none"
          />
        </div>
      )}
    </div>
  );
};

// Text Diff
export const TextDiff = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const getDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    const diff: { line: number; status: 'same' | 'added' | 'removed' | 'changed'; text1: string; text2: string }[] = [];

    for (let i = 0; i < maxLines; i++) {
      const l1 = lines1[i] ?? '';
      const l2 = lines2[i] ?? '';
      if (l1 === l2) {
        diff.push({ line: i + 1, status: 'same', text1: l1, text2: l2 });
      } else if (!l1 && l2) {
        diff.push({ line: i + 1, status: 'added', text1: '', text2: l2 });
      } else if (l1 && !l2) {
        diff.push({ line: i + 1, status: 'removed', text1: l1, text2: '' });
      } else {
        diff.push({ line: i + 1, status: 'changed', text1: l1, text2: l2 });
      }
    }
    return diff;
  };

  const diff = getDiff();
  const changes = diff.filter(d => d.status !== 'same').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Text</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter original text..."
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modified Text</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter modified text..."
            className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm"
          />
        </div>
      </div>
      {(text1 || text2) && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Comparison ({changes} difference{changes !== 1 ? 's' : ''})
          </h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 max-h-64 overflow-auto font-mono text-sm">
            {diff.map((d, i) => (
              <div key={i} className={`py-1 px-2 rounded ${
                d.status === 'same' ? '' :
                d.status === 'added' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                d.status === 'removed' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
              }`}>
                <span className="text-gray-400 mr-2">{d.line}</span>
                {d.status === 'changed' ? (
                  <><del className="text-red-500">{d.text1}</del> → <ins className="text-green-500">{d.text2}</ins></>
                ) : d.status === 'added' ? (
                  <span>+ {d.text2}</span>
                ) : d.status === 'removed' ? (
                  <span>- {d.text1}</span>
                ) : (
                  <span>{d.text1}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Fancy Text Generator
export const FancyText = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

  const styles: { name: string; fn: (s: string) => string }[] = [
    { name: '𝔉𝔯𝔞𝔨𝔱𝔲𝔯', fn: (s) => s.split('').map(c => '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(c)] || c).join('') },
    { name: '𝕆𝕦𝕥𝕝𝕚𝕟𝕖', fn: (s) => s.split('').map(c => '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(c)] || c).join('') },
    { name: '𝐁𝐨𝐥𝐝', fn: (s) => s.split('').map(c => '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(c)] || c).join('') },
    { name: '𝑰𝒕𝒂𝒍𝒊𝒄', fn: (s) => s.split('').map(c => '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(c)] || c).join('') },
    { name: 'ⒸⒾⓇⒸⓁⒺⒹ', fn: (s) => s.split('').map(c => 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(c)] || c).join('') },
    { name: 'S̷t̷r̷i̷k̷e̷', fn: (s) => s.split('').map(c => c + '\u0337').join('') },
    { name: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲', fn: (s) => s.split('').map(c => c + '\u0332').join('') },
    { name: 'ʇxǝʇ dılℲ', fn: (s) => s.split('').map(c => 'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z'['abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c)] || c).reverse().join('') },
    { name: 'ᴛɪɴʏ', fn: (s) => s.toLowerCase().split('').map(c => 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ'['abcdefghijklmnopqrstuvwxyz'.indexOf(c)] || c).join('') },
    { name: 'W I D E', fn: (s) => s.split('').join(' ') },
  ];

  const copy = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter Text</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something cool..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
        />
      </div>
      {input && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {styles.map((style) => {
            const result = style.fn(input);
            return (
              <div key={style.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <span className="text-gray-900 dark:text-white truncate flex-1">{result}</span>
                <button onClick={() => copy(result, style.name)} className="ml-2 p-1">
                  {copied === style.name ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Reading Time Calculator
export const ReadingTime = () => {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readingTime = Math.ceil(words / 200);
  const speakingTime = Math.ceil(words / 150);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Paste your content</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste article, blog post, or any text..."
          className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Words', value: words.toLocaleString() },
          { label: 'Characters', value: text.length.toLocaleString() },
          { label: 'Reading Time', value: `${readingTime} min` },
          { label: 'Speaking Time', value: `${speakingTime} min` },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#1e3a5f] dark:text-[#d4a843]">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Keyword Density Analyzer
export const KeywordDensity = () => {
  const [text, setText] = useState('');

  const analyze = () => {
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
    const total = words.length;
    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq)
      .map(([word, count]) => ({ word, count, density: ((count / total) * 100).toFixed(2) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  };

  const keywords = text ? analyze() : [];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter text to analyze</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your content for keyword analysis..."
          className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      {keywords.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Top 20 Keywords</h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-2">Keyword</th>
                  <th className="pb-2">Count</th>
                  <th className="pb-2">Density</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((k, i) => (
                  <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-2 text-gray-900 dark:text-white">{k.word}</td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{k.count}</td>
                    <td className="py-2 text-[#1e3a5f] dark:text-[#d4a843]">{k.density}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Text to Speech
export const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useState(() => {
    const loadVoices = () => setVoices(speechSynthesis.getVoices());
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  });

  const speak = () => {
    if (!text) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text to speak</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Voice</label>
          <select
            onChange={(e) => setVoice(voices.find(v => v.name === e.target.value) || null)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {voices.map((v, i) => <option key={i} value={v.name}>{v.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Speed: {rate}x</label>
          <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pitch: {pitch}</label>
          <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={speaking ? stop : speak}
          disabled={!text}
          className={`flex-1 py-3 rounded-xl font-semibold ${speaking ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white'} disabled:opacity-50`}
        >
          {speaking ? '⏹ Stop' : '▶ Speak'}
        </button>
      </div>
    </div>
  );
};

// Markdown to HTML
export const MarkdownToHtml = () => {
  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToHtml = (md: string): string => {
    return md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/\n/gim, '<br />');
  };

  const html = convertToHtml(markdown);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Markdown</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="# Heading\n**Bold** and *italic*\n[Link](url)"
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm"
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">HTML Output</label>
            <button onClick={() => { navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <textarea
            value={html}
            readOnly
            className="w-full h-64 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white resize-none font-mono text-sm"
          />
        </div>
      </div>
      {markdown && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</label>
          <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </div>
  );
};

// Duplicate Word Remover
export const DuplicateWordRemover = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const removeConsecutiveDuplicates = (text: string): string => {
    return text.split(' ').filter((word, i, arr) => word.toLowerCase() !== arr[i - 1]?.toLowerCase()).join(' ');
  };

  const output = removeConsecutiveDuplicates(input);
  const wordsRemoved = input.split(' ').length - output.split(' ').length;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text with duplicate duplicate words..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      {input && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Result ({wordsRemoved} duplicate{wordsRemoved !== 1 ? 's' : ''} removed)
            </label>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

// Text Repeater
export const TextRepeater = () => {
  const [text, setText] = useState('');
  const [count, setCount] = useState(5);
  const [separator, setSeparator] = useState('newline');
  const [copied, setCopied] = useState(false);

  const separators: Record<string, string> = {
    newline: '\n',
    space: ' ',
    comma: ', ',
    none: ''
  };

  const output = Array(count).fill(text).join(separators[separator]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text to repeat</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Repeat count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
            min={1}
            max={1000}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Separator</label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="newline">New Line</option>
            <option value="space">Space</option>
            <option value="comma">Comma</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      {text && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Result</label>
            <div className="flex gap-2">
              <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
              <button onClick={() => downloadFile(output, 'repeated-text.txt')}>
                <Download className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-40 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white resize-none"
          />
        </div>
      )}
    </div>
  );
};
