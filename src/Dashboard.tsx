import React, { useState, useMemo, useEffect } from 'react';
import { Plus, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { PlatformCard } from './components/PlatformCard';
import { AddPlatformModal } from './components/AddPlatformModal';
import { AddCategoryModal } from './components/AddCategoryModal';
import { FilterDropdown } from './components/FilterDropdown';
import { EditPlatformModal } from './components/EditPlatformModal';
import { AddSubCategoryModal } from './components/AddSubCategoryModal';
import { Platform, Category } from './types';
import { defaultPlatforms, categories as initialCategories } from './data/platforms';

function App() {
  const [platforms, setPlatforms] = useState<Platform[]>(defaultPlatforms);
  const [categories, setCategories] = useState<Category[]>(() => {
    const stored = localStorage.getItem('categories');
    return stored ? JSON.parse(stored) : initialCategories;
  });
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddSubCategoryModalOpen, setIsAddSubCategoryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [platformToEdit, setPlatformToEdit] = useState<Platform | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const filteredPlatforms = useMemo(() => {
    return platforms.filter(platform => {
      const matchesMainCategory = !selectedMainCategory || platform.mainCategory === selectedMainCategory;
      const matchesSubCategory = !selectedSubCategory || platform.subCategory === selectedSubCategory;
      return matchesMainCategory && matchesSubCategory;
    });
  }, [platforms, selectedMainCategory, selectedSubCategory]);

  const handleAddPlatform = (newPlatform: Omit<Platform, 'id'>) => {
    const platform: Platform = {
      ...newPlatform,
      id: Date.now().toString(),
    };
    setPlatforms(prev => [...prev, platform]);
  };

  const handleAddCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const handleAddSubCategory = (main: string, sub: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.main === main && !cat.subs.includes(sub)
          ? { ...cat, subs: [...cat.subs, sub] }
          : cat
      )
    );
  };

  const handleUpdatePlatform = (updated: Platform) => {
    setPlatforms(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const handleClearFilters = () => {
    setSelectedMainCategory('');
    setSelectedSubCategory('');
  };

  const handleMainCategoryChange = (category: string) => {
    setSelectedMainCategory(category);
    setSelectedSubCategory('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-accent)] to-[var(--color-primary)] dark:from-gray-800 dark:via-gray-900 dark:to-black flex">
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white/80 dark:bg-gray-800/70 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <LayoutDashboard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Dashboard</h1>
                    <p className="text-sm text-gray-600">
                      {filteredPlatforms.length} of {platforms.length} platforms
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary/40 backdrop-blur-md text-primary dark:text-white rounded-lg hover:bg-primary/50 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Platform</span>
                </button>
                <button
                  onClick={() => setIsAddCategoryModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary/40 backdrop-blur-md text-secondary dark:text-white rounded-lg hover:bg-secondary/50 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Category</span>
                </button>
                <button
                  onClick={() => setIsAddSubCategoryModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent/40 backdrop-blur-md text-accent dark:text-white rounded-lg hover:bg-accent/50 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Sub Category</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <FilterDropdown
              categories={categories}
              selectedMainCategory={selectedMainCategory}
              selectedSubCategory={selectedSubCategory}
              onMainCategoryChange={handleMainCategoryChange}
              onSubCategoryChange={setSelectedSubCategory}
              onClearFilters={handleClearFilters}
            />
          </div>

          {(selectedMainCategory || selectedSubCategory) && (
            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-primary font-medium">Active filters:</span>
                  {selectedMainCategory && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                      {selectedMainCategory}
                    </span>
                  )}
                  {selectedSubCategory && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                      {selectedSubCategory}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleClearFilters}
                  className="text-primary hover:text-primary/80 font-medium text-sm"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {filteredPlatforms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlatforms.map(platform => (
                <PlatformCard
                  key={platform.id}
                  platform={platform}
                  onEdit={p => {
                    setPlatformToEdit(p);
                    setIsEditModalOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LayoutDashboard className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No platforms found</h3>
                <p className="text-gray-600 mb-6">
                  {selectedMainCategory || selectedSubCategory
                    ? 'Try adjusting your filters.'
                    : 'Get started by adding your first platform.'}
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Platform</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <AddPlatformModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPlatform}
        categories={categories}
      />
      <EditPlatformModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setPlatformToEdit(null);
        }}
        onSave={handleUpdatePlatform}
        categories={categories}
        platform={platformToEdit}
      />
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAdd={handleAddCategory}
      />
      <AddSubCategoryModal
        isOpen={isAddSubCategoryModalOpen}
        onClose={() => setIsAddSubCategoryModalOpen(false)}
        categories={categories}
        onAdd={handleAddSubCategory}
      />
    </div>
  );
}

export default App;
