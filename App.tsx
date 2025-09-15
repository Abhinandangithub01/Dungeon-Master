import React, { useState, useCallback, useEffect } from 'react';
import { GameState, MessageAuthor, PlayerStats, StoryMessage } from './types';
import { geminiService } from './services/geminiService';

import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import TextInput from './components/TextInput';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SETUP);
  const [error, setError] = useState<string | null>(null);

  const [storyLog, setStoryLog] = useState<StoryMessage[]>([]);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({ health: '100/100', inventory: [] });
  
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [npcUrl, setNpcUrl] = useState<string | null>(null);
  
  const [isThinking, setIsThinking] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isNpcLoading, setIsNpcLoading] = useState(false);

  const processAIStream = useCallback(async (stream: AsyncGenerator<any>) => {
    let currentResponse = '';
    const dmMessageId = Date.now().toString();

    // Add an empty DM message to start
    setStoryLog(prev => [...prev, { author: MessageAuthor.DM, text: '', id: dmMessageId }]);

    for await (const chunk of stream) {
        currentResponse += chunk.text;
        
        // Update the last message in the log with the new text
        setStoryLog(prev => prev.map(msg => msg.id === dmMessageId ? { ...msg, text: currentResponse.replace(/\[.*?\]/g, '').trim() } : msg));

        // Process tags
        const mapRegex = /\[MAP_DESCRIPTION: (.*?)\]/;
        const npcRegex = /\[NPC_DESCRIPTION: (.*?)\]/;
        const healthRegex = /\[HEALTH: (.*?)\]/;
        const inventoryRegex = /\[INVENTORY: (.*?)\]/;

        const mapMatch = currentResponse.match(mapRegex);
        if (mapMatch && !isMapLoading) {
            setIsMapLoading(true);
            geminiService.generateImage(mapMatch[1]).then(url => {
                setMapUrl(url);
                setIsMapLoading(false);
            });
        }

        const npcMatch = currentResponse.match(npcRegex);
        if (npcMatch && !isNpcLoading) {
            setIsNpcLoading(true);
            geminiService.generateImage(npcMatch[1]).then(url => {
                setNpcUrl(url);
                setIsNpcLoading(false);
            });
        }

        const healthMatch = currentResponse.match(healthRegex);
        if (healthMatch) {
            setPlayerStats(prev => ({ ...prev, health: healthMatch[1] }));
        }

        const inventoryMatch = currentResponse.match(inventoryRegex);
        if (inventoryMatch) {
            setPlayerStats(prev => ({ ...prev, inventory: inventoryMatch[1].split(',').map(item => item.trim()) }));
        }
    }
    setIsThinking(false);
  }, [isMapLoading, isNpcLoading]);

  const handlePlayerCommand = useCallback(async (command: string) => {
    if (!command || isThinking) return;

    setIsThinking(true);
    setStoryLog(prev => [...prev, { author: MessageAuthor.PLAYER, text: command, id: Date.now().toString() }]);

    try {
        if (gameState === GameState.SETUP) {
            geminiService.startChat();
            setGameState(GameState.LOADING);
        }
        const stream = await geminiService.sendMessageStream(command);
        if (gameState !== GameState.PLAYING) setGameState(GameState.PLAYING);
        await processAIStream(stream);

    } catch (err) {
        console.error("Error sending message to Gemini:", err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(`Failed to communicate with the Dungeon Master. ${errorMessage}`);
        setGameState(GameState.ERROR);
        setIsThinking(false);
    }
  }, [isThinking, gameState, processAIStream]);

  useEffect(() => {
    // This is a simple check. In a real app, you'd want a more robust way to handle the key.
    if (!process.env.API_KEY) {
      setError("Gemini API Key is not configured. The application cannot start.");
      setGameState(GameState.ERROR);
    }
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.SETUP:
      case GameState.ERROR:
        return <SetupScreen error={error} />;
      case GameState.LOADING:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <LoadingSpinner size={16} />
            <p className="mt-4 text-xl font-serif text-slate-300">The Dungeon Master is preparing your world...</p>
          </div>
        );
      case GameState.PLAYING:
        return (
          <GameScreen
            stats={playerStats}
            messages={storyLog}
            mapUrl={mapUrl}
            npcUrl={npcUrl}
            isMapLoading={isMapLoading}
            isNpcLoading={isNpcLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 font-sans min-h-screen pb-24">
      {renderContent()}
      {(gameState === GameState.SETUP || gameState === GameState.PLAYING) && (
        <TextInput
          isThinking={isThinking}
          onSubmit={handlePlayerCommand}
        />
      )}
    </div>
  );
};

export default App;
