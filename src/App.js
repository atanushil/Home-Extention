import React, { useState, useEffect } from "react";
import Weather from "./components/Weather/Weather";
import TimeDate from "./components/TIme&Date/TimeDate";
import Note from "./components/Note/Note";
import SearchBar from "./components/Search/SearchBar";
import Categories from "./components/Categories/Categories";
import Shortcuts from "./components/Shortcut/Shortcuts";
import MakeShortcut from "./components/Shortcut/items/MakeShortcut";
import { getCategories, getShortcuts } from "./Data/LocalDataManager";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shortcuts, setShortcuts] = useState([]);
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [editShortcut, setEditShortcut] = useState(null);

  useEffect(() => {
    // Fetch categories and set the first one as default
    const categories = getCategories(); // Fetch categories
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchedShortcuts = getShortcuts(selectedCategory);
      setShortcuts(fetchedShortcuts);
    } else {
      setShortcuts([]);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleShortcutChange = () => {
    if (selectedCategory) {
      const fetchedShortcuts = getShortcuts(selectedCategory);
      setShortcuts(fetchedShortcuts);
    }
  };

  const handleCloseModal = () => {
    setEditShortcut(null);
    setShowShortcutModal(false);
  };

  return (
    <div className="w-full h-[100vh] flex backdrop-brightness-50 bg-white/30">
      <section className="w-4/12 max-w-[20vw] h-fit mx-8 my-4 flex flex-col gap-3 mt-8">
        <TimeDate />
        <Weather /> {/* Weather component will not reload on category change */}
        <Note />
      </section>
      <main className="w-[70vw] max-h-[80vh] my-8">
        <div>
          <SearchBar />
        </div>
        <div className="my-2 overflow-x-auto flex flex-col gap-2 scrollbar-hidden">
          <Categories onCategoryClick={handleCategoryClick} />
          {selectedCategory && (
            <Shortcuts
              shortcuts={shortcuts}
              selectedCategory={selectedCategory}
              onEditShortcut={(shortcut) => {
                setEditShortcut(shortcut);
                setShowShortcutModal(true);
              }}
            />
          )}
        </div>
      </main>
      {showShortcutModal && (
        <MakeShortcut
          onClose={handleCloseModal}
          editShortcut={editShortcut}
          selectedCategory={selectedCategory}
          onShortcutChange={handleShortcutChange}
        />
      )}
    </div>
  );
}
