import React, { useState, useEffect } from "react";
import {
  addShortcutToCategory,
  updateShortcut,
} from "../../../Data/LocalDataManager";

export default function MakeShortcut({
  onClose,
  setEditShortcut,
  setIsMakeShortcutOpen,
  editShortcut,
  selectedCategory,
  onShortcutChange
}) {
  const [name, setName] = useState(editShortcut ? editShortcut.name : "");
  const [link, setLink] = useState(editShortcut ? editShortcut.link : "");

  useEffect(() => {
    if (editShortcut) {
      setName(editShortcut.name);
      setLink(editShortcut.link);
    } else {
      setName("");
      setLink("");
    }
  }, [editShortcut]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editShortcut) {

      updateShortcut(selectedCategory, editShortcut.name, { name, link });
    } else {

      addShortcutToCategory(selectedCategory, { name, link });
    }
    onShortcutChange(); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50">
      <div className="bg-white/50 p-4 rounded shadow-lg lg:w-[30%] backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4 text-white">
          {editShortcut ? "Edit Shortcut" : "Add Shortcut"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white uppercase">
              Name
            </label>
            <input
              type="text"
              placeholder="Example"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-2  placeholder:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white uppercase">
              URL
            </label>
            <input
              type="url"
              value={link}
              placeholder="https://example.com"
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-2 placeholder:text-sm"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setEditShortcut(null); // Optional: Reset edit shortcut
                setIsMakeShortcutOpen(false); // Close the modal
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-[#d78376]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={!name || !link}
            >
              {editShortcut ? "Save Changes" : "Add Shortcut"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
