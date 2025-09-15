import React from 'react';

interface IconProps {
  // FIX: Add 'microphone' to the list of available icon names.
  name: 'health' | 'inventory' | 'send' | 'microphone';
  className?: string;
}

// FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const icons: { [key in IconProps['name']]: React.ReactElement } = {
  send: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  ),
  health: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  inventory: (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m15 0a2.25 2.25 0 0 1 2.25 2.25m-15 0a2.25 2.25 0 0 0-2.25 2.25m15 0a2.25 2.25 0 0 1 2.25 2.25m-15 0a2.25 2.25 0 0 0-2.25 2.25" />
    </svg>
  ),
  // FIX: Add microphone icon for VoiceControl component.
  microphone: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a3.375 3.375 0 003.375-3.375V5.625a3.375 3.375 0 00-6.75 0v9.75a3.375 3.375 0 003.375 3.375z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5V12a3.75 3.75 0 007.5 0V10.5M12 16.5v2.25m0-12.75v-2.25" />
    </svg>
  ),
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  // FIX: Cast element to specify its props type for cloneElement, resolving TypeScript error.
  return React.cloneElement(icons[name] as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className });
};

export default Icon;
