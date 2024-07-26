import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function Items({
  categories,
  onEditCategory,
  onDeleteCategory,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let timer;
    if (selectedCategory !== null) {
      timer = setTimeout(() => {
        setSelectedCategory(null);
      }, 5000); // Hide icons after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const handleClick = (index) => {
    setSelectedCategory(index);
  };

  return (
    <div className="flex gap-2">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center border w-fit px-2 rounded-full my-2 backdrop-blur-sm bg-white/30 cursor-pointer"
          onClick={() => handleClick(index)}
        >
          <div className="pr-2">{category}</div>
          {selectedCategory === index && (
            <div className="flex items-center gap-1">
              <FaRegEdit
                size={16}
                color="white"
                onClick={() => onEditCategory(category)}
                className="cursor-pointer"
              />
              <MdDeleteForever
                size={18}
                color="white"
                onClick={() => onDeleteCategory(category)}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
