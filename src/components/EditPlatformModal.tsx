import React, { useState, useEffect } from 'react';
import { X, Pencil } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Platform, Category } from '../types';

interface EditPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (platform: Platform) => void;
  categories: Category[];
  platform: Platform | null;
}

const availableIcons = [
  'Globe',
  'Code',
  'FileText',
  'BookOpen',
  'Play',
  'Music',
  'Github',
  'Figma',
  'Camera',
  'Palette',
  'Monitor',
  'Smartphone',
  'Headphones',
  'Calendar',
  'MessageCircle',
  'Mail',
  'Users',
  'Settings',
  'Star',
  'Heart'
];

export const EditPlatformModal: React.FC<EditPlatformModalProps> = ({
  isOpen,
  onClose,
  onSave,
  categories,
  platform
}) => {
  const [formData, setFormData] = useState<Platform | null>(platform);
  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([]);

  useEffect(() => {
    setFormData(platform);
    if (platform) {
      const category = categories.find(cat => cat.main === platform.mainCategory);
      setAvailableSubCategories(category?.subs || []);
    }
  }, [platform, categories]);

  const handleMainCategoryChange = (mainCategory: string) => {
    const category = categories.find(cat => cat.main === mainCategory);
    setAvailableSubCategories(category?.subs || []);
    setFormData(prev =>
      prev ? { ...prev, mainCategory, subCategory: '', color: category?.color || 'blue' } : prev
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    if (formData.name && formData.url && formData.mainCategory) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Platform</h2>
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
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => (prev ? { ...prev, name: e.target.value } : prev))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                onChange={e => setFormData(prev => (prev ? { ...prev, url: e.target.value } : prev))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              onChange={e => setFormData(prev => (prev ? { ...prev, description: e.target.value } : prev))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
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
                onChange={e => handleMainCategoryChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                onChange={e => setFormData(prev => (prev ? { ...prev, subCategory: e.target.value } : prev))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    onClick={() => setFormData(prev => (prev ? { ...prev, icon: iconName } : prev))}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                      formData.icon === iconName
                        ? 'border-blue-500 bg-blue-50'
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
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center space-x-2"
            >
              <Pencil className="w-4 h-4" />
              <span>Update Platform</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
