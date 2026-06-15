import { useState } from 'react';
import { Delete } from 'lucide-react';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(true);

  const buttons = [
    ['sin', 'cos', 'tan', 'π', 'C'],
    ['√', 'x²', 'xʸ', '(', ')'],
    ['7', '8', '9', '÷', '⌫'],
    ['4', '5', '6', '×', 'M+'],
    ['1', '2', '3', '-', 'MR'],
    ['0', '.', '±', '+', '='],
  ];

  const handleClick = (btn: string) => {
    try {
      switch (btn) {
        case 'C':
          setDisplay('0');
          break;
        case '⌫':
          setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
          break;
        case '=':
          calculate();
          break;
        case '±':
          setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
          break;
        case 'π':
          setDisplay(display === '0' ? Math.PI.toString() : display + Math.PI.toString());
          break;
        case '√':
          setDisplay(Math.sqrt(parseFloat(display)).toString());
          break;
        case 'x²':
          setDisplay(Math.pow(parseFloat(display), 2).toString());
          break;
        case 'sin':
          const sinVal = parseFloat(display);
          setDisplay(Math.sin(isRadians ? sinVal : sinVal * Math.PI / 180).toString());
          break;
        case 'cos':
          const cosVal = parseFloat(display);
          setDisplay(Math.cos(isRadians ? cosVal : cosVal * Math.PI / 180).toString());
          break;
        case 'tan':
          const tanVal = parseFloat(display);
          setDisplay(Math.tan(isRadians ? tanVal : tanVal * Math.PI / 180).toString());
          break;
        case 'M+':
          setMemory(memory + parseFloat(display));
          break;
        case 'MR':
          setDisplay(memory.toString());
          break;
        case 'xʸ':
          setDisplay(display + '^');
          break;
        case '÷':
          setDisplay(display + '/');
          break;
        case '×':
          setDisplay(display + '*');
          break;
        default:
          setDisplay(display === '0' && btn !== '.' ? btn : display + btn);
      }
    } catch (e) {
      setDisplay('Error');
    }
  };

  const calculate = () => {
    try {
      let expr = display.replace(/\^/g, '**');
      const result = Function('"use strict"; return (' + expr + ')')();
      setDisplay(result.toString());
    } catch (e) {
      setDisplay('Error');
    }
  };

  const getButtonClass = (btn: string) => {
    if (btn === '=') return 'bg-[#1e3a5f] dark:bg-[#d4a843] text-white dark:text-[#1e3a5f] font-bold';
    if (btn === 'C') return 'bg-red-500 text-white';
    if (['sin', 'cos', 'tan', '√', 'x²', 'xʸ', 'π', 'M+', 'MR'].includes(btn)) {
      return 'bg-[#1e3a5f]/10 dark:bg-[#d4a843]/10 text-[#1e3a5f] dark:text-[#d4a843]';
    }
    if (['÷', '×', '-', '+', '(', ')'].includes(btn)) {
      return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
    return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white';
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Mode toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRadians(true)}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            isRadians ? 'bg-[#1e3a5f] text-white dark:bg-[#d4a843] dark:text-[#1e3a5f]' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          RAD
        </button>
        <button
          onClick={() => setIsRadians(false)}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            !isRadians ? 'bg-[#1e3a5f] text-white dark:bg-[#d4a843] dark:text-[#1e3a5f]' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          DEG
        </button>
      </div>

      {/* Display */}
      <div className="p-6 bg-gray-900 rounded-2xl">
        <div className="text-right text-3xl font-mono text-white overflow-x-auto">
          {display}
        </div>
        {memory !== 0 && (
          <div className="text-right text-sm text-gray-400 mt-1">
            M = {memory}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-5 gap-2">
        {buttons.flat().map((btn, i) => (
          <button
            key={i}
            onClick={() => handleClick(btn)}
            className={`p-4 rounded-xl text-lg font-medium transition-all hover:scale-105 active:scale-95 ${getButtonClass(btn)}`}
          >
            {btn === '⌫' ? <Delete className="w-5 h-5 mx-auto" /> : btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScientificCalculator;
