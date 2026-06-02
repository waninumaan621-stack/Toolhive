import { useState } from 'react';

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState([]);
  const [unique, setUnique] = useState(false);

  const generate = () => {
    const nums = [];
    const range = max - min + 1;
    if (unique && count > range) {
      alert(`Cannot generate ${count} unique numbers in range ${min}-${max}`);
      return;
    }
    while (nums.length < count) {
      const n = Math.floor(Math.random() * range) + min;
      if (!unique || !nums.includes(n)) nums.push(n);
    }
    setResults(nums);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <div><label className="label">Min</label><input className="input-field" type="number" value={min} onChange={e => setMin(+e.target.value)} /></div>
        <div><label className="label">Max</label><input className="input-field" type="number" value={max} onChange={e => setMax(+e.target.value)} /></div>
        <div><label className="label">Count</label><input className="input-field" type="number" min="1" max="100" value={count} onChange={e => setCount(+e.target.value)} /></div>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
        <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} className="accent-amber-500" />
        No duplicates
      </label>
      <button onClick={generate} className="btn-gold px-6 py-2.5">🎰 Generate</button>
      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {results.map((n, i) => (
              <div key={i} className="w-14 h-14 bg-amber-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">{n}</div>
            ))}
          </div>
          {results.length > 1 && (
            <p className="text-xs text-gray-400">
              Sum: {results.reduce((a,b) => a+b, 0)} | Average: {(results.reduce((a,b) => a+b, 0)/results.length).toFixed(2)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
