import React from 'react';
import { ExternalLink } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Platform, ColorVariant } from '../types';

interface PlatformCardProps {
  platform: Platform;
}

const colorVariants: Record<ColorVariant, string> = {
  orange: 'from-orange-500 to-orange-600',
  pink: 'from-pink-500 to-pink-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600'
};

const hoverVariants: Record<ColorVariant, string> = {
  orange: 'hover:from-orange-600 hover:to-orange-700',
  pink: 'hover:from-pink-600 hover:to-pink-700',
  blue: 'hover:from-blue-600 hover:to-blue-700',
  purple: 'hover:from-purple-600 hover:to-purple-700',
  green: 'hover:from-green-600 hover:to-green-700'
};

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  const IconComponent = (Icons as any)[platform.icon] || Icons.Globe;
  
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
    >
      <div 
        className={`h-24 bg-gradient-to-br ${colorVariants[platform.color as keyof typeof colorVariants]} ${hoverVariants[platform.color as keyof typeof hoverVariants]} transition-all duration-300 flex items-center justify-center relative`}
      >
        <IconComponent className="w-8 h-8 text-white" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink className="w-4 h-4 text-white/80" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-gray-700 transition-colors">
            {platform.name}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {platform.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-900">{platform.mainCategory}</span>
            <span className="text-xs text-gray-500">{platform.subCategory}</span>
          </div>
          
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 bg-gradient-to-r ${colorVariants[platform.color as keyof typeof colorVariants]} text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center`}
          >
            Visit
          </a>
        </div>
      </div>
    </div>
  );
};