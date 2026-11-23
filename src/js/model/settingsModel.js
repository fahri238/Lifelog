import { getActivityData, state } from "./state";

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

// USER PROFILE SETTINGS
export const getUserProfile = () => {
  const data = JSON.parse(localStorage.getItem("user-profile"));
  const defaultData = { username: "Your Name", role: "Your Role" };
  return data ? data : defaultData;
};

// MANAGE CATEGORY SETTINGS
export const addCategoryModel = (category, badgeColor) => {
  const existingCategory = JSON.parse(localStorage.getItem("categories")) || [];

  existingCategory.push({ category: category, badgeColor: badgeColor });
  return localStorage.setItem("categories", JSON.stringify(existingCategory));
};

export const getCategories = () => {
  // e.g {category: "Hangout", badgeColor: "badge--work"}
  return JSON.parse(localStorage.getItem("categories")) || [];
};

// use for delete and edit category to replace old value with the new one in localstorage
const replaceOldValueCategory = (selectedCategory, newValue = "unknown") => {
  state.activities = getActivityData().map((activity) => {
    if (activity.category === selectedCategory.toLowerCase()) {
      return {
        ...activity,
        category: newValue.toLowerCase(),
      };
    } else {
      return activity;
    }
  });

  localStorage.setItem("activity_data", JSON.stringify(state.activities));
};

// edit category
export const editCategoryModel = (selectedCategory, editedCategory) => {
  const currentCategoryIndex = getCategories().findIndex(
    (item) => item.category === selectedCategory,
  );

  replaceOldValueCategory(selectedCategory, editedCategory);

  // replace the new edited to old object category
  const categories = getCategories();
  categories[currentCategoryIndex].category = editedCategory;

  localStorage.setItem("categories", JSON.stringify(categories));
};

// delete category
export const deleteCategoryModel = (category) => {
  const getCategoryIndex = getCategories().findIndex(
    (item) => item.category === category,
  );

  replaceOldValueCategory(category);

  const categories = getCategories();
  categories.splice(getCategoryIndex, 1);
  localStorage.setItem("categories", JSON.stringify(categories));
};
