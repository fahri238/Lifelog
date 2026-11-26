import { ACTIVITIES_KEY, getActivityData, state } from "./state";

const CATEGORIES_KEY = "categories";
const USER_PROFILE_KEY = "user-profile";

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
  const existingData = localStorage.getItem(CATEGORIES_KEY);

  if (!existingData) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategory));
  }
};

export const userProfileModel = (username, role) => {
  const userProfile = {
    username: username,
    role: role,
  };

  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
};

// USER PROFILE SETTINGS
export const getUserProfile = () => {
  const data = JSON.parse(localStorage.getItem(USER_PROFILE_KEY));
  const defaultData = { username: "Your Name", role: "Your Role" };
  return data ? data : defaultData;
};

// MANAGE CATEGORY SETTINGS
export const getCategories = () => {
  // e.g {category: "Hangout", badgeColor: "badge--work"}
  return JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
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

  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(state.activities));
};

// add category
export const addCategoryModel = (category, badgeColor) => {
  const existingCategory =
    JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];

  existingCategory.push({ category: category, badgeColor: badgeColor });
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(existingCategory));
};

// edit category
export const editCategoryModel = (selectedCategory, editedCategory) => {
  const currentCategoryIndex = getCategories().findIndex(
    (item) => item.category === selectedCategory,
  );
  // if (!currentCategoryIndex)

  replaceOldValueCategory(selectedCategory, editedCategory);

  // replace the new edited to old object category
  const categories = getCategories();
  categories[currentCategoryIndex].category = editedCategory;

  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

// delete category
export const deleteCategoryModel = (category) => {
  const getCategoryIndex = getCategories().findIndex(
    (item) => item.category === category,
  );
  if (!getCategoryIndex) return;

  replaceOldValueCategory(category);

  const categories = getCategories();
  categories.splice(getCategoryIndex, 1);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};
