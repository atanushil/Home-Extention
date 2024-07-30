// Utility function to get data from localStorage
function getData() {
  const data = localStorage.getItem('categoryData');
  return data ? JSON.parse(data) : { categories: [] };
}

// Utility function to save data to localStorage
function saveData(data) {
  localStorage.setItem('categoryData', JSON.stringify(data));
}

// Function to add a new category
export function addCategory(categoryName) {
  const data = getData();
  const categoryExists = data.categories.some(
    (category) => category.categoryName === categoryName
  );
  if (!categoryExists) {
    data.categories.push({ categoryName, shortcuts: [] });
    saveData(data);
  } else {
    let message=`Category ${categoryName} already exists`;
    console.log(message);
  }
}

// Function to edit an existing category
export function editCategory(oldCategoryName, newCategoryName) {
  const data = getData();
  const category = data.categories.find(
    (category) => category.categoryName === oldCategoryName
  );
  if (category) {
    const newCategoryExists = data.categories.some(
      (category) => category.categoryName === newCategoryName
    );
    if (!newCategoryExists) {
      category.categoryName = newCategoryName;
      saveData(data);
    } else {
      console.log(`Category ${newCategoryName} already exists`);
    }
  } else {
    console.log(`Category ${oldCategoryName} not found`);
  }
}

// Function to delete a category
export function deleteCategory(categoryName) {
  const data = getData();
  const categoryIndex = data.categories.findIndex(
    (category) => category.categoryName === categoryName
  );
  if (categoryIndex > -1) {
    data.categories.splice(categoryIndex, 1);
    saveData(data);
  } else {
    console.log(`Category ${categoryName} not found`);
  }
}


// Function to add a shortcut to an existing category
export function addShortcutToCategory(categoryName, shortcut) {
  const data = getData();
  const category = data.categories.find(
    (category) => category.categoryName === categoryName
  );

  if (category) {
    const shortcutExists = category.shortcuts.some(
      (s) => s.name === shortcut.name || s.link === shortcut.link
    );

    if (!shortcutExists) {
      category.shortcuts.push(shortcut);
      saveData(data);
      console.log(`Adding new shortcut: ${JSON.stringify(shortcut)} to category: ${categoryName}`);
    } else {
      console.log(`Shortcut with the same name or link already exists in category ${categoryName}`);
    }
  } else {
    console.log(`Category ${categoryName} not found`);
    console.log("Select a category from categories section.");
  }
}

// Function to edit a shortcut in an existing category
export function updateShortcut(categoryName, oldShortcutName, newShortcut) {
  const data = getData();
  const category = data.categories.find(
    (category) => category.categoryName === categoryName
  );

  if (category) {
    const shortcut = category.shortcuts.find(
      (shortcut) => shortcut.name === oldShortcutName
    );

    if (shortcut) {
      const newShortcutExists = category.shortcuts.some(
        (s) => s.name === newShortcut.name && s.name !== oldShortcutName
      );
      const linkExists = category.shortcuts.some(
        (s) => s.link === newShortcut.link && s.link !== shortcut.link
      );

      if (newShortcut.name === oldShortcutName && newShortcut.link === shortcut.link) {
        console.log("Update not required because previous and given shortcut name and link are the same");
      } else if (linkExists) {
        console.log(`Link ${newShortcut.link} already exists in category ${categoryName}`);
      } else if (newShortcutExists) {
        console.log(`Shortcut ${newShortcut.name} already exists in category ${categoryName}`);
      } else {
        shortcut.name = newShortcut.name;
        shortcut.link = newShortcut.link;
        saveData(data);
        console.log(`Updating shortcut: ${oldShortcutName} to ${JSON.stringify(newShortcut)} in category: ${categoryName}`);
      }
    } else {
      console.log(`Shortcut ${oldShortcutName} not found in category ${categoryName}`);
    }
  } else {
    console.log(`Category ${categoryName} not found`);
  }
}



// Function to delete a shortcut from an existing category
export function deleteShortcut(categoryName, shortcutName) {
  const data = getData();
  const category = data.categories.find(
    (category) => category.categoryName === categoryName
  );
  if (category) {
    const shortcutIndex = category.shortcuts.findIndex(
      (shortcut) => shortcut.name === shortcutName
    );
    if (shortcutIndex > -1) {
      category.shortcuts.splice(shortcutIndex, 1);
      saveData(data);
    } else {
      console.log(`Shortcut ${shortcutName} not found in category ${categoryName}`);
    }
  } else {
    console.log(`Category ${categoryName} not found`);
  }
}

// Function to get all category names as an array of strings
export function getCategories() {
  const data = getData();
  return data.categories
    .map(category => category.categoryName)
    .filter(name => name); // Remove any undefined or empty category names
}

// Function to get shortcuts of a specific category
export function getShortcuts(categoryName) {
  const data = getData();
  const category = data.categories.find(
    (category) => category.categoryName === categoryName
  );
  return category ? category.shortcuts : [];
}

// Initialize localStorage if not already initialized
(function initializeLocalStorage() {
  if (!localStorage.getItem('categoryData')) {
    localStorage.setItem('categoryData', JSON.stringify({ categories: [] }));
  }
})();


function estimateLocalStorageUsage() {
  let totalSize = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      totalSize += key.length + value.length;
    }
  }

  // Convert size to KB (1 character = 1 byte)
  const sizeInKB = totalSize / 1024;

  return sizeInKB;
}

console.log(`Local Storage usage: ${estimateLocalStorageUsage().toFixed(2)} KB`);

function checkLocalStorageAvailableSpace() {
  const testKey = 'test';
  const testValue = new Array(1024 * 1024).join('a'); // 1MB

  try {
    localStorage.setItem(testKey, testValue);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

if (checkLocalStorageAvailableSpace()) {
  console.log('Local Storage space is available for at least 5MB');
} else {
  console.log('Local Storage space may be full or unavailable');
}
