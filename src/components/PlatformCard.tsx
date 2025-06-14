import React from 'react';
import { ExternalLink, Pencil } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Platform } from '../types';

interface PlatformCardProps {
  platform: Platform;
  onEdit: (platform: Platform) => void;
}

const headerClass =
  'h-24 bg-white/70 dark:bg-gray-700/50 backdrop-blur border-b border-white/40 dark:border-gray-600 flex items-center justify-center relative';

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onEdit }) => {
  const IconComponent = (Icons as any)[platform.icon] || Icons.Globe;
  
  return (
    <div
      className="group bg-white/80 dark:bg-gray-800/60 backdrop-blur rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/60 dark:border-gray-700 overflow-hidden"
    >
      <div className={headerClass}>
        <IconComponent className="w-8 h-8 text-white" />
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => onEdit(platform)} className="p-1" aria-label="Edit">
            <Pencil className="w-4 h-4 text-white/80" />
          </button>
          <ExternalLink className="w-4 h-4 text-white/80" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {platform.name}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {platform.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{platform.mainCategory}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{platform.subCategory}</span>
          </div>
          
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/70 dark:bg-gray-700/50 backdrop-blur border border-white/40 dark:border-gray-600 text-sm font-medium rounded-lg hover:bg-white/80 dark:hover:bg-gray-700/70 transition-all inline-flex items-center justify-center"
          >
            Visit
          </a>
        </div>
      </div>
    </div>
  );
};