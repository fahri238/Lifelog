import { ACTIVITIES_KEY, CATEGORIES_KEY } from "../config";

// ACTIVITIES STATE
export const state = {
  activities: JSON.parse(localStorage.getItem(ACTIVITIES_KEY)) || [],
  sortType: ["default", "date", "duration", "alphabet"],
};

export const saveDataForm = (formData) => {
  const existingData = state.activities;

  const currentData = existingData ? existingData : [];
  currentData.push(formData);
  state.activities = currentData;
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(state.activities));
};

export const editDataForm = (currentActivity, editedData) => {
  const selectedIndex = state.activities.findIndex((activity) => {
    return activity.id === currentActivity.id;
  });

  state.activities[selectedIndex] = editedData;

  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(state.activities));
};

export const deleteDataForm = (selectedActivity) => {
  const activityIndex = state.activities.findIndex((activity) => {
    return activity.id === Number(selectedActivity);
  });

  state.activities.splice(activityIndex, 1);

  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(state.activities));
};

export const getActivityData = () => {
  if (state.activities.length === 0 || !state.activities) return false;
  return state.activities;
};

// CATEGORIES STATE
export const getCategories = () => {
  // e.g {category: "Hangout", badgeColor: "badge--work"}
  return JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
};
