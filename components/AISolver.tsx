import React, { useState } from 'react';
import { solveMathProblem } from '../services/geminiService';
import { AISolution } from '../types';

export const AISolver: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<AISolution | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setSolution(null);
    try {
      const result = await solveMathProblem(input);
      setSolution(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 text-google-text-primary bg-white rounded-3xl shadow-card border border-google-gray-200">
      <h2 className="text-xl font-medium mb-4 text-google-blue-600 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        AI Math Solver
      </h2>
      
      <p className="text-google-text-secondary text-sm mb-6">
        Ask natural language questions like "What is 15% of 300?" or complex word problems.
      </p>

      <form onSubmit={handleSubmit} className="mb-6 relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your math problem here..."
          className="w-full bg-google-gray-50 text-google-text-primary rounded-2xl p-4 pr-12 h-32 focus:outline-none focus:ring-2 focus:ring-google-blue-500 border border-google-gray-200 resize-none placeholder-google-text-secondary"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button 
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute bottom-4 right-4 bg-google-blue-500 p-2 rounded-full text-white disabled:opacity-50 hover:bg-google-blue-600 transition-colors shadow-md"
        >
          {loading ? (
             <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          )}
        </button>
      </form>

      {solution && (
        <div className="flex-1 overflow-y-auto no-scrollbar bg-google-gray-50 rounded-2xl p-5 border border-google-gray-200">
          <div className="mb-4">
            <span className="text-google-text-secondary text-xs uppercase tracking-wider font-semibold block mb-1">Answer</span>
            <div className="text-3xl font-normal text-google-text-primary">{solution.answer}</div>
          </div>
          <div>
            <span className="text-google-text-secondary text-xs uppercase tracking-wider font-semibold block mb-1">Reasoning</span>
            <p className="text-google-text-primary leading-relaxed text-sm">
              {solution.reasoning}
            </p>
          </div>
        </div>
      )}
      
      {!solution && !loading && (
        <div className="flex-1 flex items-center justify-center opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-google-text-primary"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
        </div>
      )}
    </div>
  );
};