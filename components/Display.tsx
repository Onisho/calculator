import React from 'react';

interface DisplayProps {
  value: string;
  history?: string;
}

export const Display: React.FC<DisplayProps> = ({ value, history }) => {
  // Dynamic font sizing based on length
  const getFontSize = (text: string) => {
    if (text.length > 12) return 'text-4xl';
    if (text.length > 8) return 'text-5xl';
    return 'text-6xl';
  };

  return (
    <div className="w-full h-32 mb-4 flex flex-col items-end justify-end px-6 py-2">
      {history && (
        <div className="text-google-text-secondary text-lg mb-1 h-6 truncate w-full text-right font-light">
          {history}
        </div>
      )}
      <div className={`${getFontSize(value)} text-google-text-primary font-normal truncate w-full text-right tracking-tight transition-all duration-200`}>
        {value}
      </div>
    </div>
  );
};