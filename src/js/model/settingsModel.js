// Base Category (Default)
const defaultCategory = [
  {
    category: "Work",
    badgeColor: "badge--work",
  },
  {
    category: "Study",
    badgeColor: "badge--study",
  },
  {
    category: "Exercise",
    badgeColor: "badge--exercise",
  },
  {
    category: "Social",
    badgeColor: "badge--social",
  },
  {
    category: "Hobby",
    badgeColor: "badge--hobby",
  },
];

export const initialCategoryModel = () => {
  const existingData = localStorage.getItem("categories");

  if (!existingData) {
    localStorage.setItem("categories", JSON.stringify(defaultCategory));
    console.log(JSON.stringify(defaultCategory));
  }
};

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
  const existingCategory = JSON.parse(localStorage.getItem("categories")) || [];

  existingCategory.push({ category: category, badgeColor: badgeColor });
  return localStorage.setItem("categories", JSON.stringify(existingCategory));
};

export const getCategories = () => {
  // e.g {category: "Hangout", badgeColor: "badge--work"}
  return JSON.parse(localStorage.getItem("categories")) || [];
};

// edit category
export const editCategoryModel = (selectedCategory, editedCategory) => {
  const currentCategoryIndex = getCategories().findIndex(
    (item) => item.category === selectedCategory,
  );

  const categories = getCategories();

  // replace the new edited to old object category
  categories[currentCategoryIndex].category = editedCategory;

  return localStorage.setItem("categories", JSON.stringify(categories));
};

// delete category
export const deleteCategoryModel = (category) => {
  const getCategoryIndex = getCategories().findIndex(
    (item) => item.category === category,
  );

  const categories = getCategories();
  categories.splice(getCategoryIndex, 1);
  return localStorage.setItem("categories", JSON.stringify(categories));
};
