import { useState, useEffect, useRef } from 'react';

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return <button onClick={copy} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>{copied ? '✓ Copied' : '📋 Copy'}</button>;
};

// ── Word Counter ──────────────────────────────────────────────────────────
export function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="space-y-5">
      <textarea className="input-field h-48 resize-none" placeholder="Paste or type your text here…" value={text} onChange={e => setText(e.target.value)} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[['Words', words],['Characters', chars],['Chars (no spaces)', charsNoSpace],['Sentences', sentences],['Paragraphs', paragraphs],['Read Time', readTime + ' min']].map(([l, v]) => (
          <div key={l} className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">{l}</p>
            <p className="font-display font-bold text-xl text-navy-900 dark:text-white">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Case Converter ────────────────────────────────────────────────────────
export function CaseConverter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const convert = (type) => {
    if (!text) return;
    if (type === 'upper') setResult(text.toUpperCase());
    else if (type === 'lower') setResult(text.toLowerCase());
    else if (type === 'title') setResult(text.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()));
    else if (type === 'sentence') setResult(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
    else if (type === 'camel') setResult(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()));
    else if (type === 'snake') setResult(text.toLowerCase().replace(/\s+/g, '_'));
    else if (type === 'kebab') setResult(text.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <div className="space-y-5">
      <textarea className="input-field h-32 resize-none" placeholder="Enter text to convert…" value={text} onChange={e => setText(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        {[['upper','UPPERCASE'],['lower','lowercase'],['title','Title Case'],['sentence','Sentence case'],['camel','camelCase'],['snake','snake_case'],['kebab','kebab-case']].map(([t, l]) => (
          <button key={t} onClick={() => convert(t)} className="btn-ghost text-sm px-4 py-2">{l}</button>
        ))}
      </div>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Result</span><CopyBtn text={result} /></div>
          <textarea className="input-field h-32 resize-none" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// ── Remove Duplicates ─────────────────────────────────────────────────────
export function RemoveDuplicates() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);

  const remove = () => {
    const lines = text.split('\n');
    const seen = new Set();
    const unique = lines.filter(line => {
      const key = ignoreCase ? line.toLowerCase() : line;
      if (seen.has(key)) return false;
      seen.add(key); return true;
    });
    setResult(unique.join('\n'));
  };

  return (
    <div className="space-y-5">
      <textarea className="input-field h-40 resize-none" placeholder="Paste lines here — duplicates will be removed…" value={text} onChange={e => setText(e.target.value)} />
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
          <input type="checkbox" checked={ignoreCase} onChange={e => setIgnoreCase(e.target.checked)} className="accent-gold-500" />
          Ignore case
        </label>
        <button onClick={remove} className="btn-gold px-6 py-2.5">🧹 Remove Duplicates</button>
      </div>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-xs text-gray-400">{result.split('\n').length} unique lines</span><CopyBtn text={result} /></div>
          <textarea className="input-field h-40 resize-none" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// ── Text Reverser ─────────────────────────────────────────────────────────
export function TextReverser() {
  const [text, setText] = useState('');
  const reversed = text.split('').reverse().join('');
  const reversedWords = text.split(' ').reverse().join(' ');
  const reversedLines = text.split('\n').reverse().join('\n');

  return (
    <div className="space-y-5">
      <textarea className="input-field h-32 resize-none" placeholder="Enter text to reverse…" value={text} onChange={e => setText(e.target.value)} />
      {text && (
        <div className="space-y-3">
          {[['Reversed Characters', reversed],['Reversed Words', reversedWords],['Reversed Lines', reversedLines]].map(([label, val]) => (
            <div key={label} className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2"><span className="text-xs text-gray-400 font-medium">{label}</span><CopyBtn text={val} /></div>
              <p className="text-sm text-gray-700 dark:text-gray-300 break-all">{val}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Lorem Ipsum ───────────────────────────────────────────────────────────
export function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');
  const [result, setResult] = useState('');

  const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

  const randomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];
  const randomSentence = () => {
    const len = 8 + Math.floor(Math.random() * 12);
    const words = Array.from({length: len}, randomWord);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };
  const randomParagraph = () => Array.from({length: 4 + Math.floor(Math.random() * 4)}, randomSentence).join(' ');

  const generate = () => {
    if (type === 'words') setResult(Array.from({length: count}, randomWord).join(' '));
    else if (type === 'sentences') setResult(Array.from({length: count}, randomSentence).join(' '));
    else setResult(Array.from({length: count}, randomParagraph).join('\n\n'));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4 items-end">
        <div><label className="label">Count</label><input className="input-field w-24" type="number" min="1" max="50" value={count} onChange={e => setCount(+e.target.value)} /></div>
        <div><label className="label">Type</label>
          <select className="input-field w-36" value={type} onChange={e => setType(e.target.value)}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <button onClick={generate} className="btn-gold px-6 py-2.5">Generate</button>
      </div>
      {result && (
        <div className="space-y-2">
          <div className="flex justify-end"><CopyBtn text={result} /></div>
          <textarea className="input-field h-48 resize-none text-sm" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// ── Fancy Text ────────────────────────────────────────────────────────────
export function FancyText() {
  const [text, setText] = useState('');
  const transforms = {
    '𝗕𝗼𝗹𝗱': t => [...t].map(c => { const code = c.codePointAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(code + 119743); if (code >= 97 && code <= 122) return String.fromCodePoint(code + 119737); return c; }).join(''),
    '𝘐𝘵𝘢𝘭𝘪𝘤': t => [...t].map(c => { const code = c.codePointAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(code + 119795); if (code >= 97 && code <= 122) return String.fromCodePoint(code + 119789); return c; }).join(''),
    'ⓒⓘⓡⓒⓛⓔⓓ': t => [...t].map(c => { const code = c.codePointAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(code + 9398 - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(code + 9424 - 97); return c; }).join(''),
    'Ｆｕｌｌｗｉｄｔｈ': t => [...t].map(c => { const code = c.codePointAt(0); if (code >= 33 && code <= 126) return String.fromCodePoint(code + 65248); return c; }).join(''),
    'S̶t̶r̶i̶k̶e̶': t => [...t].map(c => c + '\u0336').join(''),
    'U͟n͟d͟e͟r͟l͟i͟n͟e͟': t => [...t].map(c => c + '\u0332').join(''),
    'ꜱᴍᴀʟʟ ᴄᴀᴘꜱ': t => t.toLowerCase().replace(/[a-z]/g, c => 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ'[c.charCodeAt(0)-97] || c),
  };

  return (
    <div className="space-y-5">
      <textarea className="input-field h-24 resize-none" placeholder="Enter text to transform…" value={text} onChange={e => setText(e.target.value)} />
      {text && (
        <div className="space-y-2">
          {Object.entries(transforms).map(([style, fn]) => {
            const output = fn(text);
            return (
              <div key={style} className="flex items-center justify-between bg-gray-50 dark:bg-navy-800 rounded-xl px-4 py-3">
                <span className="text-base break-all flex-1 mr-3">{output}</span>
                <CopyBtn text={output} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Find & Replace ────────────────────────────────────────────────────────
export function FindReplace() {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [result, setResult] = useState('');
  const [count, setCount] = useState(0);

  const apply = () => {
    try {
      const pattern = useRegex ? new RegExp(find, 'g') : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      let c = 0;
      const out = text.replace(pattern, (m) => { c++; return replace; });
      setResult(out); setCount(c);
    } catch { alert('Invalid regex pattern.'); }
  };

  return (
    <div className="space-y-5">
      <textarea className="input-field h-32 resize-none" placeholder="Paste your text here…" value={text} onChange={e => setText(e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Find</label><input className="input-field" value={find} onChange={e => setFind(e.target.value)} placeholder="Text to find…" /></div>
        <div><label className="label">Replace with</label><input className="input-field" value={replace} onChange={e => setReplace(e.target.value)} placeholder="Replacement text…" /></div>
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} className="accent-gold-500" />Use Regex</label>
        <button onClick={apply} disabled={!text || !find} className="btn-gold px-6 py-2.5">🔍 Replace All</button>
      </div>
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-xs text-gray-400">{count} replacement(s) made</span><CopyBtn text={result} /></div>
          <textarea className="input-field h-32 resize-none" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// ── Text Diff ─────────────────────────────────────────────────────────────
export function TextDiff() {
  const [a, setA] = useState(''); const [b, setB] = useState('');
  const [diff, setDiff] = useState(null);

  const compare = () => {
    const linesA = a.split('\n'); const linesB = b.split('\n');
    const result = [];
    const maxLen = Math.max(linesA.length, linesB.length);
    for (let i = 0; i < maxLen; i++) {
      const la = linesA[i] ?? null; const lb = linesB[i] ?? null;
      if (la === lb) result.push({ type: 'same', line: la });
      else {
        if (la !== null) result.push({ type: 'removed', line: la });
        if (lb !== null) result.push({ type: 'added', line: lb });
      }
    }
    setDiff(result);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="label">Original Text</label><textarea className="input-field h-40 resize-none text-xs font-mono" value={a} onChange={e => setA(e.target.value)} placeholder="Paste original text…" /></div>
        <div><label className="label">Modified Text</label><textarea className="input-field h-40 resize-none text-xs font-mono" value={b} onChange={e => setB(e.target.value)} placeholder="Paste modified text…" /></div>
      </div>
      <button onClick={compare} disabled={!a || !b} className="btn-gold px-6 py-2.5">🔀 Compare</button>
      {diff && (
        <div className="rounded-xl border border-gray-100 dark:border-navy-700 overflow-hidden">
          {diff.map((item, i) => (
            <div key={i} className={`px-4 py-1.5 text-xs font-mono ${item.type === 'added' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : item.type === 'removed' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
              {item.type === 'added' ? '+ ' : item.type === 'removed' ? '- ' : '  '}{item.line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Reading Time ──────────────────────────────────────────────────────────
export function ReadingTime() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const slow = Math.ceil(words / 150); const avg = Math.ceil(words / 200); const fast = Math.ceil(words / 300);

  return (
    <div className="space-y-5">
      <textarea className="input-field h-40 resize-none" placeholder="Paste your article, blog post, or any text…" value={text} onChange={e => setText(e.target.value)} />
      {words > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[['Slow Reader', slow + ' min', '150 wpm'],['Average', avg + ' min', '200 wpm'],['Fast Reader', fast + ' min', '300 wpm']].map(([l,v,s]) => (
            <div key={l} className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">{l}</p>
              <p className="font-bold text-xl text-navy-900 dark:text-white">{v}</p>
              <p className="text-xs text-gray-400">{s}</p>
            </div>
          ))}
        </div>
      )}
      {words > 0 && <p className="text-sm text-gray-500 text-center">{words.toLocaleString()} words total</p>}
    </div>
  );
}

// ── Keyword Density ───────────────────────────────────────────────────────
export function KeywordDensity() {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);

  const analyze = () => {
    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const freq = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0, 20);
    setResults(sorted.map(([word, count]) => ({ word, count, density: ((count / words.length) * 100).toFixed(2) })));
  };

  return (
    <div className="space-y-5">
      <textarea className="input-field h-40 resize-none" placeholder="Paste your content to analyze keyword density…" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={analyze} disabled={!text} className="btn-gold px-6 py-2.5">📊 Analyze</button>
      {results.length > 0 && (
        <div className="space-y-2">
          {results.map(r => (
            <div key={r.word} className="flex items-center gap-3 bg-gray-50 dark:bg-navy-800 rounded-xl px-4 py-2.5">
              <span className="font-medium text-sm text-navy-900 dark:text-white w-28">{r.word}</span>
              <div className="flex-1 bg-gray-200 dark:bg-navy-700 rounded-full h-2"><div className="bg-gold-500 h-2 rounded-full" style={{ width: Math.min(+r.density * 10, 100) + '%' }} /></div>
              <span className="text-xs text-gray-500 w-20 text-right">{r.count}× ({r.density}%)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Text to Speech ────────────────────────────────────────────────────────
export function TextToSpeech() {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  useEffect(() => {
    const load = () => { const v = speechSynthesis.getVoices(); setVoices(v); if (v.length) setVoice(v[0].name); };
    load(); speechSynthesis.addEventListener('voiceschanged', load);
    return () => speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  const speak = () => {
    if (!text) return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.voice = voices.find(v => v.name === voice) || null;
    utt.rate = rate; utt.pitch = pitch;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    speechSynthesis.speak(utt);
  };

  const stop = () => { speechSynthesis.cancel(); setSpeaking(false); };

  return (
    <div className="space-y-5">
      <textarea className="input-field h-32 resize-none" placeholder="Enter text to speak… (max 5000 chars)" maxLength={5000} value={text} onChange={e => setText(e.target.value)} />
      <p className="text-xs text-gray-400">{text.length}/5000 characters</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="label">Voice</label>
          <select className="input-field" value={voice} onChange={e => setVoice(e.target.value)}>
            {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
          </select>
        </div>
        <div><label className="label">Speed: {rate}x</label><input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} className="w-full accent-gold-500" /></div>
      </div>
      <div className="flex gap-3">
        <button onClick={speak} disabled={!text || speaking} className="btn-gold flex-1 py-3">🔊 {speaking ? 'Speaking…' : 'Speak'}</button>
        {speaking && <button onClick={stop} className="btn-ghost px-5 py-3">⏹ Stop</button>}
      </div>
    </div>
  );
}

// ── Speech to Text ────────────────────────────────────────────────────────
export function SpeechToText() {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');
  const recRef = useRef(null);

  const start = () => {
    setError('');
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser. Try Chrome.');
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recRef.current = new SR();
    recRef.current.continuous = true; recRef.current.interimResults = true;
    recRef.current.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      setText(transcript);
    };
    recRef.current.onerror = (e) => { setError('Error: ' + e.error); setListening(false); };
    recRef.current.onend = () => setListening(false);
    recRef.current.start(); setListening(true);
  };

  const stop = () => { recRef.current?.stop(); setListening(false); };

  return (
    <div className="space-y-5">
      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}
      <div className="flex justify-center">
        <button onClick={listening ? stop : start}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all shadow-lg ${listening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-gold-500 hover:bg-gold-600'}`}>
          🎙️
        </button>
      </div>
      <p className="text-center text-sm text-gray-500">{listening ? 'Listening… click to stop' : 'Click microphone to start'}</p>
      {text && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-xs text-gray-400">Transcribed text</span><CopyBtn text={text} /></div>
          <textarea className="input-field h-40 resize-none" value={text} onChange={e => setText(e.target.value)} />
        </div>
      )}
    </div>
  );
}
