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

existingCategory.push({category: category, badgeColor: badgeColor})
  return localStorage.setItem("new category", JSON.stringify(existingCategory));
};

export const getCategories = () => {
  return JSON.parse(localStorage.getItem("new category")) || [];
};
