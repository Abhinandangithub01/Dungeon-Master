import React from 'react';

interface SetupScreenProps {
  error: string | null;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ error }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-slate-900">
      <div className="max-w-2xl">
        <h1 className="text-6xl font-bold font-serif text-amber-300 mb-4">AI Dungeon Master</h1>
        <p className="text-xl text-slate-300 font-serif mb-8">
          Welcome, adventurer. Your epic journey is about to begin. Use the input below to shape the world.
          Type your desired initial setting and character class to begin.
        </p>
        <p className="text-lg text-slate-400 mb-8">
          For example: <span className="italic text-amber-200">"I want to start in a haunted forest as a rogue."</span> or <span className="italic text-amber-200">"Let's begin in a mystical city as a wizard."</span>
        </p>
        {error && <p className="bg-red-800/50 border border-red-600 text-red-300 p-4 rounded-lg mb-4">{error}</p>}
        <p className="text-slate-500 text-sm">Make sure you have provided an API key.</p>
      </div>
    </div>
  );
};

export default SetupScreen;
