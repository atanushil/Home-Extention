import React from "react";
import AddCategories from "./items/AddCategories";
import MakeCategories from "./items/MakeCategories";
import Items from "./items/Items";

export default function Categories({ categories }) {
  const onEditCategory = () => {
    alert("edit");
  };

  const onDeleteCategory = () => {
    alert("delete");
  };

  const handleSaveCategory = (categoryName) => {
    alert(`Category saved: ${categoryName}`);
  };

  const handleClose = () => {
    alert("Category editing closed");
  };

  return (
    <div className="flex gap-2 items-center border-b-red-600 border-b-2">
      <AddCategories />
      <MakeCategories
        onSaveCategory={handleSaveCategory}
        onClose={handleClose}
      />
      <Items
        categories={categories}
        onEditCategory={onEditCategory}
        onDeleteCategory={onDeleteCategory}
      />
    </div>
  );
}
