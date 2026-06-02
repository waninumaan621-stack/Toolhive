import { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  );
};

// CSV to JSON
export function CsvToJson() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const handle = (file) => {
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: (res) => setResult(JSON.stringify(res.data, null, 2)),
      error: () => setError('Failed to parse CSV file.')
    });
  };
  return (
    <div className="space-y-5">
      <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('csv-input').click()}>
        <p className="text-3xl mb-2">📊</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload CSV file</p>
        <p className="text-xs text-gray-400 mt-1">Max 10MB</p>
        <input id="csv-input" type="file" accept=".csv" className="hidden" onChange={e => e.target.files[0] && handle(e.target.files[0])} />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{JSON.parse(result).length} records</span>
            <div className="flex gap-2">
              <CopyBtn text={result} />
              <button onClick={() => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([result], {type:'application/json'})); a.download='data.json'; a.click(); }} className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-white font-medium">⬇ Download</button>
            </div>
          </div>
          <textarea className="input-field h-64 font-mono text-xs resize-none" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// JSON to CSV
export function JsonToCsv() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const convert = () => {
    setError('');
    try {
      const data = JSON.parse(input);
      const arr = Array.isArray(data) ? data : [data];
      const csv = Papa.unparse(arr);
      setResult(csv);
    } catch { setError('Invalid JSON. Please check your input.'); }
  };
  return (
    <div className="space-y-5">
      <div><label className="label">JSON Input</label>
        <textarea className="input-field h-40 font-mono text-xs resize-none" placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]' value={input} onChange={e => setInput(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button onClick={convert} disabled={!input} className="btn-gold px-6 py-2.5">Convert to CSV</button>
      {result && (
        <div className="space-y-2">
          <div className="flex justify-end gap-2">
            <CopyBtn text={result} />
            <button onClick={() => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([result], {type:'text/csv'})); a.download='data.csv'; a.click(); }} className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-white font-medium">⬇ Download CSV</button>
          </div>
          <textarea className="input-field h-40 font-mono text-xs resize-none" value={result} readOnly />
        </div>
      )}
    </div>
  );
}

