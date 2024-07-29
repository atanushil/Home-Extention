import React, { useState } from "react";
import ShortcutItem from "./items/ShortcutItem";
import MakeShortcut from "./items/MakeShortcut";
import AddShortcuts from "./items/AddShortcuts";
import { deleteShortcut } from "../../Data/LocalDataManager";

export default function Shortcuts({ shortcuts, selectedCategory }) {
  const [isMakeShortcutOpen, setIsMakeShortcutOpen] = useState(false);
  const [editShortcut, setEditShortcut] = useState(null);

  // Function to derive favicon URL from the base URL
  const getFaviconUrl = (url) => {
    const urlObject = new URL(url);
    return `${urlObject.origin}/favicon.ico`;
  };

  // Function to truncate long names
  const truncateName = (name) =>
    name.length > 10 ? `${name.substring(0, 10)}...` : name;

  // Function to handle editing a shortcut
  const handleEditShortcut = (shortcut) => {
    setEditShortcut(shortcut);
    setIsMakeShortcutOpen(true);
  };

  const handleRemove = (name) => {
    deleteShortcut(selectedCategory, name);
    // Add logic to refresh the shortcut list if necessary
    console.log("Shortcut", name, "deleted from", selectedCategory, "category");
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 max-h-[50vh] overflow-y-auto h-fit justify-between lg:justify-start">
        {shortcuts.map((shortcut, index) => {
          const key = shortcut.id ? shortcut.id : `fallback-key-${index}`; // Fallback key if id is undefined

          return (
            <div className="self-start justify-start rounded-md place-self-start" key={key}>
              <ShortcutItem
                onRemove={() => handleRemove(shortcut.name)}
                faviconLink={getFaviconUrl(shortcut.link)}
                name={truncateName(shortcut.name)}
                link={shortcut.link}
                onEdit={() => handleEditShortcut(shortcut)}
              />
            </div>
          );
        })}
        <AddShortcuts
          onClick={() => setIsMakeShortcutOpen(true)}
          name={"Add Shortcut"}
        />
        {isMakeShortcutOpen && (
          <MakeShortcut
            onClose={() => setIsMakeShortcutOpen(false)}
            setEditShortcut={setEditShortcut}
            setIsMakeShortcutOpen={setIsMakeShortcutOpen}
            editShortcut={editShortcut}
            selectedCategory={selectedCategory}
            onShortcutChange={() => {
              // Add logic to refresh the shortcut list if necessary
              setIsMakeShortcutOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
