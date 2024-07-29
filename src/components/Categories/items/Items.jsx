import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function Items({ categories, onEditCategory, onDeleteCategory, onCategoryClick }) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  useEffect(() => {
    let timer;
    if (selectedCategoryIndex !== null) {
      timer = setTimeout(() => {
        setSelectedCategoryIndex(null);
      }, 5000); // Hide icons after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [selectedCategoryIndex]);

  const handleClick = (index) => {
    setSelectedCategoryIndex(index);
    if (onCategoryClick) {
      onCategoryClick(categories[index]); // Notify parent component about the clicked category
    }
  };

  const handleEditClick = (e, category) => {
    e.stopPropagation(); // Prevents triggering the category click event
    onEditCategory(category);
  };

  const handleDeleteClick = (e, category) => {
    e.stopPropagation(); // Prevents triggering the category click event
    onDeleteCategory(category);
  };

  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center justify-between border w-fit h-6 px-4 rounded-full my-2 backdrop-blur-sm bg-white/30 cursor-pointer"
          onClick={() => handleClick(index)}
        >
          <div className="flex items-center pr-2 whitespace-nowrap">{category}</div>
          {selectedCategoryIndex === index && (
            <div className="flex items-center gap-1">
              <FaRegEdit
                size={16}
                color="white"
                onClick={(e) => handleEditClick(e, category)}
                className="cursor-pointer"
              />
              <MdDeleteForever
                size={18}
                color="white"
                onClick={(e) => handleDeleteClick(e, category)}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
