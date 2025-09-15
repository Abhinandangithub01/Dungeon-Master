
import React from 'react';
import { PlayerStats, StoryMessage } from '../types';
import StatsPanel from './StatsPanel';
import StoryPanel from './StoryPanel';
import VisualPanel from './VisualPanel';

interface GameScreenProps {
  stats: PlayerStats;
  messages: StoryMessage[];
  mapUrl: string | null;
  npcUrl: string | null;
  isMapLoading: boolean;
  isNpcLoading: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ stats, messages, mapUrl, npcUrl, isMapLoading, isNpcLoading }) => {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-amber-300">Dungeon Master</h1>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        <aside className="lg:col-span-3">
          <StatsPanel stats={stats} />
        </aside>
        <section className="lg:col-span-5">
          <StoryPanel messages={messages} />
        </section>
        <aside className="lg:col-span-4">
          <VisualPanel mapUrl={mapUrl} npcUrl={npcUrl} isMapLoading={isMapLoading} isNpcLoading={isNpcLoading} />
        </aside>
      </main>
    </div>
  );
};

export default GameScreen;
