import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const conversions = {
  length: {
    name: 'Length',
    units: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'foot', 'inch'],
    toBase: {
      meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001,
      mile: 1609.34, yard: 0.9144, foot: 0.3048, inch: 0.0254
    }
  },
  weight: {
    name: 'Weight',
    units: ['kilogram', 'gram', 'milligram', 'pound', 'ounce', 'ton'],
    toBase: {
      kilogram: 1, gram: 0.001, milligram: 0.000001,
      pound: 0.453592, ounce: 0.0283495, ton: 1000
    }
  },
  temperature: {
    name: 'Temperature',
    units: ['celsius', 'fahrenheit', 'kelvin'],
    toBase: {} // Special handling
  },
  volume: {
    name: 'Volume',
    units: ['liter', 'milliliter', 'gallon', 'quart', 'pint', 'cup'],
    toBase: {
      liter: 1, milliliter: 0.001, gallon: 3.78541,
      quart: 0.946353, pint: 0.473176, cup: 0.236588
    }
  },
  area: {
    name: 'Area',
    units: ['square meter', 'square kilometer', 'square foot', 'acre', 'hectare'],
    toBase: {
      'square meter': 1, 'square kilometer': 1000000, 'square foot': 0.092903,
      acre: 4046.86, hectare: 10000
    }
  }
};

type ConversionType = keyof typeof conversions;

const UnitConverter = () => {
  const [type, setType] = useState<ConversionType>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState('');

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;

    if (type === 'temperature') {
      let celsius: number;
      if (fromUnit === 'celsius') celsius = v;
      else if (fromUnit === 'fahrenheit') celsius = (v - 32) * 5/9;
      else celsius = v - 273.15;

      let converted: number;
      if (toUnit === 'celsius') converted = celsius;
      else if (toUnit === 'fahrenheit') converted = celsius * 9/5 + 32;
      else converted = celsius + 273.15;

      setResult(converted.toFixed(4));
    } else {
      const conv = conversions[type];
      const toBase = conv.toBase as Record<string, number>;
      const baseValue = v * toBase[fromUnit];
      const converted = baseValue / toBase[toUnit];
      setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
    }
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const currentUnits = conversions[type].units;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Conversion Type
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(conversions).map(([key, val]) => (
            <button
              key={key}
              onClick={() => {
                setType(key as ConversionType);
                setFromUnit(val.units[0]);
                setToUnit(val.units[1]);
              }}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                type === key
                  ? 'bg-[#1e3a5f] text-white dark:bg-[#d4a843] dark:text-[#1e3a5f]'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {val.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white capitalize"
          >
            {currentUnits.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={swap}
            className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
          >
            <ArrowLeftRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            To
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white capitalize"
          >
            {currentUnits.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Value
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
        />
      </div>

      <button
        onClick={convert}
        className="w-full py-3 px-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white font-semibold rounded-xl transition-all"
      >
        Convert
      </button>

      {result && (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Result</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value} <span className="capitalize">{fromUnit}</span> = {result} <span className="capitalize">{toUnit}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
