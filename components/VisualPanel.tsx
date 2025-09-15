
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface VisualPanelProps {
  mapUrl: string | null;
  npcUrl: string | null;
  isMapLoading: boolean;
  isNpcLoading: boolean;
}

const ImageCard: React.FC<{ src: string | null; isLoading: boolean; title: string; placeholderText: string }> = ({ src, isLoading, title, placeholderText }) => (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 flex flex-col gap-3">
        <h2 className="text-xl font-bold font-serif text-amber-300 border-b border-slate-700 pb-2">{title}</h2>
        <div className="aspect-video bg-slate-800 rounded flex items-center justify-center overflow-hidden">
            {isLoading ? (
                <LoadingSpinner />
            ) : src ? (
                <img src={src} alt={title} className="w-full h-full object-cover" />
            ) : (
                <p className="text-slate-500 font-serif italic">{placeholderText}</p>
            )}
        </div>
    </div>
);

const VisualPanel: React.FC<VisualPanelProps> = ({ mapUrl, npcUrl, isMapLoading, isNpcLoading }) => {
  return (
    <div className="flex flex-col gap-6 sticky top-4">
      <ImageCard 
        src={mapUrl}
        isLoading={isMapLoading}
        title="Map"
        placeholderText="The map will be revealed here..."
      />
      <ImageCard 
        src={npcUrl}
        isLoading={isNpcLoading}
        title="Character / Scenery"
        placeholderText="Characters you meet will appear here..."
      />
    </div>
  );
};

export default VisualPanel;
