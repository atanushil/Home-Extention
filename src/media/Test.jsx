import React, { useState, useEffect } from 'react';

// Initial data
const initialCategories = [
  {
    name: "Category1",
    items: [
      { name: "Google", link: "https://www.google.com" },
      { name: "Instagram", link: "https://www.instagram.com" }
    ]
  },
  {
    name: "Category2",
    items: [
      { name: "YouTube", link: "https://www.youtube.com" },
      { name: "Facebook", link: "https://www.facebook.com" }
    ]
  }
];

const Test = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Load categories from local storage
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // If no data, use initial data and save it to local storage
      setCategories(initialCategories);
      localStorage.setItem('categories', JSON.stringify(initialCategories));
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1>Categories</h1>
      <div>
        {categories.map((category) => (
          <button key={category.name} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div>
          <h2>{selectedCategory.name}</h2>
          <ul>
            {selectedCategory.items.map((item) => (
              <li key={item.name}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Test;
