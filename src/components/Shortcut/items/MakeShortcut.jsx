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
      // Update the existing shortcut
      updateShortcut(selectedCategory, editShortcut.name, { name, link });
    } else {
      // Add a new shortcut
      addShortcutToCategory(selectedCategory, { name, link });
    }
    onShortcutChange(); // Call the function to handle the change
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {editShortcut ? "Edit Shortcut" : "Add Shortcut"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
