import React from 'react';
import { MdAdd } from "react-icons/md";

export default function AddCategories({ onAddCategory }) {
  return (
    <div
      className='flex items-center my-2 bg-red-200 gap-1 w-fit rounded-full cursor-pointer px-2'
      onClick={onAddCategory}
    >
      <p>Categories</p>
      <MdAdd />
    </div>
  );
}
