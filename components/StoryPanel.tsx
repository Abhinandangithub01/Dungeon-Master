import React, { useRef, useEffect } from 'react';
import { StoryMessage, MessageAuthor } from '../types';

interface StoryPanelProps {
  messages: StoryMessage[];
}

const StoryPanel: React.FC<StoryPanelProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAuthorStyles = (author: MessageAuthor) => {
    switch (author) {
      case MessageAuthor.PLAYER:
        return {
          container: 'justify-end',
          bubble: 'bg-blue-900/60 text-slate-200 border border-blue-700',
          label: 'You',
        };
      case MessageAuthor.DM:
        return {
          container: 'justify-start',
          bubble: 'bg-slate-800/80 text-slate-300 border border-slate-700',
          label: 'Dungeon Master',
        };
      case MessageAuthor.SYSTEM:
        return {
            container: 'justify-center',
            bubble: 'bg-yellow-900/50 text-yellow-300 font-serif italic border-none',
            label: 'System',
        }
      default:
        return {
          container: 'justify-start',
          bubble: 'bg-gray-700',
          label: 'Unknown',
        };
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {messages.map((msg, index) => {
        const styles = getAuthorStyles(msg.author);
        return (
          <div key={msg.id} className={`flex flex-col gap-1 w-full ${styles.container}`}>
            {msg.author !== MessageAuthor.SYSTEM && <span className="text-sm font-bold text-amber-400 font-serif px-2">{styles.label}</span>}
            <div className={`p-4 rounded-lg max-w-xl ${styles.bubble}`}>
                <p className="whitespace-pre-wrap font-serif leading-relaxed">{msg.text}</p>
            </div>
          </div>
        );
      })}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default StoryPanel;
