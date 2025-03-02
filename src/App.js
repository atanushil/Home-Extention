import React, { useState, useEffect, useCallback } from "react";
import Weather from "./components/Weather/Weather";
import TimeDate from "./components/TimeDate/TimeDate";
import SearchBar from "./components/Search/SearchBar";
import Categories from "./components/Categories/Categories";
import Shortcuts from "./components/Shortcut/Shortcuts";
import MakeShortcut from "./components/Shortcut/items/MakeShortcut";
import { getCategories, getShortcuts } from "./Data/LocalDataManager";
import { Panel } from "./components/Right-Panel/Panel";
import "./index.css";
import InfiniteSlider from "./components/Slider/InfiniteSlider";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shortcuts, setShortcuts] = useState([]);
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [editShortcut, setEditShortcut] = useState(null);
  const [backgroundDataUrl, setBackgroundDataUrl] = useState("");

  useEffect(() => {
    const categories = getCategories();
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, []);

  const fetchShortcuts = useCallback(() => {
    if (selectedCategory) {
      const fetchedShortcuts = getShortcuts(selectedCategory);
      setShortcuts(fetchedShortcuts);
    } else {
      setShortcuts([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchShortcuts();
  }, [fetchShortcuts]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleShortcutChange = useCallback(() => {
    fetchShortcuts();
  }, [fetchShortcuts]);

  const handleCloseModal = () => {
    setEditShortcut(null);
    setShowShortcutModal(false);
  };

  useEffect(() => {
    const intervalId = setInterval(handleShortcutChange, 1000);
    return () => clearInterval(intervalId);
  }, [handleShortcutChange]);

  useEffect(() => {
    // Load the background data URL from local storage on mount
    const storedBackgroundDataUrl = localStorage.getItem("backgroundDataUrl");
    if (storedBackgroundDataUrl) {
      setBackgroundDataUrl(storedBackgroundDataUrl);
    }
  }, []);

  const handleFileUpload = (dataUrl) => {
    // Store the data URL in local storage
    localStorage.setItem("backgroundDataUrl", dataUrl);
    // Update the background data URL state
    setBackgroundDataUrl(dataUrl);
  };

  return (
    <div
      className="w-full h-[100vh] flex flex-col lg:flex-row items-center bg-grey-500 lg:items-stretch "
      style={{
        backgroundImage: backgroundDataUrl ? `url(${backgroundDataUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="w-10/12 md:w-10/12 lg:w-1/4 xl:w-1/5 z-0 h-fit mx-8 my-2 flex rounded-md flex-col gap-3 sm:mt-2 md:mt-4 lg:mt-8 xl:mt-8 2xl:mt-8">
        // <TimeDate bgColor="bg-white/30" />
        // <Weather bgColor="bg-white/30" />
        <InfiniteSlider />
      </section>
      <main className="lg:w-9/12 xl:min-w-4/5 2xl:w-9/12 w-10/12 lg:h-3/5 sm:h-3/5 md:h-3/5 my-0 sm:my-8 overflow-auto flex flex-col items-center">
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="my-2 flex flex-col gap-2 overflow-x-auto overflow-y-hidden h-fit w-full">
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
      <section className="mt-8 px-2">
        <Panel setBackgroundUrl={handleFileUpload} />
      </section>

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
