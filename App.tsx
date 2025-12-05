import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import { AISolver } from './components/AISolver';
import { CalculatorMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.STANDARD);

  return (
    <div className="min-h-screen bg-google-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm h-[800px] flex flex-col relative">
        
        {/* Mode Switcher */}
        <div className="absolute top-[-60px] left-0 w-full flex justify-center mb-6 z-10">
          <div className="bg-google-gray-200 p-1 rounded-full flex shadow-inner">
            <button
              onClick={() => setMode(CalculatorMode.STANDARD)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                mode === CalculatorMode.STANDARD
                  ? 'bg-white text-google-blue-600 shadow-sm'
                  : 'text-google-text-secondary hover:text-google-text-primary'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setMode(CalculatorMode.AI_SOLVER)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                mode === CalculatorMode.AI_SOLVER
                  ? 'bg-white text-google-blue-600 shadow-sm'
                  : 'text-google-text-secondary hover:text-google-text-primary'
              }`}
            >
              AI Solver
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 h-full w-full transition-all duration-500 ease-in-out">
          {mode === CalculatorMode.STANDARD ? (
            <Calculator />
          ) : (
            <AISolver />
          )}
        </div>
        
        <div className="mt-8 text-center text-google-text-secondary text-xs">
          Powered by React & Gemini 2.5 Flash
        </div>
      </div>
    </div>
  );
};

export default App;