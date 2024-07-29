import React, { useState } from "react";
import ShortcutItem from "./items/ShortcutItem";
import MakeShortcut from "./items/MakeShortcut";
import AddShortcuts from "./items/AddShortcuts";
import { deleteShortcut } from "../../Data/LocalDataManager";

export default function Shortcuts({ shortcuts, selectedCategory }) {
  const [isMakeShortcutOpen, setIsMakeShortcutOpen] = useState(false);
  const [editShortcut, setEditShortcut] = useState(null);


  const getFaviconUrl = (url) => {
    const urlObject = new URL(url);
    return `${urlObject.origin}/favicon.ico`;
  };


  const truncateName = (name) =>
    name.length > 10 ? `${name.substring(0, 10)}...` : name;


  const handleEditShortcut = (shortcut) => {
    setEditShortcut(shortcut);
    setIsMakeShortcutOpen(true);
  };

  const handleRemove = (name) => {
    deleteShortcut(selectedCategory, name);
    console.log("Shortcut", name, "deleted from", selectedCategory, "category");
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 max-h-[50vh] overflow-y-auto h-fit justify-between lg:justify-start">
        {shortcuts.map((shortcut, index) => {
          const key = shortcut.id ? shortcut.id : `fallback-key-${index}`; 

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

              setIsMakeShortcutOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
