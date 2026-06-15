import { ReactNode } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface AIToolWrapperProps {
  children: ReactNode;
}

const AIToolWrapper = ({ children }: AIToolWrapperProps) => {
  const { getRemainingAIUses } = useStore();
  const remaining = getRemainingAIUses();

  return (
    <div className="space-y-6">
      {/* AI Usage Banner */}
      <div className={`flex items-center justify-between p-4 rounded-xl ${
        remaining > 0 
          ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-200 dark:border-purple-800'
          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            remaining > 0 ? 'bg-purple-500' : 'bg-red-500'
          }`}>
            {remaining > 0 ? (
              <Sparkles className="w-5 h-5 text-white" />
            ) : (
              <AlertCircle className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <p className={`font-semibold ${
              remaining > 0 ? 'text-purple-700 dark:text-purple-300' : 'text-red-700 dark:text-red-300'
            }`}>
              {remaining > 0 ? 'AI-Powered Tool' : 'Daily Limit Reached'}
            </p>
            <p className={`text-sm ${
              remaining > 0 ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {remaining > 0 
                ? `${remaining} AI uses remaining today`
                : 'Come back tomorrow for more AI magic!'
              }
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-3 h-8 rounded-full ${
                i <= remaining
                  ? 'bg-gradient-to-t from-purple-500 to-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tool Content */}
      {children}
    </div>
  );
};

export default AIToolWrapper;
