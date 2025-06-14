import React from 'react';
import { Plus } from 'lucide-react';

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
      <button
        onClick={onAddPlatform}
        className="w-full flex items-center space-x-2 px-4 py-2 bg-primary/40 backdrop-blur-md text-gray-900 dark:text-white rounded-lg hover:bg-primary/50 transition-colors font-medium shadow-sm hover:shadow-md"
      >
        <Plus className="w-4 h-4" />
        <span>Add Platform</span>
      </button>
      <button
        onClick={onAddCategory}
        className="w-full flex items-center space-x-2 px-4 py-2 bg-secondary/40 backdrop-blur-md text-gray-900 dark:text-white rounded-lg hover:bg-secondary/50 transition-colors font-medium shadow-sm hover:shadow-md"
      >
        <Plus className="w-4 h-4" />
        <span>Add Category</span>
      </button>
      <button
        onClick={onAddSubCategory}
        className="w-full flex items-center space-x-2 px-4 py-2 bg-accent/40 backdrop-blur-md text-gray-900 dark:text-white rounded-lg hover:bg-accent/50 transition-colors font-medium shadow-sm hover:shadow-md"
      >
        <Plus className="w-4 h-4" />
        <span>Add Sub Category</span>
      </button>
    </div>
  );
};
