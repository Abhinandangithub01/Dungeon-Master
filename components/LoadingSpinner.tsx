
import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 8, className = 'border-slate-300' }) => {
  return (
    <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 ${className}`}></div>
  );
};

export default LoadingSpinner;
