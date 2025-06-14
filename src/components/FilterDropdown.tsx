import React from 'react';
import { Category } from '../types';

interface FilterDropdownProps {
  categories: Category[];
  selectedMainCategory: string;
  selectedSubCategory: string;
  onMainCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  onClearFilters: () => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  categories,
  selectedMainCategory,
  selectedSubCategory,
  onMainCategoryChange,
  onSubCategoryChange,
  onClearFilters
}) => {
  const selectedCategory = categories.find(cat => cat.main === selectedMainCategory);
  const availableSubCategories = selectedCategory?.subs || [];

  return (
    <div className="flex items-center space-x-4">
      <select
        value={selectedMainCategory}
        onChange={e => onMainCategoryChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-black dark:bg-gray-700 dark:text-gray-100"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.main} value={category.main}>
            {category.main}
          </option>
        ))}
      </select>

      {availableSubCategories.length > 0 && (
        <select
          value={selectedSubCategory}
          onChange={e => onSubCategoryChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-black dark:bg-gray-700 dark:text-gray-100"
        >
          <option value="">All Sub Categories</option>
          {availableSubCategories.map(sub => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}

      {(selectedMainCategory || selectedSubCategory) && (
        <button
          onClick={onClearFilters}
          className="text-sm text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        >
          Clear
        </button>
      )}
    </div>
  );
};
