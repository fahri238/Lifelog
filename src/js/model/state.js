export const state = {
  activityData: [],
};

export const saveDataForm = (formData) => {
  const existingData = localStorage.getItem("activity_data");

  const currentData = existingData? JSON.parse(existingData) : [];
  currentData.push(formData);
  localStorage.setItem("activity_data", JSON.stringify(currentData));
};

export const getActivityData = () => {
  return JSON.parse(localStorage.getItem("activity_data"));
};
