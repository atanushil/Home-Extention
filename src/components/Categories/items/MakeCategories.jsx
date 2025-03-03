import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

export default function MakeCategories({ category, onSaveCategory, onClose }) {
  const [inputValue, setInputValue] = useState(category || '');

  useEffect(() => {
    setInputValue(category || '');
  }, [category]);

  const handleSave = () => {
    if (inputValue.trim()) {
      onSaveCategory(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="flex items-center w-fit rounded-full my-2">
      <div className="input flex items-center relative caret-transparent">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='px-2 rounded-l-full  focus:caret-black'
        />
        {inputValue && (
          <IoMdClose
            className='right-0 absolute cursor-pointer'
            onClick={handleClear}
          />
        )}
      </div>
      {inputValue ? (
        <button className='bg-green-500 px-2 rounded-r-full' onClick={handleSave}>Save</button>
      ) : (
        <button className='bg-red-500 px-2 rounded-r-full' onClick={onClose}>Close</button>
      )}
    </div>
  );
}
