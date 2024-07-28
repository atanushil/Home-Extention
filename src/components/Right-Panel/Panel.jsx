import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import ToolTip from "./ToolTip";
import { IoMdStarOutline } from "react-icons/io";
import { RiFolderDownloadLine } from "react-icons/ri";
import { IoExtensionPuzzle } from "react-icons/io5";
import { FaStore } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { RiHistoryFill } from "react-icons/ri";

const openLink = (url) => {
  // Since Chrome internal URLs might be restricted, ensure to test this behavior.
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Failed to open link:', error);
  }
};

export default function Panel() {
  return (
    <div className="flex items-center flex-col">
      <ToggleSwitch />
      <ul className="my-16 flex flex-col gap-3">
        <li className="group border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center p-2 cursor-pointer">
          <div 
            onClick={() => openLink('chrome://bookmarks/')} 
            className="flex items-center justify-center"
          >
            <ToolTip content={"Bookmarks"} direction="left">
              <IoMdStarOutline className="text-white group-hover:text-slate-500 transition-colors duration-300" size={24} />
            </ToolTip>
          </div>
        </li>
        <li className="group border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center p-2 cursor-pointer">
          <div 
            onClick={() => openLink('chrome://history/')} 
            className="flex items-center justify-center"
          >
            <ToolTip content={"History"} direction="left">
              <RiHistoryFill className="text-white group-hover:text-slate-500 transition-colors duration-300" size={24} />
            </ToolTip>
          </div>
        </li>
        <li className="group border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center p-2 cursor-pointer">
          <div 
            onClick={() => openLink('chrome://downloads/')} 
            className="flex items-center justify-center"
          >
            <ToolTip content={"Downloads"} direction="left">
              <RiFolderDownloadLine className="text-white group-hover:text-slate-500 transition-colors duration-300" size={24} />
            </ToolTip>
          </div>
        </li>
        <li className="group border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center p-2 cursor-pointer">
          <div 
            onClick={() => openLink('chrome://extensions/')} 
            className="flex items-center justify-center"
          >
            <ToolTip content={"Extensions"} direction="left">
              <IoExtensionPuzzle className="text-white group-hover:text-slate-500 transition-colors duration-300" size={24} />
            </ToolTip>
          </div>
        </li>
        <li className="group border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center p-2 cursor-pointer">
          <div 
            onClick={() => openLink('https://chromewebstore.google.com/')} 
            className="flex items-center justify-center"
          >
            <ToolTip content={"Google Web Store"} direction="left">
              <FaStore className="text-white group-hover:text-slate-500 transition-colors duration-300" size={24} />
            </ToolTip>
          </div>
        </li>
        <li className="group border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center p-2 cursor-pointer">
          <div 
            onClick={() => openLink('chrome://settings/')} 
            className="flex items-center justify-center"
          >
            <ToolTip content={"Settings"} direction="left">
              <IoSettings className="text-white group-hover:text-slate-500 transition-colors duration-300" size={24} />
            </ToolTip>
          </div>
        </li>
      </ul>
    </div>
  );
}
