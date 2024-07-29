import React, { useState, useEffect, useCallback, useRef } from "react";
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
import { ChromePicker } from "react-color";



export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shortcuts, setShortcuts] = useState([]);
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [editShortcut, setEditShortcut] = useState(null);
  const [bgColor, setBgColor] = useState("#9ca3af"); // Default background color
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
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
    const intervalId = setInterval(handleShortcutChange, 1000);

    return () => clearInterval(intervalId);
  }, [handleShortcutChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full h-[100vh] flex flex-col lg:flex-row items-center lg:items-stretch backdrop-brightness-50"
      style={{ backgroundColor: bgColor }}
    >
      <section className="w-10/12 md:w-10/12 lg:w-1/4 xl:w-1/5 h-fit mx-8 my-2 flex rounded-md flex-col gap-3 sm:mt-2 md:mt-4 lg:mt-8 xl:mt-8 2xl:mt-8">
        <TimeDate />
        <Weather />
        <InfiniteSlider />
      </section>
      <main className="lg:w-9/12 xl:min-w-4/5 2xl:w-9/12 w-10/12 lg:h-3/5 sm:h-3/5 md:h-3/5 my-0 sm:my-8 overflow-auto flex flex-col items-center">
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="my-2 flex flex-col gap-2 overflow-x-auto overflow-y-hidden h-fit w-full">
          <Categories onCategoryClick={handleCategoryClick} />
          {selectedCategory && (
            <>
              <Shortcuts
                shortcuts={shortcuts}
                selectedCategory={selectedCategory}
                setEditShortcut={setEditShortcut}
                setIsMakeShortcutOpen={setShowShortcutModal}
                onShortcutChange={handleShortcutChange}
              />
            </>
          )}
        </div>
      </main>
      <section className="mt-8 px-2">
        <Panel />
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

      <div className="absolute top-0 right-0 ">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="h-[3vh] w-[3vw] rounded-sm border-2 border-black"
          style={{ backgroundColor: bgColor }}
        >
          {/* Button to toggle the color picker */}
        </button>
        {showPicker && (
          <div className="absolute top-8 right-0" ref={pickerRef}>
            <ChromePicker
              color={bgColor}
              onChangeComplete={(color) => setBgColor(color.hex)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
