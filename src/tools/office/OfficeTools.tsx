import { useState, useEffect } from 'react';
import { Copy, Check, Play, Pause, RotateCcw, Dices } from 'lucide-react';

// Timestamp Converter
export const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateString, setDateString] = useState('');
  const [copied, setCopied] = useState('');

  const timestampToDate = (ts: string) => {
    const num = parseInt(ts);
    if (isNaN(num)) return '';
    const date = new Date(num * (ts.length > 10 ? 1 : 1000));
    return date.toISOString();
  };

  const dateToTimestamp = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return Math.floor(d.getTime() / 1000).toString();
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unix Timestamp</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="1234567890"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
          />
          <button onClick={() => copy(timestamp, 'ts')} className="px-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            {copied === 'ts' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        {timestamp && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            → {timestampToDate(timestamp) || 'Invalid timestamp'}
          </p>
        )}
      </div>
      <div className="text-center text-gray-400">or</div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date/Time</label>
        <input
          type="datetime-local"
          value={dateString}
          onChange={(e) => setDateString(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {dateString && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            → Timestamp: {dateToTimestamp(dateString) || 'Invalid date'}
          </p>
        )}
      </div>
      <button
        onClick={() => setTimestamp(Math.floor(Date.now() / 1000).toString())}
        className="w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold"
      >
        Get Current Timestamp
      </button>
    </div>
  );
};

