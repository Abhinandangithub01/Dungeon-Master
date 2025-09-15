
import React from 'react';
import { PlayerStats } from '../types';
import Icon from './Icon';

interface StatsPanelProps {
  stats: PlayerStats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 flex flex-col gap-4 sticky top-4">
      <h2 className="text-xl font-bold font-serif text-amber-300 border-b border-slate-700 pb-2">Character</h2>
      
      <div className="flex items-center gap-3">
        <Icon name="health" className="w-6 h-6 text-red-400" />
        <div>
          <p className="text-sm text-slate-400">Health</p>
          <p className="text-lg font-bold text-slate-100">{stats.health || '100/100'}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Icon name="inventory" className="w-6 h-6 text-yellow-400" />
          <p className="text-sm text-slate-400">Inventory</p>
        </div>
        <ul className="pl-4 list-disc list-inside text-slate-300 font-serif space-y-1">
          {stats.inventory.length > 0 ? (
            stats.inventory.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li className="italic text-slate-500">Empty</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StatsPanel;
