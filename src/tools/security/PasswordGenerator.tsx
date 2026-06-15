import { useState } from 'react';
import { Copy, Check, RefreshCw, Shield } from 'lucide-react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Select at least one option');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  const getStrength = () => {
    if (!password || password.includes('Select')) return { text: '', color: '', width: '0%' };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { text: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 4) return { text: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { text: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const strength = getStrength();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <div className="relative">
        <input
          type="text"
          value={password}
          readOnly
          placeholder="Click Generate to create password"
          className="w-full px-4 py-4 pr-24 text-lg font-mono border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            disabled={!password}
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
          </button>
          <button
            onClick={generatePassword}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Strength Indicator */}
      {password && !password.includes('Select') && (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Strength</span>
            <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>{strength.text}</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.color} transition-all duration-300`}
              style={{ width: strength.width }}
            />
          </div>
        </div>
      )}

      {/* Length Slider */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password Length
          </label>
          <span className="text-sm font-bold text-[#1e3a5f] dark:text-[#d4a843]">{length}</span>
        </div>
        <input
          type="range"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          min={4}
          max={64}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#1e3a5f] dark:accent-[#d4a843]"
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(options).map(([key, value]) => (
          <label
            key={key}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl cursor-pointer"
          >
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
            />
            <span className="text-gray-700 dark:text-gray-300 capitalize">{key}</span>
          </label>
        ))}
      </div>

      <button
        onClick={generatePassword}
        className="w-full py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <Shield className="w-5 h-5" />
        Generate Secure Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
