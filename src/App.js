import React, { useState, useEffect, useCallback } from "react";
import Weather from "./components/Weather/Weather";
import TimeDate from "./components/TimeDate/TimeDate";
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
    const categories = getCategories();
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

  const handleShortcutChange = useCallback(() => {
    if (selectedCategory) {
      const fetchedShortcuts = getShortcuts(selectedCategory);
      setShortcuts(fetchedShortcuts);
    }
  }, [selectedCategory]);

  const handleCloseModal = () => {
    setEditShortcut(null);
    setShowShortcutModal(false);
  };

  useEffect(() => {
    // Set up interval to refresh shortcuts every second
    const intervalId = setInterval(() => {
      handleShortcutChange();
    }, 1000); // 1000 milliseconds = 1 second

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [handleShortcutChange]);

  return (
    <div className="w-full h-[100vh] sm:flex-row flex flex-col items-center sm:items-stretch backdrop-brightness-50 bg-white/30">
      <section className="w-4/12 max-w-[20vw] h-fit mx-8 my-4 flex flex-col gap-3 mt-8">
        <TimeDate  />
        {/* <Weather /> */}
        <Note />
      </section>
      <main className="w-[70vw] max-h-[80vh] my-0 sm:my-8">
        <div>
          <SearchBar />
        </div>
        <div className="my-2 overflow-x-auto flex flex-col gap-2 scrollbar-hidden">
          <Categories onCategoryClick={handleCategoryClick} />
          {selectedCategory && (
            <Shortcuts
              shortcuts={shortcuts}
              selectedCategory={selectedCategory}
              setEditShortcut={setEditShortcut}
              setIsMakeShortcutOpen={setShowShortcutModal}
              onShortcutChange={handleShortcutChange}
            />
          )}
        </div>
      </main>
      {showShortcutModal && (
        <MakeShortcut
          onClose={handleCloseModal}
          setEditShortcut={setEditShortcut}
          setIsMakeShortcutOpen={setShowShortcutModal}
          editShortcut={editShortcut}
          selectedCategory={selectedCategory}
          onShortcutChange={handleShortcutChange}
        />
      )}
    </div>
  );
}
