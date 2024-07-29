import React, { useState } from "react";
import AddCategories from "./items/AddCategories";
import MakeCategories from "./items/MakeCategories";
import Items from "./items/Items";
import {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
} from "../../Data/LocalDataManager";

export default function Categories({ onCategoryClick }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [categories, setCategories] = useState(getCategories());

  const onEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setIsAdding(false);
  };

  const onDeleteCategory = (category) => {
    deleteCategory(category);
    setCategories(getCategories()); 
    setSelectedCategory(null)
  };

  const handleSaveCategory = (categoryName) => {
    if (selectedCategory) {
      editCategory(selectedCategory, categoryName);
    } else {
      addCategory(categoryName);
    }
    setCategories(getCategories()); 
    setSelectedCategory(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleAddCategoryClick = () => {
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleCategoryClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category); 
    }
  };

  const isMakeCategoryActive = isEditing || isAdding;

  return (
    <div className="flex gap-2  items-center border-b-slate-600 border-b-2 overflow-x-auto overflow-y-hidden h-fit">
      <Items
        categories={categories}
        onEditCategory={onEditCategory}
        onDeleteCategory={onDeleteCategory}
        onCategoryClick={handleCategoryClick} 
      />
      {(isEditing || isAdding) && (
        <MakeCategories
          category={isEditing ? selectedCategory : ""}
          onSaveCategory={handleSaveCategory}
          onClose={handleClose}
        />
      )}

      {!isMakeCategoryActive && (
        <AddCategories onAddCategory={handleAddCategoryClick} />
        
      )}
    </div>
  );
}
