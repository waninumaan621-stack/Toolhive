import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import CryptoJS from 'crypto-js';

// URL Encode/Decode
export const UrlEncodeDecode = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const process = () => {
    setError('');
    try {
      return mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch {
      setError('Invalid input for decoding');
      return '';
    }
  };

  const output = process();

  return (
    <div className="space-y-6">
      <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
        {(['encode', 'decode'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium capitalize ${mode === m ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter URL or text to encode...' : 'Enter encoded text to decode...'}
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Result</label>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl font-mono text-sm text-gray-900 dark:text-white break-all">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

// Caesar Cipher
export const CaesarCipher = () => {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [copied, setCopied] = useState(false);

  const process = () => {
    const s = mode === 'decrypt' ? -shift : shift;
    return input.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base + s + 26) % 26) + base);
      }
      return char;
    }).join('');
  };

  const output = process();

  return (
    <div className="space-y-6">
      <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
        {(['encrypt', 'decrypt'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium capitalize ${mode === m ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shift: {shift}</label>
        <input
          type="range"
          min={1}
          max={25}
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value))}
          className="w-full"
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
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

// ROT13 Encoder
export const ROT13Encoder = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base + 13) % 26) + base);
    });
  };

  const output = rot13(input);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input (ROT13 is reversible - same function encrypts and decrypts)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode/decode..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
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
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

// Random Number Generator
export const RandomNumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (unique && count > max - min + 1) {
      alert('Cannot generate more unique numbers than the range allows');
      return;
    }
    const result: number[] = [];
    while (result.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!unique || !result.includes(num)) {
        result.push(num);
      }
    }
    setNumbers(result);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            min={1}
            max={100}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="rounded" />
        <span className="text-gray-700 dark:text-gray-300">Unique numbers only</span>
      </label>
      <button
        onClick={generate}
        className="w-full py-3 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-5 h-5" />
        Generate
      </button>
      {numbers.length > 0 && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Result</label>
            <button onClick={() => { navigator.clipboard.writeText(numbers.join(', ')); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {numbers.map((n, i) => (
              <span key={i} className="px-3 py-1 bg-[#1e3a5f] text-white rounded-full">{n}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Password Strength Checker
export const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');

  const checkStrength = () => {
    let score = 0;
    const checks = {
      length8: password.length >= 8,
      length12: password.length >= 12,
      length16: password.length >= 16,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^a-zA-Z0-9]/.test(password),
      noCommon: !['password', '123456', 'qwerty', 'admin'].some(p => password.toLowerCase().includes(p))
    };

    if (checks.length8) score += 1;
    if (checks.length12) score += 1;
    if (checks.length16) score += 1;
    if (checks.lowercase) score += 1;
    if (checks.uppercase) score += 1;
    if (checks.numbers) score += 1;
    if (checks.symbols) score += 2;
    if (checks.noCommon) score += 1;

    let strength = 'Very Weak';
    let color = 'bg-red-500';
    if (score >= 8) { strength = 'Very Strong'; color = 'bg-green-500'; }
    else if (score >= 6) { strength = 'Strong'; color = 'bg-green-400'; }
    else if (score >= 4) { strength = 'Medium'; color = 'bg-yellow-500'; }
    else if (score >= 2) { strength = 'Weak'; color = 'bg-orange-500'; }

    return { score, checks, strength, color, percentage: Math.min(100, (score / 9) * 100) };
  };

  const result = checkStrength();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to check..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
        />
      </div>
      {password && (
        <>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Strength</span>
              <span className={`text-sm font-bold ${result.color.replace('bg-', 'text-')}`}>{result.strength}</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full ${result.color} transition-all`} style={{ width: `${result.percentage}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(result.checks).map(([key, passed]) => (
              <div key={key} className={`flex items-center gap-2 p-2 rounded-lg ${passed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-900'}`}>
                {passed ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 border border-gray-300 rounded" />}
                <span className={`text-sm ${passed ? 'text-green-700 dark:text-green-300' : 'text-gray-500'}`}>
                  {key === 'length8' && '8+ characters'}
                  {key === 'length12' && '12+ characters'}
                  {key === 'length16' && '16+ characters'}
                  {key === 'lowercase' && 'Lowercase letters'}
                  {key === 'uppercase' && 'Uppercase letters'}
                  {key === 'numbers' && 'Numbers'}
                  {key === 'symbols' && 'Special characters'}
                  {key === 'noCommon' && 'No common patterns'}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// HMAC Generator
export const HMACGenerator = () => {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState<'MD5' | 'SHA1' | 'SHA256' | 'SHA512'>('SHA256');
  const [copied, setCopied] = useState(false);

  const generateHMAC = () => {
    if (!message || !key) return '';
    try {
      switch (algorithm) {
        case 'MD5': return CryptoJS.HmacMD5(message, key).toString();
        case 'SHA1': return CryptoJS.HmacSHA1(message, key).toString();
        case 'SHA256': return CryptoJS.HmacSHA256(message, key).toString();
        case 'SHA512': return CryptoJS.HmacSHA512(message, key).toString();
        default: return '';
      }
    } catch {
      return 'Error generating HMAC';
    }
  };

  const output = generateHMAC();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message..."
          className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secret Key</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter secret key..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Algorithm</label>
        <div className="flex gap-2">
          {(['MD5', 'SHA1', 'SHA256', 'SHA512'] as const).map((alg) => (
            <button
              key={alg}
              onClick={() => setAlgorithm(alg)}
              className={`px-4 py-2 rounded-lg ${algorithm === alg ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
            >
              {alg}
            </button>
          ))}
        </div>
      </div>
      {output && (
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">HMAC-{algorithm}</label>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl font-mono text-sm text-gray-900 dark:text-white break-all">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

// JWT Decoder
export const JWTDecoder = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const decode = () => {
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      setError('');
      return { header, payload, signature: parts[2] };
    } catch (e) {
      setError('Invalid JWT token');
      return null;
    }
  };

  const result = decode();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here..."
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Header</label>
            <pre className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm overflow-auto">
              {JSON.stringify(result.header, null, 2)}
            </pre>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Payload</label>
            <pre className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-sm overflow-auto">
              {JSON.stringify(result.payload, null, 2)}
            </pre>
          </div>
          {result.payload.exp && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <p className="text-sm">
                <strong>Expires:</strong> {new Date(result.payload.exp * 1000).toLocaleString()}
                {Date.now() > result.payload.exp * 1000 ? 
                  <span className="ml-2 text-red-500">(Expired)</span> : 
                  <span className="ml-2 text-green-500">(Valid)</span>
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
