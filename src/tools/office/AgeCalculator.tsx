import { useState } from 'react';
import { Calendar } from 'lucide-react';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    nextBirthday: number;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    
    // Days until next birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(nextBday.getFullYear() + 1);
    }
    const nextBirthday = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, nextBirthday });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Date of Birth
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <button
        onClick={calculate}
        disabled={!birthDate}
        className="w-full py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Calendar className="w-5 h-5" />
        Calculate Age
      </button>

      {result && (
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-xl text-white text-center">
            <p className="text-sm opacity-80 mb-2">Your Age</p>
            <p className="text-4xl font-bold">
              {result.years} years, {result.months} months, {result.days} days
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Days', value: result.totalDays.toLocaleString() },
              { label: 'Total Weeks', value: result.totalWeeks.toLocaleString() },
              { label: 'Total Months', value: result.totalMonths },
              { label: 'Next Birthday', value: `${result.nextBirthday} days` },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                <p className="text-2xl font-bold text-[#1e3a5f] dark:text-[#d4a843]">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
