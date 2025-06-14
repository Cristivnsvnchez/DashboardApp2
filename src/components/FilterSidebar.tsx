import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Category } from '../types';

interface FilterSidebarProps {
  categories: Category[];
  selectedMainCategory: string;
  selectedSubCategory: string;
  searchQuery: string;
  onMainCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const colorVariants = {
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  pink: 'bg-pink-100 text-pink-800 border-pink-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  green: 'bg-green-100 text-green-800 border-green-200'
};

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedMainCategory,
  selectedSubCategory,
  searchQuery,
  onMainCategoryChange,
  onSubCategoryChange,
  onSearchChange,
  onClearFilters,
  isMobile = false,
  isOpen = true,
  onClose
}) => {
  const selectedCategory = categories.find(cat => cat.main === selectedMainCategory);
  const availableSubCategories = selectedCategory?.subs || [];

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex-1 p-4 space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Platforms
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Main Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Main Categories
            </label>
            {(selectedMainCategory || selectedSubCategory || searchQuery) && (
              <button
                onClick={onClearFilters}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="space-y-2">
            <button
              onClick={() => onMainCategoryChange('')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !selectedMainCategory
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category.main}
                onClick={() => onMainCategoryChange(category.main)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors border ${
                  selectedMainCategory === category.main
                    ? colorVariants[category.color as keyof typeof colorVariants]
                    : 'hover:bg-gray-50 border-transparent'
                }`}
              >
                {category.main}
              </button>
            ))}
          </div>
        </div>

        {/* Sub Categories */}
        {selectedMainCategory && availableSubCategories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sub Categories
            </label>
            <div className="space-y-2">
              <button
                onClick={() => onSubCategoryChange('')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  !selectedSubCategory
                    ? 'bg-gray-100 text-gray-800 border border-gray-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                All Sub Categories
              </button>
              {availableSubCategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => onSubCategoryChange(sub)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm border ${
                    selectedSubCategory === sub
                      ? colorVariants[selectedCategory?.color as keyof typeof colorVariants]
                      : 'hover:bg-gray-50 border-transparent'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
        )}
        <div
          className={`fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-xl z-50 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 shadow-sm">
      {sidebarContent}
    </div>
  );
};