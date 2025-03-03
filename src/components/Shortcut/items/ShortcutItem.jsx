import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export default function ShortcutItem({
  faviconLink,
  name,
  link,
  onEdit,
  onRemove,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [faviconError, setFaviconError] = useState(false);
  const optionsRef = useRef(null);

  const handleClick = () => {
    window.open(link, "_blank");
  };

  const handleShowOption = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    if (option === "Edit") {
      onEdit();
    } else if (option === "Remove") {
      onRemove(name); 
    }
    setShowOptions(false); 
  };

  const handleFaviconError = () => {
    setFaviconError(true);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-28 h-28 px-1 py-2 rounded-lg hover:backdrop-blur-sm   hover:bg-white/30 cursor-pointer group">
      <div className="absolute top-1 right-1 lg:hidden xl:hidden 2xl:hidden sm:block md:block group-hover:block">
        <BsThreeDotsVertical onClick={handleShowOption} />
      </div>
      {showOptions && (
        <div
          ref={optionsRef}
          className="absolute top-0 right-0 bg-white border rounded-lg shadow-lg p-2"
        >
          <div
            className="cursor-pointer flex justify-between items-center hover:bg-gray-100 p-1"
            onClick={() => handleOptionClick("Edit")}
          >
            Edit <CiEdit className="mr-2" />
          </div>
          <div
            className="cursor-pointer flex items-center justify-between hover:bg-gray-100 p-1"
            onClick={() => handleOptionClick("Remove")}
          >
            Remove <MdDeleteOutline className="mr-2" />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center h-full justify-center rounded-md">
        <div
          className="icon p-2 w-full flex justify-center  h-12"
          onClick={handleClick}
        >
          {faviconError ? (
            <div
              className="w-fit px-3 rounded-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-2xl font-bold"
              onClick={handleClick}
            >
              {name.charAt(0)}
            </div>
          ) : (
            <img
              src={faviconLink}
              alt={`${name} favicon`}
              className="h-full max-w-full  object-contain"
              onError={handleFaviconError}
              onClick={handleClick}
            />
          )}
        </div>
        <div
          className="text-sm text-center truncate w-full px-2"
          onClick={handleClick}
        >
          {name}
        </div>
      </div>
    </div>
  );
}
