import React, { useState } from "react";
import ShortcutItem from "./items/ShortcutItem";
import MakeShortcut from "./items/MakeShortcut";
import AddShortcuts from "./items/AddShortcuts";

export default function Shortcuts({shortcuts}) {
  const [isMakeShortcutOpen, setIsMakeShortcutOpen] = useState(false);
  const [editShortcut, setEditShortcut] = useState(null);

  // Function to derive favicon URL from the base URL
  const getFaviconUrl = (url) => {
    const urlObject = new URL(url);
    return `${urlObject.origin}/favicon.ico`;
  };

  // Function to truncate long names
  const truncateName = (name) => (name.length > 10 ? `${name.substring(0, 10)}...` : name);

  // Function to handle editing a shortcut
  const handleEditShortcut = (shortcut) => {
    setEditShortcut(shortcut);
    setIsMakeShortcutOpen(true);
  };

  // Shortcuts array with base URLs
  const onRemove=()=>{
    alert("es")
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2  max-h-fit justify-center overflow-y-auto h-fit">
        {shortcuts.map((shortcut, index) => (
          <div className="self-start justify-start place-self-start">
          <ShortcutItem
            onRemove={onRemove}
            key={index}
            faviconLink={getFaviconUrl(shortcut.link)}
            name={truncateName(shortcut.name)}
            link={shortcut.link}
            onEdit={() => handleEditShortcut(shortcut)}
          />
          </div>
        ))}
        <AddShortcuts onClick={() => setIsMakeShortcutOpen(true)} name={"Add Shortcut"} />
        {isMakeShortcutOpen && (
          <MakeShortcut
            onClose={() => setIsMakeShortcutOpen(false)}
            editShortcut={editShortcut}
          />
        )}
      </div>
    </div>
  );
}