// CSV Viewer
export function CsvViewer() {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [search, setSearch] = useState('');
  const handle = (file) => {
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: (res) => { setHeaders(Object.keys(res.data[0] || {})); setRows(res.data); }
    });
  };
  const filtered = rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(search.toLowerCase())));
  return (
    <div className="space-y-5">
      <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('csv-view-input').click()}>
        <p className="text-3xl mb-2">📈</p><p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload CSV to view as table</p>
        <input id="csv-view-input" type="file" accept=".csv" className="hidden" onChange={e => e.target.files[0] && handle(e.target.files[0])} />
      </div>
      {rows.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <input className="input-field max-w-xs" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
            <span className="text-xs text-gray-400">{filtered.length} of {rows.length} rows</span>
          </div>
          <div className="overflow-auto rounded-xl border border-gray-100 dark:border-slate-800 max-h-96">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 dark:bg-slate-800 sticky top-0">
                <tr>{headers.map(h => <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                {filtered.slice(0, 200).map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                    {headers.map(h => <td key={h} className="px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap max-w-xs truncate">{row[h]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Excel Viewer
export function ExcelViewer() {
  const [sheets, setSheets] = useState({});
  const [activeSheet, setActiveSheet] = useState('');
  const handle = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const wb = XLSX.read(e.target.result, { type: 'array' });
      const data = {};
      wb.SheetNames.forEach(name => { data[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 }); });
      setSheets(data); setActiveSheet(wb.SheetNames[0]);
    };
    reader.readAsArrayBuffer(file);
  };
  const rows = sheets[activeSheet] || [];
  const headers = rows[0] || [];
  const body = rows.slice(1);
  return (
    <div className="space-y-5">
      <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('excel-input').click()}>
        <p className="text-3xl mb-2">📗</p><p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Excel XLSX file</p>
        <p className="text-xs text-gray-400 mt-1">Max 10MB</p>
        <input id="excel-input" type="file" accept=".xlsx,.xls" className="hidden" onChange={e => e.target.files[0] && handle(e.target.files[0])} />
      </div>
      {Object.keys(sheets).length > 0 && (
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {Object.keys(sheets).map(s => (
              <button key={s} onClick={() => setActiveSheet(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeSheet === s ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="overflow-auto rounded-xl border border-gray-100 dark:border-slate-800 max-h-96">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 dark:bg-slate-800 sticky top-0">
                <tr>{headers.map((h, i) => <th key={i} className="px-3 py-2 text-left font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                {body.slice(0, 200).map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                    {headers.map((_, j) => <td key={j} className="px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row[j] ?? ''}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">{body.length} rows</p>
        </div>
      )}
    </div>
  );
}

// Timestamp Converter
export function TimestampConverter() {
  const [ts, setTs] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));
  const date = new Date(parseInt(ts) * 1000);
  const isValid = !isNaN(date.getTime());
  const convertDateToTs = () => setTs(Math.floor(new Date(dateInput).getTime() / 1000).toString());
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-3">
          <label className="label">Unix Timestamp → Date</label>
          <input className="input-field font-mono" value={ts} onChange={e => setTs(e.target.value)} placeholder="1609459200" />
          {isValid && (
            <div className="space-y-2">
              {[['Local Time', date.toLocaleString()],['UTC', date.toUTCString()],['ISO 8601', date.toISOString()],['Date Only', date.toLocaleDateString()],['Time Only', date.toLocaleTimeString()]].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-gray-400 w-24">{l}</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200 flex-1 mx-2">{v}</span>
                  <CopyBtn text={v} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <label className="label">Date → Unix Timestamp</label>
          <input type="datetime-local" className="input-field" value={dateInput} onChange={e => setDateInput(e.target.value)} />
          <button onClick={convertDateToTs} className="btn-gold px-5 py-2.5">Convert to Timestamp</button>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">Current Unix Time</p>
            <p className="font-mono text-lg font-bold text-slate-900 dark:text-white">{Math.floor(Date.now() / 1000)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Date Calculator
export function DateCalculator() {
  const [date1, setDate1] = useState(new Date().toISOString().slice(0, 10));
  const [date2, setDate2] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const [addDays, setAddDays] = useState(30);
  const diff = Math.round((new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24));
  const addedDate = new Date(new Date(date1).getTime() + addDays * 24 * 60 * 60 * 1000).toLocaleDateString();
  return (
    <div className="space-y-6">
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Days Between Two Dates</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Start Date</label><input type="date" className="input-field" value={date1} onChange={e => setDate1(e.target.value)} /></div>
          <div><label className="label">End Date</label><input type="date" className="input-field" value={date2} onChange={e => setDate2(e.target.value)} /></div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-amber-600">{Math.abs(diff)}</p>
          <p className="text-sm text-gray-500">{diff >= 0 ? 'days from start to end' : 'days (end is before start)'}</p>
          <p className="text-xs text-gray-400 mt-1">= {(Math.abs(diff)/7).toFixed(1)} weeks = {(Math.abs(diff)/30).toFixed(1)} months</p>
        </div>
      </div>
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Add Days to Date</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Start Date</label><input type="date" className="input-field" value={date1} onChange={e => setDate1(e.target.value)} /></div>
          <div><label className="label">Days to Add</label><input type="number" className="input-field" value={addDays} onChange={e => setAddDays(+e.target.value)} /></div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Result Date</p>
          <p className="text-xl font-bold text-green-600">{addedDate}</p>
        </div>
      </div>
    </div>
  );
}

// Number to Words
export function NumberToWords() {
  const [num, setNum] = useState('');
  const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const toWords = (n) => {
    if (n === 0) return 'Zero';
    if (n < 0) return 'Minus ' + toWords(-n);
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? ' ' + ones[n%10] : '');
    if (n < 1000) return ones[Math.floor(n/100)] + ' Hundred' + (n%100 ? ' ' + toWords(n%100) : '');
    if (n < 1000000) return toWords(Math.floor(n/1000)) + ' Thousand' + (n%1000 ? ' ' + toWords(n%1000) : '');
    if (n < 1000000000) return toWords(Math.floor(n/1000000)) + ' Million' + (n%1000000 ? ' ' + toWords(n%1000000) : '');
    return toWords(Math.floor(n/1000000000)) + ' Billion' + (n%1000000000 ? ' ' + toWords(n%1000000000) : '');
  };
  const result = num && !isNaN(+num) ? toWords(Math.abs(Math.floor(+num))) : '';
  return (
    <div className="space-y-5">
      <div><label className="label">Enter Number</label><input className="input-field text-lg font-mono" type="number" placeholder="12345" value={num} onChange={e => setNum(e.target.value)} /></div>
      {result && (
        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between"><span className="label mb-0">In Words</span><CopyBtn text={result} /></div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{result}</p>
        </div>
      )}
    </div>
  );
}

// Roman Numerals
export function RomanNumerals() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('to-roman');
  const toRoman = (num) => {
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    let result = '';
    vals.forEach((v, i) => { while (num >= v) { result += syms[i]; num -= v; } });
    return result;
  };
  const fromRoman = (s) => {
    const map = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    return [...s.toUpperCase()].reduce((acc, c, i, arr) => acc + (map[c] < map[arr[i+1]] ? -map[c] : map[c]), 0);
  };
  const result = input ? (mode === 'to-roman' ? toRoman(+input) : fromRoman(input)) : '';
  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {[['to-roman','Number → Roman'],['from-roman','Roman → Number']].map(([v,l]) => (
          <button key={v} onClick={() => setMode(v)}
            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${mode===v ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300'}`}>
            {l}
          </button>
        ))}
      </div>
      <input className="input-field text-lg font-mono" placeholder={mode === 'to-roman' ? 'Enter number (1-3999)' : 'Enter Roman numeral (XIV)'} value={input} onChange={e => setInput(e.target.value)} />
      {result ? (
        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-5 flex items-center justify-between">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{result}</span>
          <CopyBtn text={String(result)} />
        </div>
      ) : input ? <p className="text-sm text-red-500">Invalid input</p> : null}
    </div>
  );
}

// Morse Code
export function MorseCode() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('to-morse');
  const MAP = {A:'.-',B:'-...',C:'-.-.',D:'-..', E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.'};
  const REV = Object.fromEntries(Object.entries(MAP).map(([k,v]) => [v,k]));
  const toMorse = t => t.toUpperCase().split('').map(c => c === ' ' ? '/' : MAP[c] || '?').join(' ');
  const fromMorse = t => t.split(' / ').map(w => w.split(' ').map(c => REV[c] || '?').join('')).join(' ');
  const result = text ? (mode === 'to-morse' ? toMorse(text) : fromMorse(text)) : '';
  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {[['to-morse','Text → Morse'],['from-morse','Morse → Text']].map(([v,l]) => (
          <button key={v} onClick={() => setMode(v)}
            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${mode===v ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300'}`}>
            {l}
          </button>
        ))}
      </div>
      <textarea className="input-field h-28 resize-none" placeholder={mode === 'to-morse' ? 'Type text here…' : 'Enter Morse code (use space between letters, / between words)…'} value={text} onChange={e => setText(e.target.value)} />
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="label mb-0">Result</span><CopyBtn text={result} /></div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 font-mono text-sm text-gray-800 dark:text-gray-200 break-all">{result}</div>
        </div>
      )}
    </div>
  );
}

// Binary Converter
export function BinaryConverter() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('text-to-bin');
  const textToBin = t => t.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
  const binToText = b => b.split(' ').map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
  const numToBin = n => parseInt(n).toString(2);
  const binToNum = b => parseInt(b.replace(/\s/g,''), 2);
  const hexToNum = h => parseInt(h, 16);
  const numToHex = n => parseInt(n).toString(16).toUpperCase();

  const modes = [['text-to-bin','Text→Binary'],['bin-to-text','Binary→Text'],['num-to-bin','Number→Binary'],['bin-to-num','Binary→Number'],['hex-to-num','Hex→Number'],['num-to-hex','Number→Hex']];

  const getResult = () => {
    try {
      if (mode === 'text-to-bin') return textToBin(input);
      if (mode === 'bin-to-text') return binToText(input);
      if (mode === 'num-to-bin') return numToBin(input);
      if (mode === 'bin-to-num') return binToNum(input);
      if (mode === 'hex-to-num') return hexToNum(input);
      if (mode === 'num-to-hex') return numToHex(input);
    } catch { return 'Invalid input'; }
  };
  const result = input ? getResult() : '';

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {modes.map(([v,l]) => (
          <button key={v} onClick={() => setMode(v)}
            className={`py-2 rounded-xl border text-xs font-medium transition-all ${mode===v ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400'}`}>
            {l}
          </button>
        ))}
      </div>
      <textarea className="input-field h-24 resize-none font-mono text-sm" placeholder="Enter input…" value={input} onChange={e => setInput(e.target.value)} />
      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="label mb-0">Result</span><CopyBtn text={String(result)} /></div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 font-mono text-sm text-gray-800 dark:text-gray-200 break-all">{result}</div>
        </div>
      )}
    </div>
  );
}

// Unit Converter
export function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [from, setFrom] = useState('meter');
  const [to, setTo] = useState('foot');
  const [val, setVal] = useState('1');

  const units = {
    length: { meter:1, kilometer:0.001, centimeter:100, millimeter:1000, inch:39.3701, foot:3.28084, yard:1.09361, mile:0.000621371 },
    weight: { kilogram:1, gram:1000, pound:2.20462, ounce:35.274, ton:0.001, milligram:1000000 },
    temperature: null,
    area: { 'sq meter':1, 'sq kilometer':0.000001, 'sq foot':10.7639, 'sq inch':1550, acre:0.000247105, hectare:0.0001 },
    volume: { liter:1, milliliter:1000, 'cubic meter':0.001, gallon:0.264172, quart:1.05669, pint:2.11338, cup:4.22675 },
  };

  const cats = Object.keys(units);
  const curUnits = units[category] ? Object.keys(units[category]) : ['celsius','fahrenheit','kelvin'];

  const convert = () => {
    if (!val || isNaN(+val)) return '';
    const v = +val;
    if (category === 'temperature') {
      if (from === 'celsius' && to === 'fahrenheit') return (v * 9/5 + 32).toFixed(4);
      if (from === 'celsius' && to === 'kelvin') return (v + 273.15).toFixed(4);
      if (from === 'fahrenheit' && to === 'celsius') return ((v - 32) * 5/9).toFixed(4);
      if (from === 'fahrenheit' && to === 'kelvin') return ((v - 32) * 5/9 + 273.15).toFixed(4);
      if (from === 'kelvin' && to === 'celsius') return (v - 273.15).toFixed(4);
      if (from === 'kelvin' && to === 'fahrenheit') return ((v - 273.15) * 9/5 + 32).toFixed(4);
      return v.toFixed(4);
    }
    const u = units[category];
    const base = v / u[from];
    return (base * u[to]).toFixed(6);
  };

  const result = convert();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {cats.map(c => (
          <button key={c} onClick={() => { setCategory(c); setFrom(Object.keys(units[c] || {celsius:1})[0]); setTo(Object.keys(units[c] || {celsius:1})[1]); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all capitalize ${category===c ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="label">From</label>
          <select className="input-field" value={from} onChange={e => setFrom(e.target.value)}>
            {curUnits.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div><label className="label">Value</label><input className="input-field" type="number" value={val} onChange={e => setVal(e.target.value)} /></div>
        <div>
          <label className="label">To</label>
          <select className="input-field" value={to} onChange={e => setTo(e.target.value)}>
            {curUnits.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      {result && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-600">{result}</p>
          <p className="text-sm text-gray-500 mt-1">{val} {from} = {result} {to}</p>
        </div>
      )}
    </div>
  );
}

// Pomodoro Timer
export function PomodoroTimer() {
  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (mode === 'work') { setSessions(s => s + 1); setMode('break'); setTimeLeft(breakMins * 60); }
            else { setMode('work'); setTimeLeft(workMins * 60); }
            try { new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA').play(); } catch {}
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode, workMins, breakMins]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = mode === 'work' ? ((workMins * 60 - timeLeft) / (workMins * 60)) * 100 : ((breakMins * 60 - timeLeft) / (breakMins * 60)) * 100;

  const reset = () => { setRunning(false); setTimeLeft((mode === 'work' ? workMins : breakMins) * 60); };

  return (
    <div className="space-y-6 max-w-sm mx-auto text-center">
      <div className="flex gap-2 justify-center">
        {[['work','🍅 Work'],['break','☕ Break']].map(([m, l]) => (
          <button key={m} onClick={() => { setMode(m); setRunning(false); setTimeLeft((m === 'work' ? workMins : breakMins) * 60); }}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode===m ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle cx="50" cy="50" r="45" fill="none" stroke={mode === 'work' ? '#f59e0b' : '#10b981'} strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 45}`} strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl font-bold font-mono text-slate-900 dark:text-white">
            {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
          </p>
          <p className="text-xs text-gray-400 mt-1 capitalize">{mode} session</p>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button onClick={() => setRunning(!running)} className="btn-gold px-8 py-3">
          {running ? '⏸ Pause' : '▶ Start'}
        </button>
        <button onClick={reset} className="btn-ghost px-5 py-3">🔄</button>
      </div>

      <p className="text-sm text-gray-500">Sessions completed: <strong className="text-amber-600">{sessions}</strong></p>

      <div className="grid grid-cols-2 gap-3 text-left">
        <div><label className="label">Work (min)</label><input type="number" className="input-field" value={workMins} onChange={e => { setWorkMins(+e.target.value); if (!running && mode==='work') setTimeLeft(+e.target.value * 60); }} /></div>
        <div><label className="label">Break (min)</label><input type="number" className="input-field" value={breakMins} onChange={e => { setBreakMins(+e.target.value); if (!running && mode==='break') setTimeLeft(+e.target.value * 60); }} /></div>
      </div>
    </div>
  );
}

// Coin Flip & Dice
export function CoinFlip() {
  const [coinResult, setCoinResult] = useState('');
  const [diceResults, setDiceResults] = useState([]);
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(1);
  const [flipping, setFlipping] = useState(false);

  const flip = () => {
    setFlipping(true);
    setTimeout(() => { setCoinResult(Math.random() < 0.5 ? '🪙 Heads' : '🪙 Tails'); setFlipping(false); }, 600);
  };

  const roll = () => {
    setDiceResults(Array.from({ length: count }, () => Math.ceil(Math.random() * sides)));
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 text-center space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-white">🪙 Coin Flip</h3>
        <div className={`text-5xl transition-all duration-300 ${flipping ? 'scale-0' : 'scale-100'}`}>
          {coinResult ? (coinResult.includes('Heads') ? '🟡' : '⚫') : '🪙'}
        </div>
        {coinResult && <p className="text-lg font-bold text-slate-900 dark:text-white">{coinResult}</p>}
        <button onClick={flip} disabled={flipping} className="btn-gold px-6 py-2.5">Flip Coin</button>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-white">🎲 Dice Roller</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Sides (D{sides})</label>
            <select className="input-field" value={sides} onChange={e => setSides(+e.target.value)}>
              {[4,6,8,10,12,20,100].map(s => <option key={s}>d{s} ({s} sides)</option>)}
            </select>
          </div>
          <div><label className="label">Number of Dice</label><input type="number" className="input-field" min="1" max="20" value={count} onChange={e => setCount(+e.target.value)} /></div>
        </div>
        <button onClick={roll} className="btn-gold px-6 py-2.5">🎲 Roll Dice</button>
        {diceResults.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {diceResults.map((r, i) => (
                <div key={i} className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">{r}</div>
              ))}
            </div>
            <p className="text-sm text-gray-500">Total: <strong className="text-slate-900 dark:text-white">{diceResults.reduce((a,b) => a+b, 0)}</strong> | Average: <strong>{(diceResults.reduce((a,b) => a+b, 0) / diceResults.length).toFixed(1)}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

// Typing Speed Test
export function TypingSpeed() {
  const texts = [
    "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump. The five boxing wizards jump quickly.",
    "Sphinx of black quartz, judge my vow. Two driven jocks help fax my big quiz.",
  ];
  const [text] = useState(texts[Math.floor(Math.random() * texts.length)]);
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const handleType = (e) => {
    const val = e.target.value;
    if (!started) { setStarted(true); setStartTime(Date.now()); }
    setTyped(val);
    const correct = val.split('').filter((c, i) => c === text[i]).length;
    setAccuracy(Math.round((correct / val.length) * 100) || 100);
    if (val === text) {
      const mins = (Date.now() - startTime) / 60000;
      setWpm(Math.round((text.split(' ').length) / mins));
      setFinished(true);
    }
  };

  const reset = () => { setTyped(''); setStarted(false); setFinished(false); setStartTime(null); setWpm(0); setAccuracy(100); };

  return (
    <div className="space-y-5">
      <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-5 font-mono text-sm leading-relaxed">
        {text.split('').map((char, i) => {
          let color = 'text-gray-500';
          if (i < typed.length) color = typed[i] === char ? 'text-green-600' : 'text-red-500 bg-red-100 dark:bg-red-900/30';
          if (i === typed.length) color += ' border-l-2 border-amber-500';
          return <span key={i} className={color}>{char}</span>;
        })}
      </div>
      {!finished ? (
        <textarea className="input-field h-24 resize-none font-mono" placeholder="Start typing here…" value={typed} onChange={handleType} disabled={finished} />
      ) : (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-xl p-4"><p className="text-3xl font-bold text-green-600">{wpm}</p><p className="text-xs text-gray-400">WPM</p></div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-xl p-4"><p className="text-3xl font-bold text-blue-600">{accuracy}%</p><p className="text-xs text-gray-400">Accuracy</p></div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl p-4"><p className="text-3xl font-bold text-amber-600">{text.split(' ').length}</p><p className="text-xs text-gray-400">Words</p></div>
        </div>
      )}
      {finished && <button onClick={reset} className="btn-gold px-6 py-2.5">🔄 Try Again</button>}
      {started && !finished && (
        <p className="text-xs text-gray-400 text-center">Keep typing… {typed.length}/{text.length} characters</p>
      )}
    </div>
  );
}

// ZIP Files
export function ZipFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setFiles(f => [...f, ...Array.from(e.target.files)]);
  };

  const remove = (i) => setFiles(f => f.filter((_, idx) => idx !== i));

  const createZip = async () => {
    setLoading(true);
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, file);
      }
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = 'archive.zip'; a.click();
    } catch { alert('Failed to create ZIP. Please try again.'); }
    finally { setLoading(false); }
  };

  const totalSize = files.reduce((a, f) => a + f.size, 0);

  return (
    <div className="space-y-5">
      <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('zip-input').click()}>
        <p className="text-3xl mb-2">🗜️</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to add files</p>
        <p className="text-xs text-gray-400 mt-1">Any file type — Max 50MB total</p>
        <input id="zip-input" type="file" multiple className="hidden" onChange={handle} />
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400">{files.length} files — Total: {(totalSize/1024/1024).toFixed(2)}MB</p>
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-2.5">
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">📄 {f.name}</span>
              <span className="text-xs text-gray-400 mx-3">{(f.size/1024).toFixed(1)}KB</span>
              <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600">×</button>
            </div>
          ))}
          <button onClick={createZip} disabled={loading} className="btn-gold w-full py-3">
            {loading ? 'Creating ZIP…' : `🗜️ Create ZIP (${files.length} files)`}
          </button>
        </div>
      )}
    </div>
  );
}

// File Size Converter
export function FileSizeConverter() {
  const [val, setVal] = useState('1');
  const [unit, setUnit] = useState('MB');
  const units = { B: 1, KB: 1024, MB: 1024**2, GB: 1024**3, TB: 1024**4 };
  const bytes = +val * units[unit];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="label">Value</label><input className="input-field" type="number" value={val} onChange={e => setVal(e.target.value)} /></div>
        <div><label className="label">Unit</label>
          <select className="input-field" value={unit} onChange={e => setUnit(e.target.value)}>
            {Object.keys(units).map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>
      {val && !isNaN(+val) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(units).map(([u, b]) => (
            <div key={u} className={`bg-gray-50 dark:bg-slate-800 rounded-xl p-4 ${unit === u ? 'ring-2 ring-amber-400' : ''}`}>
              <p className="text-xs text-gray-400 mb-1">{u}</p>
              <p className="font-bold text-slate-900 dark:text-white">{(bytes / b).toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// IP Lookup
export function IpLookup() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookup = async (target) => {
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`https://ipapi.co/${target || 'json'}/json/`);
      const data = await res.json();
      if (data.error) throw new Error(data.reason || 'Invalid IP');
      setResult(data);
    } catch (e) { setError(e.message || 'Failed to lookup IP'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <input className="input-field flex-1" placeholder="Enter IP address or leave empty for your IP" value={ip} onChange={e => setIp(e.target.value)} onKeyDown={e => e.key === 'Enter' && lookup(ip)} />
        <button onClick={() => lookup(ip)} disabled={loading} className="btn-gold px-5 py-2.5">
          {loading ? '⏳' : '🌐 Lookup'}
        </button>
      </div>
      <button onClick={() => lookup('')} className="btn-ghost text-sm px-4 py-2">📍 My IP Address</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {result && (
        <div className="grid grid-cols-2 gap-3">
          {[['IP', result.ip],['Country', result.country_name],['Region', result.region],['City', result.city],['ISP', result.org],['Timezone', result.timezone],['Latitude', result.latitude],['Longitude', result.longitude]].map(([k, v]) => (
            <div key={k} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-0.5">{k}</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{v || '—'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Time Zone Converter
export function TimeZoneConverter() {
  const [time, setTime] = useState(new Date().toISOString().slice(0,16));
  const [fromTz, setFromTz] = useState('UTC');
  const zones = ['UTC','America/New_York','America/Chicago','America/Los_Angeles','America/Toronto','Europe/London','Europe/Paris','Europe/Berlin','Europe/Moscow','Asia/Karachi','Asia/Kolkata','Asia/Dhaka','Asia/Dubai','Asia/Bangkok','Asia/Singapore','Asia/Tokyo','Asia/Shanghai','Australia/Sydney','Pacific/Auckland','Africa/Cairo','Africa/Lagos'];
  const convert = (tz) => {
    try {
      return new Date(time).toLocaleString('en-US', { timeZone: tz, dateStyle: 'medium', timeStyle: 'short' });
    } catch { return '—'; }
  };
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="label">Date & Time</label><input type="datetime-local" className="input-field" value={time} onChange={e => setTime(e.target.value)} /></div>
        <div><label className="label">Source Timezone</label>
          <select className="input-field" value={fromTz} onChange={e => setFromTz(e.target.value)}>
            {zones.map(z => <option key={z}>{z}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {zones.map(z => (
          <div key={z} className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-2.5">
            <span className="text-xs text-gray-500 w-40 flex-shrink-0">{z.replace('_',' ')}</span>
            <span className="text-sm text-slate-900 dark:text-white font-medium">{convert(z)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Random Number
export function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState([]);
  const [unique, setUnique] = useState(false);

  const generate = () => {
    const nums = [];
    const range = max - min + 1;
    if (unique && count > range) return alert(`Cannot generate ${count} unique numbers in range ${min}-${max}`);
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
            <p className="text-xs text-gray-400">Sum: {results.reduce((a,b) => a+b, 0)} | Average: {(results.reduce((a,b) => a+b, 0)/results.length).toFixed(2)}</p>
          )}
        </div>
      )}
    </div>
  );
}

// Word to Text (DOCX reader)
export function WordToText() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const handle = async (file) => {
    setLoading(true);
    try {
      const mammoth = await import('mammoth');
      const buf = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buf });
      setText(result.value || 'No text found in this document.');
    } catch { setText('Could not read this file. Make sure it is a valid .docx file.'); }
    finally { setLoading(false); }
  };
  const download = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], {type:'text/plain'})); a.download='extracted.txt'; a.click(); };
  return (
    <div className="space-y-5">
      <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer"
        onClick={() => document.getElementById('word-input').click()}>
        <p className="text-3xl mb-2">📄</p><p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Word document (.docx)</p>
        <p className="text-xs text-gray-400 mt-1">Max 10MB</p>
        <input id="word-input" type="file" accept=".docx" className="hidden" onChange={e => e.target.files[0] && handle(e.target.files[0])} />
      </div>
      {loading && <div className="flex items-center gap-2 text-sm text-gray-500"><div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />Extracting text…</div>}
      {text && (
        <div className="space-y-2">
          <div className="flex gap-2 justify-end">
            <CopyBtn text={text} />
            <button onClick={download} className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-white font-medium">⬇ Download .txt</button>
          </div>
          <textarea className="input-field h-64 resize-none text-sm" value={text} readOnly />
        </div>
      )}
    </div>
  );
}
