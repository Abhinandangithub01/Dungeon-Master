
import React from 'react';
import Icon from './Icon';

interface VoiceControlProps {
  isListening: boolean;
  isThinking: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  hasSupport: boolean;
}

const VoiceControl: React.FC<VoiceControlProps> = ({ isListening, isThinking, transcript, startListening, stopListening, hasSupport }) => {
  if (!hasSupport) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-lg px-4">
        <div className="bg-red-800 text-white p-4 rounded-lg text-center font-semibold">
          Voice recognition is not supported by your browser.
        </div>
      </div>
    );
  }
  
  const buttonClasses = `w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
    ${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-500'}
    ${isThinking ? 'bg-purple-600 cursor-not-allowed' : ''}`;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 flex flex-col items-center gap-2">
      <div className="h-8 text-center text-slate-400 italic font-serif">
        {isListening ? transcript || 'Listening...' : (isThinking ? 'Dungeon Master is thinking...' : 'Press the button and speak')}
      </div>
      <button 
        onClick={isListening ? stopListening : startListening}
        disabled={isThinking}
        className={buttonClasses}
      >
        <Icon name="microphone" className="h-10 w-10 text-white" />
      </button>
    </div>
  );
};

export default VoiceControl;
