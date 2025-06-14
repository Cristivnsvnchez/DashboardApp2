import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Menu, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { PlatformCard } from './components/PlatformCard';
import { AddPlatformModal } from './components/AddPlatformModal';
import { EditPlatformModal } from './components/EditPlatformModal';
import { FilterSidebar } from './components/FilterSidebar';
import { AddCategoryModal } from './components/AddCategoryModal';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddSubCategoryModalOpen, setIsAddSubCategoryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [platformToEdit, setPlatformToEdit] = useState<Platform | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
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
      const matchesSearch = !searchQuery || 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesMainCategory && matchesSubCategory && matchesSearch;
    });
  }, [platforms, selectedMainCategory, selectedSubCategory, searchQuery]);

  const handleAddPlatform = (newPlatform: Omit<Platform, 'id'>) => {
    const platform: Platform = {
      ...newPlatform,
      id: Date.now().toString()
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
    setSearchQuery('');
  };

  const handleMainCategoryChange = (category: string) => {
    setSelectedMainCategory(category);
    setSelectedSubCategory('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-300 to-blue-500 dark:from-gray-800 dark:via-gray-900 dark:to-black flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <FilterSidebar
          categories={categories}
          selectedMainCategory={selectedMainCategory}
          selectedSubCategory={selectedSubCategory}
          searchQuery={searchQuery}
          onMainCategoryChange={handleMainCategoryChange}
          onSubCategoryChange={setSelectedSubCategory}
          onSearchChange={setSearchQuery}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Mobile Sidebar */}
      <FilterSidebar
        categories={categories}
        selectedMainCategory={selectedMainCategory}
        selectedSubCategory={selectedSubCategory}
        searchQuery={searchQuery}
        onMainCategoryChange={handleMainCategoryChange}
        onSubCategoryChange={setSelectedSubCategory}
        onSearchChange={setSearchQuery}
        onClearFilters={handleClearFilters}
        isMobile
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/70 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <LayoutDashboard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Platform Dashboard</h1>
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
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Platform</span>
                </button>
                <button
                  onClick={() => setIsAddCategoryModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Category</span>
                </button>
                <button
                  onClick={() => setIsAddSubCategoryModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Sub Category</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {/* Active Filters */}
          {(selectedMainCategory || selectedSubCategory || searchQuery) && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-800 font-medium">Active filters:</span>
                  {searchQuery && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      Search: "{searchQuery}"
                    </span>
                  )}
                  {selectedMainCategory && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {selectedMainCategory}
                    </span>
                  )}
                  {selectedSubCategory && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {selectedSubCategory}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleClearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Platform Grid */}
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
                  {searchQuery || selectedMainCategory || selectedSubCategory
                    ? 'Try adjusting your filters or search query.'
                    : 'Get started by adding your first platform.'}
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Platform</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Platform Modal */}
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