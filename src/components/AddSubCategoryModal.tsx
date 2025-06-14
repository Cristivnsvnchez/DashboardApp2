import React, { useState, useEffect, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { Category } from '../types';

interface AddSubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAdd: (mainCategory: string, subCategory: string) => void;
  onDelete: (main: string, sub: string) => void;
}

export const AddSubCategoryModal: React.FC<AddSubCategoryModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAdd,
  onDelete
}) => {
  const firstFieldRef = useRef<HTMLSelectElement | null>(null);
  const [formData, setFormData] = useState<{ main: string; sub: string }>({
    main: '',
    sub: ''
  });

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
    if (!formData.main || !formData.sub.trim()) return;

    onAdd(formData.main, formData.sub.trim());
    setFormData({ main: '', sub: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Sub Category</h2>
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
              Category *
            </label>
            <select
              ref={firstFieldRef}
              value={formData.main}
              onChange={e => setFormData(prev => ({ ...prev, main: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.main} value={cat.main}>
                  {cat.main}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Sub Category Name *
            </label>
            <input
              type="text"
              value={formData.sub}
              onChange={e => setFormData(prev => ({ ...prev, sub: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="e.g., Collaboration"
              required
            />
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
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Sub Category</span>
            </button>
          </div>
        </form>
        <div className="p-6 pt-0">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Delete Sub Category</h3>
          {formData.main && (
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {categories
                .find(cat => cat.main === formData.main)?.subs.map(sub => (
                  <li key={sub} className="flex justify-between items-center bg-white/60 dark:bg-gray-700/50 px-3 py-1 rounded">
                    <span>{sub}</span>
                    <button type="button" onClick={() => onDelete(formData.main, sub)} className="text-red-600 hover:underline text-sm">Delete</button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
