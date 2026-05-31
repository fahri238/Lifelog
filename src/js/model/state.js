export const state = {
  activities: [],
};

export const saveDataForm = (formData) => {
  const existingData = getActivityData();

  const currentData = existingData ? existingData : [];
  currentData.push(formData);
  state.activities = currentData;
  localStorage.setItem("activity_data", JSON.stringify(state.activities));
};

export const editDataForm = (currentActivity, editedData) => {
  const selectedIndex = state.activities.findIndex((activity) => {
    return activity.id === currentActivity.id;
  });

  const storageData = (state.activities[selectedIndex] = editedData);

  localStorage.setItem("activity_data", JSON.stringify(state.activities));
};

export const getActivityData = () => {
  state.activities = JSON.parse(localStorage.getItem("activity_data"));
  return state.activities;
};
