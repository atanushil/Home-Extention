import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function Items({
  categories,
  onEditCategory,
  onDeleteCategory,
  onCategoryClick,
}) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [iconsVisible, setIconsVisible] = useState(true);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryIndex(0); 
    }
  }, [categories]);

  useEffect(() => {
    let timer;
    if (iconsVisible) {
      timer = setTimeout(() => {
        setIconsVisible(false); 
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [iconsVisible]);

  const handleClick = (index) => {
    setSelectedCategoryIndex(index);
    setIconsVisible(true); 
    if (onCategoryClick) {
      onCategoryClick(categories[index]);
    }
  };

  const handleEditClick = (e, category) => {
    e.stopPropagation();
    onEditCategory(category);
  };

  const handleDeleteClick = (e, category) => {
    e.stopPropagation();
    onDeleteCategory(category);
  };

  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`flex items-center justify-between border w-fit h-6 px-4 rounded-full my-2 backdrop-blur-md cursor-pointer ${
            selectedCategoryIndex === index
              ? "opacity-100 bg-white/30 border border-black"
              : "opacity-50 bg-white/30 hover:opacity-100"
          }`}
          onClick={() => handleClick(index)}
        >
          <div className="flex items-center pr-2 whitespace-nowrap">
            {category}
          </div>
          {selectedCategoryIndex === index && iconsVisible && (
            <div className="flex items-center gap-1">
              <FaRegEdit
                size={16}
                color={`black hover:blue`}
                onClick={(e) => handleEditClick(e, category)}
                className="cursor-pointer "
              />
              <MdDeleteForever
                size={18}
                color={`black hover:red`}
                onClick={(e) => handleDeleteClick(e, category)}
                className="cursor-pointer "
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
