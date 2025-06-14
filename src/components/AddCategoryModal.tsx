import React, { useState, useEffect, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (category: Category) => void;
  onDelete: (main: string) => void;
  categories: Category[];
}


export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  onDelete,
  categories,
}) => {
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<{ main: string; subs: string; icon: string }>({
    main: '',
    subs: '',
    icon: 'Star'
  });
  const [iconSearch, setIconSearch] = useState('');

  const availableIcons = [
    'Globe', 'Code', 'FileText', 'BookOpen', 'Play', 'Music', 'Github', 'Figma',
    'Camera', 'Palette', 'Monitor', 'Smartphone', 'Headphones', 'Calendar',
    'MessageCircle', 'Mail', 'Users', 'Settings', 'Star', 'Heart'
  ];

  useEffect(() => {
    if (!isOpen) return;
    firstFieldRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.main.trim()) return;

    const subsArray = formData.subs
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    onAdd({ main: formData.main.trim(), subs: subsArray, color: 'primary', icon: formData.icon });
    setFormData({ main: '', subs: '', icon: 'Star' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Category</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Category Name *
            </label>
            <input
              ref={firstFieldRef}
              type="text"
              value={formData.main}
              onChange={e => setFormData(prev => ({ ...prev, main: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="e.g., Productivity"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Sub Categories (comma separated)
            </label>
            <input
              type="text"
              value={formData.subs}
              onChange={e => setFormData(prev => ({ ...prev, subs: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Design, Development"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Icon
            </label>
            <input
              type="text"
              value={iconSearch}
              onChange={e => setIconSearch(e.target.value)}
              placeholder="Search icon..."
              className="w-full mb-3 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
            />
            <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
              {availableIcons
                .filter(icon => icon.toLowerCase().includes(iconSearch.toLowerCase()))
                .map(iconName => {
                  const IconComp = (Icons as any)[iconName];
                  return (
                    <button
                      type="button"
                      key={iconName}
                      onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                      className={`p-2 rounded-lg border-2 ${
                        formData.icon === iconName
                          ? 'border-secondary bg-secondary/10'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <IconComp className="w-4 h-4 mx-auto" />
                    </button>
                  );
                })}
            </div>
          </div>


          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>
        </form>
        <div className="p-6 pt-0">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Delete Category</h3>
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {categories.map(cat => {
              const IconDel = (Icons as any)[cat.icon] || Icons.Folder;
              return (
                <li key={cat.main} className="flex justify-between items-center bg-white/60 dark:bg-gray-700/50 px-3 py-1 rounded">
                  <div className="flex items-center space-x-2">
                    <IconDel className="w-4 h-4" />
                    <span>{cat.main}</span>
                  </div>
                  <button type="button" onClick={() => onDelete(cat.main)} className="text-red-600 hover:underline text-sm">Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
