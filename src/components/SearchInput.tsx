import React, { useMemo, useState } from 'react';
import { Platform } from '../types';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  allPlatforms: Platform[];
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  allPlatforms,
  placeholder,
  className = '',
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!value.trim()) return [] as Platform[];
    const lower = value.toLowerCase();
    return allPlatforms
      .filter(p => p.name.toLowerCase().includes(lower))
      .slice(0, 5);
  }, [value, allPlatforms]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={e => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => value && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        placeholder={placeholder}
        className={className}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow">
          {suggestions.map(s => (
            <li key={s.id}>
              <button
                type="button"
                onMouseDown={() => {
                  onChange(s.name);
                  setShowSuggestions(false);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

