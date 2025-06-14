import React, { useState, useEffect, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Platform, Category } from '../types';

interface AddPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (platform: Omit<Platform, 'id'>) => void;
  onDelete: (id: string) => void;
  platforms: Platform[];
  categories: Category[];
}

const availableIcons = [
  'Globe', 'Code', 'FileText', 'BookOpen', 'Play', 'Music', 'Github', 'Figma',
  'Camera', 'Palette', 'Monitor', 'Smartphone', 'Headphones', 'Calendar',
  'MessageCircle', 'Mail', 'Users', 'Settings', 'Star', 'Heart'
];

export const AddPlatformModal: React.FC<AddPlatformModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  onDelete,
  platforms,
  categories
}) => {
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Omit<Platform, 'id'>>({
    name: '',
    url: '',
    description: '',
    mainCategory: '',
    subCategory: '',
    icon: 'Globe',
    color: 'primary'
  });

  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    firstFieldRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleMainCategoryChange = (mainCategory: string) => {
    const category = categories.find(cat => cat.main === mainCategory);
    setAvailableSubCategories(category?.subs || []);
    setFormData(prev => ({
      ...prev,
      mainCategory,
      subCategory: '',
      color: category?.color || 'primary'
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.url && formData.mainCategory) {
      onAdd(formData);
      setFormData({
        name: '',
        url: '',
        description: '',
        mainCategory: '',
        subCategory: '',
        icon: 'Globe',
        color: 'primary'
      });
      setAvailableSubCategories([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Platform</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Platform Name *
              </label>
              <input
                ref={firstFieldRef}
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="e.g., GitHub"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                URL *
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="https://example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              placeholder="Brief description of the platform..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Main Category *
              </label>
              <select
                value={formData.mainCategory}
                onChange={(e) => handleMainCategoryChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.main} value={category.main}>
                    {category.main}
                  </option>
                ))}
              </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Sub Category
              </label>
              <select
                value={formData.subCategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                disabled={!formData.mainCategory}
              >
                <option value="">None</option>
                {availableSubCategories.map(sub => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              Icon
            </label>
            <div className="grid grid-cols-8 gap-2">
              {availableIcons.map(iconName => {
                const IconComponent = (Icons as any)[iconName];
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({ ...prev, icon: iconName }))
                    }
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                      formData.icon === iconName
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                    aria-label={iconName}
                  >
                    <IconComponent className="w-5 h-5 mx-auto" />
                    <span className="sr-only">{iconName}</span>
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
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Platform</span>
            </button>
          </div>
        </form>
        <div className="p-6 pt-0">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Delete Platform</h3>
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {platforms.map(p => (
              <li key={p.id} className="flex justify-between items-center bg-white/60 dark:bg-gray-700/50 px-3 py-1 rounded">
                <span>{p.name}</span>
                <button type="button" onClick={() => onDelete(p.id)} className="text-red-600 hover:underline text-sm">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};