// Date Calculator
export const DateCalculator = () => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [addDays, setAddDays] = useState('');
  const [baseDate, setBaseDate] = useState('');

  const calculateDiff = () => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);
    return { days: diffDays, weeks: diffWeeks, months: diffMonths, years: diffYears };
  };

  const calculateAddDays = () => {
    if (!baseDate || !addDays) return '';
    const date = new Date(baseDate);
    date.setDate(date.getDate() + parseInt(addDays));
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const diff = calculateDiff();
  const newDate = calculateAddDays();

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Calculate difference between dates</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">End Date</label>
            <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
          </div>
        </div>
        {diff && (
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-xl font-bold text-[#1e3a5f] dark:text-[#d4a843]">{diff.years}</div>
              <div className="text-xs text-gray-500">Years</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-xl font-bold text-[#1e3a5f] dark:text-[#d4a843]">{diff.months}</div>
              <div className="text-xs text-gray-500">Months</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-xl font-bold text-[#1e3a5f] dark:text-[#d4a843]">{diff.weeks}</div>
              <div className="text-xs text-gray-500">Weeks</div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-xl font-bold text-[#1e3a5f] dark:text-[#d4a843]">{diff.days}</div>
              <div className="text-xs text-gray-500">Days</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Add/Subtract days from date</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Base Date</label>
            <input type="date" value={baseDate} onChange={(e) => setBaseDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Days to add (negative to subtract)</label>
            <input type="number" value={addDays} onChange={(e) => setAddDays(e.target.value)} placeholder="30" className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
          </div>
        </div>
        {newDate && (
          <p className="mt-4 text-center text-lg font-semibold text-[#1e3a5f] dark:text-[#d4a843]">{newDate}</p>
        )}
      </div>
    </div>
  );
};

// Number to Words
export const NumberToWords = () => {
  const [number, setNumber] = useState('');

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  const convert = (num: number): string => {
    if (num === 0) return 'zero';
    if (num < 0) return 'negative ' + convert(-num);
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? '-' + ones[num % 10] : '');
    if (num < 1000) return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 ? ' and ' + convert(num % 100) : '');
    if (num < 1000000) return convert(Math.floor(num / 1000)) + ' thousand' + (num % 1000 ? ' ' + convert(num % 1000) : '');
    if (num < 1000000000) return convert(Math.floor(num / 1000000)) + ' million' + (num % 1000000 ? ' ' + convert(num % 1000000) : '');
    return convert(Math.floor(num / 1000000000)) + ' billion' + (num % 1000000000 ? ' ' + convert(num % 1000000000) : '');
  };

  const result = number ? convert(parseInt(number)) : '';

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter Number</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="12345"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-2xl font-mono"
        />
      </div>
      {result && (
        <div className="p-6 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 rounded-xl">
          <p className="text-xl text-gray-900 dark:text-white capitalize">{result}</p>
        </div>
      )}
    </div>
  );
};

// Morse Code Translator
export const MorseCode = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const morseMap: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', ' ': '/'
  };

  const reverseMorse = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));

  const encode = (text: string) => text.toUpperCase().split('').map(c => morseMap[c] || c).join(' ');
  const decode = (morse: string) => morse.split(' ').map(c => reverseMorse[c] || c).join('');

  const output = mode === 'encode' ? encode(input) : decode(input);

  return (
    <div className="space-y-6">
      <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
        {(['encode', 'decode'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium capitalize ${mode === m ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
          >
            {m === 'encode' ? 'Text → Morse' : 'Morse → Text'}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {mode === 'encode' ? 'Text' : 'Morse Code (space separated)'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text...' : '.... . .-.. .-.. ---'}
          className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      {input && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Result</label>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl font-mono text-lg text-gray-900 dark:text-white">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

// Pomodoro Timer
export const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsRunning(false);
          if (mode === 'work') {
            setMode('break');
            setMinutes(5);
          } else {
            setMode('work');
            setMinutes(25);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, mode]);

  const reset = () => {
    setIsRunning(false);
    setMinutes(mode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className="space-y-6 text-center">
      <div className={`p-8 rounded-3xl ${mode === 'work' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{mode === 'work' ? '🍅 Work Session' : '☕ Break Time'}</p>
        <div className="text-7xl font-bold text-gray-900 dark:text-white font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 ${isRunning ? 'bg-yellow-500 text-white' : 'bg-[#1e3a5f] text-white'}`}
        >
          {isRunning ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
        </button>
        <button onClick={reset} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-semibold flex items-center gap-2">
          <RotateCcw className="w-5 h-5" /> Reset
        </button>
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => { setMode('work'); setMinutes(25); setSeconds(0); setIsRunning(false); }}
          className={`px-4 py-2 rounded-lg text-sm ${mode === 'work' ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          Work (25m)
        </button>
        <button
          onClick={() => { setMode('break'); setMinutes(5); setSeconds(0); setIsRunning(false); }}
          className={`px-4 py-2 rounded-lg text-sm ${mode === 'break' ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
        >
          Short Break (5m)
        </button>
      </div>
    </div>
  );
};

// Coin Flip & Dice
export const CoinFlipDice = () => {
  const [coinResult, setCoinResult] = useState<'heads' | 'tails' | null>(null);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [diceCount, setDiceCount] = useState(1);
  const [flipping, setFlipping] = useState(false);
  const [rolling, setRolling] = useState(false);

  const flipCoin = () => {
    setFlipping(true);
    setTimeout(() => {
      setCoinResult(Math.random() < 0.5 ? 'heads' : 'tails');
      setFlipping(false);
    }, 500);
  };

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      setDiceResults(Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1));
      setRolling(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🪙 Coin Flip</h3>
        <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl ${flipping ? 'animate-spin' : ''} ${coinResult === 'heads' ? 'bg-yellow-400' : coinResult === 'tails' ? 'bg-gray-400' : 'bg-gray-200 dark:bg-gray-700'}`}>
          {coinResult ? (coinResult === 'heads' ? '👑' : '🦅') : '?'}
        </div>
        <p className="text-lg font-bold text-gray-900 dark:text-white mb-4 capitalize">{coinResult || 'Click to flip'}</p>
        <button onClick={flipCoin} disabled={flipping} className="px-6 py-2 bg-[#1e3a5f] text-white rounded-xl font-semibold disabled:opacity-50">
          Flip Coin
        </button>
      </div>

      <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🎲 Dice Roll</h3>
        <div className="mb-4">
          <label className="text-sm text-gray-600 dark:text-gray-400">Number of dice: {diceCount}</label>
          <input type="range" min={1} max={6} value={diceCount} onChange={(e) => setDiceCount(parseInt(e.target.value))} className="w-full" />
        </div>
        <div className="flex justify-center gap-2 mb-4">
          {diceResults.length > 0 ? diceResults.map((d, i) => (
            <div key={i} className={`w-16 h-16 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-3xl font-bold shadow ${rolling ? 'animate-bounce' : ''}`}>
              {['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][d - 1]}
            </div>
          )) : (
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl">?</div>
          )}
        </div>
        {diceResults.length > 1 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Total: {diceResults.reduce((a, b) => a + b, 0)}</p>
        )}
        <button onClick={rollDice} disabled={rolling} className="px-6 py-2 bg-[#1e3a5f] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center gap-2 mx-auto">
          <Dices className="w-5 h-5" /> Roll Dice
        </button>
      </div>
    </div>
  );
};

// Typing Speed Test
export const TypingSpeedTest = () => {
  const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!",
    "The five boxing wizards jump quickly."
  ];
  const [targetText, setTargetText] = useState(texts[0]);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!started && value.length === 1) {
      setStartTime(Date.now());
      setStarted(true);
    }
    setInput(value);
    if (value === targetText) {
      setEndTime(Date.now());
    }
  };

  const reset = () => {
    setTargetText(texts[Math.floor(Math.random() * texts.length)]);
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setStarted(false);
  };

  const getStats = () => {
    if (!startTime || !endTime) return null;
    const timeInMinutes = (endTime - startTime) / 60000;
    const words = targetText.split(' ').length;
    const wpm = Math.round(words / timeInMinutes);
    const chars = targetText.length;
    const cpm = Math.round(chars / timeInMinutes);
    return { wpm, cpm, time: ((endTime - startTime) / 1000).toFixed(1) };
  };

  const stats = getStats();
  const correctChars = input.split('').filter((c, i) => c === targetText[i]).length;
  const accuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <p className="text-lg leading-relaxed">
          {targetText.split('').map((char, i) => (
            <span
              key={i}
              className={
                i < input.length
                  ? input[i] === char
                    ? 'text-green-500'
                    : 'text-red-500 bg-red-100 dark:bg-red-900/30'
                  : 'text-gray-500'
              }
            >
              {char}
            </span>
          ))}
        </p>
      </div>
      <textarea
        value={input}
        onChange={handleInput}
        disabled={!!endTime}
        placeholder="Start typing..."
        className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none text-lg"
      />
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Accuracy: <span className={accuracy >= 95 ? 'text-green-500' : accuracy >= 80 ? 'text-yellow-500' : 'text-red-500'}>{accuracy}%</span>
        </div>
        <button onClick={reset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> New Text
        </button>
      </div>
      {stats && (
        <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.wpm}</div>
            <div className="text-sm text-gray-600">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.cpm}</div>
            <div className="text-sm text-gray-600">CPM</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.time}s</div>
            <div className="text-sm text-gray-600">Time</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Loan Calculator
export const LoanCalculator = () => {
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('30');

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (!p || !r || !n) return null;
    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - p;
    return { monthly: monthly.toFixed(2), total: total.toFixed(2), interest: interest.toFixed(2) };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Term (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#1e3a5f] text-white rounded-xl text-center">
            <p className="text-sm opacity-80">Monthly Payment</p>
            <p className="text-3xl font-bold">${result.monthly}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Payment</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${parseFloat(result.total).toLocaleString()}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest</p>
            <p className="text-2xl font-bold text-red-500">${parseFloat(result.interest).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Percentage Calculator
export const PercentageCalculator = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [mode, setMode] = useState<'whatPercent' | 'percentOf' | 'increase' | 'decrease'>('percentOf');

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    if (isNaN(v1) || isNaN(v2)) return '';
    switch (mode) {
      case 'percentOf': return ((v1 / 100) * v2).toFixed(2);
      case 'whatPercent': return ((v1 / v2) * 100).toFixed(2) + '%';
      case 'increase': return (v2 * (1 + v1 / 100)).toFixed(2);
      case 'decrease': return (v2 * (1 - v1 / 100)).toFixed(2);
      default: return '';
    }
  };

  const labels: Record<string, [string, string]> = {
    percentOf: ['Percentage', 'of value'],
    whatPercent: ['Value', 'is what % of'],
    increase: ['Increase by %', 'Value'],
    decrease: ['Decrease by %', 'Value'],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries({
          percentOf: '% of X',
          whatPercent: 'X is % of Y',
          increase: 'Increase',
          decrease: 'Decrease'
        }).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setMode(key as typeof mode)}
            className={`px-3 py-2 rounded-lg text-sm ${mode === key ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{labels[mode][0]}</label>
          <input
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <span className="text-gray-400">{labels[mode][1]}</span>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Value</label>
          <input
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      {value1 && value2 && (
        <div className="p-6 bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 rounded-xl text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Result</p>
          <p className="text-4xl font-bold text-[#1e3a5f] dark:text-[#d4a843]">{calculate()}</p>
        </div>
      )}
    </div>
  );
};
