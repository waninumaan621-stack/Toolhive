import { useState } from 'react';
import { Scale } from 'lucide-react';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!w || !h) return;
    
    let bmi: number;
    if (unit === 'metric') {
      bmi = w / Math.pow(h / 100, 2);
    } else {
      bmi = (w / Math.pow(h, 2)) * 703;
    }
    
    let category: string;
    let color: string;
    
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-500';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-500';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-500';
    } else {
      category = 'Obese';
      color = 'text-red-500';
    }
    
    setResult({ bmi: Math.round(bmi * 10) / 10, category, color });
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
        <button
          onClick={() => setUnit('metric')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'metric'
              ? 'bg-white dark:bg-gray-700 text-[#1e3a5f] dark:text-[#d4a843] shadow'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            unit === 'imperial'
              ? 'bg-white dark:bg-gray-700 text-[#1e3a5f] dark:text-[#d4a843] shadow'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Imperial (lbs/in)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unit === 'metric' ? '70' : '154'}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={unit === 'metric' ? '175' : '70'}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <Scale className="w-5 h-5" />
        Calculate BMI
      </button>

      {result && (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your BMI</p>
          <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">{result.bmi}</p>
          <p className={`text-lg font-semibold ${result.color}`}>{result.category}</p>
          
          <div className="mt-6 relative h-4 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-white border-2 border-gray-800 rounded-full"
              style={{ left: `${Math.min(Math.max((result.bmi - 15) / 25 * 100, 0), 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40</span>
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm text-blue-800 dark:text-blue-200">
        <strong>BMI Categories:</strong>
        <ul className="mt-2 space-y-1">
          <li>• Underweight: Less than 18.5</li>
          <li>• Normal weight: 18.5 - 24.9</li>
          <li>• Overweight: 25 - 29.9</li>
          <li>• Obese: 30 or greater</li>
        </ul>
      </div>
    </div>
  );
};

export default BMICalculator;
