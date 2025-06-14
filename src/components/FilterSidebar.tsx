import React from 'react';
import { Filter, X } from 'lucide-react';
import { Category } from '../types';

interface FilterSidebarProps {
  categories: Category[];
  selectedMainCategory: string;
  selectedSubCategory: string;
  onMainCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const activeClass =
  'bg-white/70 dark:bg-gray-700/50 backdrop-blur border border-white/40 dark:border-gray-600';


export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedMainCategory,
  selectedSubCategory,
  onMainCategoryChange,
  onSubCategoryChange,
  onClearFilters,
  isMobile = false,
  isOpen = true,
  onClose
}) => {
  const selectedCategory = categories.find(cat => cat.main === selectedMainCategory);
  const availableSubCategories = selectedCategory?.subs || [];

  const sidebarContent = (
    <div className="h-full flex flex-col text-gray-700 dark:text-gray-200">
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex-1 p-4 space-y-6">
        {/* Main Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Main Categories
            </label>
            {(selectedMainCategory || selectedSubCategory) && (
              <button
                onClick={onClearFilters}
                className="text-xs text-primary hover:text-primary/80 font-medium"
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
                  ? activeClass
                  : 'hover:bg-white/50 hover:backdrop-blur border border-transparent'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category.main}
                onClick={() => onMainCategoryChange(category.main)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedMainCategory === category.main
                    ? activeClass
                    : 'hover:bg-white/50 hover:backdrop-blur border border-transparent'
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              Sub Categories
            </label>
            <div className="space-y-2">
              <button
                onClick={() => onSubCategoryChange('')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  !selectedSubCategory
                    ? activeClass
                    : 'hover:bg-white/50 hover:backdrop-blur border border-transparent'
                }`}
              >
                All Sub Categories
              </button>
              {availableSubCategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => onSubCategoryChange(sub)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                    selectedSubCategory === sub
                      ? activeClass
                      : 'hover:bg-white/50 hover:backdrop-blur border border-transparent'
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
          className={`fixed left-0 top-0 h-full w-80 bg-white/80 dark:bg-gray-800/70 backdrop-blur border-r border-gray-200 dark:border-gray-700 shadow-xl z-50 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div className="w-80 min-h-screen bg-white/80 dark:bg-gray-800/60 backdrop-blur border-r border-gray-200 dark:border-gray-700 shadow-sm">
      {sidebarContent}
    </div>
  );
};