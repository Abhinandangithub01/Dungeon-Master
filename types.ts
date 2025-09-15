
export enum GameState {
  SETUP = 'SETUP',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  ERROR = 'ERROR',
}

export enum MessageAuthor {
  PLAYER = 'PLAYER',
  DM = 'DM',
  SYSTEM = 'SYSTEM',
}

export interface StoryMessage {
  author: MessageAuthor;
  text: string;
  id: string;
}

export interface PlayerStats {
  health: string;
  inventory: string[];
}
