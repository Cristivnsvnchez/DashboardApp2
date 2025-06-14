import { MsalProvider, useIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Sun, Moon } from 'lucide-react';
import { PlatformCard } from './components/PlatformCard';
import { AddPlatformModal } from './components/AddPlatformModal';
import { AddCategoryModal } from './components/AddCategoryModal';
import { FilterDropdown } from './components/FilterDropdown';
import { EditPlatformModal } from './components/EditPlatformModal';
import { AddSubCategoryModal } from './components/AddSubCategoryModal';
import { Toast } from './components/Toast';
import { SearchInput } from './components/SearchInput';
import { SideBanner } from './components/SideBanner';
import { Platform, Category } from './types';
import { defaultPlatforms, categories as initialCategories } from './data/platforms';

const msalInstance = new PublicClientApplication(msalConfig);

function AppContent() {
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
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const isAuthenticated = useIsAuthenticated();

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
      const matchesSearch = platform.name.toLowerCase().includes(search.toLowerCase());
      return matchesMainCategory && matchesSubCategory && matchesSearch;
    });
  }, [platforms, selectedMainCategory, selectedSubCategory, search]);

  const handleAddPlatform = (newPlatform: Omit<Platform, 'id'>) => {
    const platform: Platform = {
      ...newPlatform,
      id: Date.now().toString(),
    };
    setPlatforms(prev => [...prev, platform]);
    setToastMessage('Platform added');
  };

  const handleAddCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
    setToastMessage('Category added');
  };

  const handleAddSubCategory = (main: string, sub: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.main === main && !cat.subs.includes(sub)
          ? { ...cat, subs: [...cat.subs, sub] }
          : cat
      )
    );
    setToastMessage('Sub category added');
  };

  const handleDeletePlatform = (id: string) => {
    setPlatforms(prev => prev.filter(p => p.id !== id));
    setToastMessage('Platform deleted');
  };

  const handleDeleteCategory = (main: string) => {
    setCategories(prev => prev.filter(c => c.main !== main));
    setToastMessage('Category deleted');
  };

  const handleDeleteSubCategory = (main: string, sub: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.main === main
          ? { ...cat, subs: cat.subs.filter(s => s !== sub) }
          : cat
      )
    );
    setToastMessage('Sub category deleted');
  };

  const handleUpdatePlatform = (updated: Platform) => {
    setPlatforms(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    setToastMessage('Platform updated');
  };

  const handleClearFilters = () => {
    setSelectedMainCategory('');
    setSelectedSubCategory('');
  };

  const handleMainCategoryChange = (category: string) => {
    setSelectedMainCategory(category);
    setSelectedSubCategory('');
  };

  if (!isAuthenticated) return <LoginPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-accent)] to-[var(--color-primary)] dark:from-gray-800 dark:via-gray-900 dark:to-black flex">
      <SideBanner
        onAddPlatform={() => setIsAddModalOpen(true)}
        onAddCategory={() => setIsAddCategoryModalOpen(true)}
        onAddSubCategory={() => setIsAddSubCategoryModalOpen(true)}
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white/80 dark:bg-gray-800/70 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-600">
                  {filteredPlatforms.length} of {platforms.length} platforms
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  allPlatforms={platforms}
                  placeholder="Search..."
                  className="hidden md:block px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
                />
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 space-y-4">
            <SearchInput
              value={search}
              onChange={setSearch}
              allPlatforms={platforms}
              placeholder="Search..."
              className="md:hidden w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100"
            />
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
                    className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm"
                  >
                    Clear all filters
                  </button>
              </div>
            </div>
          )}

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
        </main>

        <AddPlatformModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddPlatform}
          onDelete={handleDeletePlatform}
          platforms={platforms}
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
          onDelete={handleDeleteCategory}
          categories={categories}
        />
        <AddSubCategoryModal
          isOpen={isAddSubCategoryModalOpen}
          onClose={() => setIsAddSubCategoryModalOpen(false)}
          categories={categories}
          onAdd={handleAddSubCategory}
          onDelete={handleDeleteSubCategory}
        />
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AppContent />
    </MsalProvider>
  );
}
