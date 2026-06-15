import { useStore } from '../../store/useStore';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AdBannerProps {
  position: 'top' | 'sidebar' | 'inline' | 'footer';
  className?: string;
}

const AdBanner = ({ position, className = '' }: AdBannerProps) => {
  const { adSenseCode } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!adSenseCode || dismissed) return null;

  const sizes: Record<string, string> = {
    top: 'h-24 w-full',
    sidebar: 'h-64 w-full',
    inline: 'h-32 w-full',
    footer: 'h-24 w-full',
  };

  return (
    <div className={`relative ${sizes[position]} ${className}`}>
      <div 
        className="w-full h-full ad-slot"
        dangerouslySetInnerHTML={{ __html: adSenseCode }}
      />
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-1 right-1 p-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 md:hidden"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default AdBanner;
