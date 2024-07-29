import React from 'react';
import { MdAdd } from "react-icons/md";

export default function AddCategories({ onAddCategory }) {
  return (
    <div
      className='flex items-center my-2 bg-white/30 backdrop-blur-sm hover:bg-green-500 gap-1 w-fit rounded-full cursor-pointer px-2'
      onClick={onAddCategory}
    >
      <p>Categories</p>
      <MdAdd />
    </div>
  );
}
