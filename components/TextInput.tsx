import React, { useState } from 'react';
import Icon from './Icon';
import LoadingSpinner from './LoadingSpinner';

interface TextInputProps {
  isThinking: boolean;
  onSubmit: (command: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ isThinking, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isThinking) {
      onSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isThinking ? 'Dungeon Master is thinking...' : 'Enter your command...'}
          disabled={isThinking}
          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
          aria-label="Player command input"
        />
        <button
          type="submit"
          disabled={isThinking || !inputValue.trim()}
          className="w-12 h-12 flex-shrink-0 bg-blue-600 rounded-lg flex items-center justify-center transition-colors hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
          aria-label="Send command"
        >
          {isThinking ? <LoadingSpinner size={6} /> : <Icon name="send" className="w-6 h-6 text-white" />}
        </button>
      </form>
    </div>
  );
};

export default TextInput;
