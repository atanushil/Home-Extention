"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function MakeShortcut({ onClose, editShortcut }) {
  const [open, setOpen] = useState(true);
  const [shortcutName, setShortcutName] = useState("");
  const [shortcutLink, setShortcutLink] = useState("");

  useEffect(() => {
    if (editShortcut) {
      setShortcutName(editShortcut.name);
      setShortcutLink(editShortcut.link);
    } else {
      setShortcutName("");
      setShortcutLink("");
    }
  }, [editShortcut]);

  const handleAddShortcut = () => {
    if (shortcutName && shortcutLink) {
      if (editShortcut) {
        // Handle the logic for editing the shortcut
        console.log(`Editing shortcut: ${shortcutName} - ${shortcutLink}`);
      } else {
        // Handle the logic for adding the shortcut
        console.log(`Adding shortcut: ${shortcutName} - ${shortcutLink}`);
      }
      setOpen(false);
      onClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const isDisabled = !shortcutName || !shortcutLink;

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white/30 backdrop-blur-sm text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-slate-600 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-white"
                  >
                    {editShortcut ? "Edit Shortcut" : "Add Shortcut"}
                  </DialogTitle>
                  <div className="w-full">
                    <label htmlFor="name" className="text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      value={shortcutName}
                      onChange={(e) => setShortcutName(e.target.value)}
                      className="w-full py-1 px-2 rounded-t-lg bg-white/30 backdrop-blur-sm text-white"
                    />
                    <label htmlFor="link" className="text-white">
                      URL
                    </label>
                    <input
                      type="url"
                      required
                      value={shortcutLink}
                      onChange={(e) => setShortcutLink(e.target.value)}
                      className="w-full py-1 px-2 rounded-t-lg bg-white/30 backdrop-blur-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleAddShortcut}
                disabled={isDisabled}
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto ${
                  isDisabled
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              >
                Done
              </button>
              <button
                type="button"
                data-autofocus
                onClick={handleClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
