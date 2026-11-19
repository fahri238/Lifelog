export const userProfileModel = (username, role) => {
  const userProfile = {
    username: username,
    role: role,
  };

  localStorage.setItem("user-profile", JSON.stringify(userProfile));
};

export const getUserProfile = () => {
  const data = JSON.parse(localStorage.getItem("user-profile"));
  const defaultData = { username: "Your Name", role: "Your Role" };
  return data ? data : defaultData;
};

export const addCategoryModel = (category, badgeColor) => {
  const existingCategory =
    JSON.parse(localStorage.getItem("new category")) || [];

  existingCategory.push({ category: category, badgeColor: badgeColor });
  return localStorage.setItem("new category", JSON.stringify(existingCategory));
};

export const getCategories = () => {
  // e.g {category: "Hangout", badgeColor: "badge--work"}
  return JSON.parse(localStorage.getItem("new category")) || [];
};

// edit category
export const editCategoryModel = (selectedCategory, editedCategory) => {
  const currentCategoryIndex = getCategories().findIndex(
    (item) => item.category === selectedCategory,
  );

  const categories = getCategories();
  
  // replace the new edited to old object category
  categories[currentCategoryIndex].category = editedCategory;

  return localStorage.setItem("new category", JSON.stringify(categories));
};
