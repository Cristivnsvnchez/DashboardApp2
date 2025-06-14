import React from 'react';
import DashAppLogo from '../assets/DashApp.png';

interface SideBannerProps {
  onAddPlatform: () => void;
  onAddCategory: () => void;
  onAddSubCategory: () => void;
}

export const SideBanner: React.FC<SideBannerProps> = ({
  onAddPlatform,
  onAddCategory,
  onAddSubCategory,
}) => {
  return (
    <div className="w-64 min-h-screen bg-white/80 dark:bg-gray-800/70 backdrop-blur border-r border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <img
        src={DashAppLogo}
        alt="Dashboard App logo"
        className="w-24 h-auto mx-auto mb-2"
      />
      <button
        onClick={onAddPlatform}
        className="w-full px-4 py-2 bg-primary/40 backdrop-blur-md text-gray-900 dark:text-white rounded-lg hover:bg-primary/50 transition-colors font-medium shadow-sm hover:shadow-md"
      >
        Platform
      </button>
      <button
        onClick={onAddCategory}
        className="w-full px-4 py-2 bg-secondary/40 backdrop-blur-md text-gray-900 dark:text-white rounded-lg hover:bg-secondary/50 transition-colors font-medium shadow-sm hover:shadow-md"
      >
        Category
      </button>
      <button
        onClick={onAddSubCategory}
        className="w-full px-4 py-2 bg-accent/40 backdrop-blur-md text-gray-900 dark:text-white rounded-lg hover:bg-accent/50 transition-colors font-medium shadow-sm hover:shadow-md"
      >
        Sub Category
      </button>
    </div>
  );
};
