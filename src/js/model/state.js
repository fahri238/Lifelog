export const state = {
  activities: JSON.parse(localStorage.getItem("activity_data")),
};

export const saveDataForm = (formData) => {
  const existingData = state.activities;

  const currentData = existingData ? existingData : [];
  currentData.push(formData);
  state.activities = currentData;
  localStorage.setItem("activity_data", JSON.stringify(state.activities));
};

export const editDataForm = (currentActivity, editedData) => {
  const selectedIndex = state.activities.findIndex((activity) => {
    return activity.id === currentActivity.id;
  });

  state.activities[selectedIndex] = editedData;

  localStorage.setItem("activity_data", JSON.stringify(state.activities));
};

export const deleteDataForm = (selectedActivity) => {
  const selectedIndex = state.activities.findIndex((activity) => {
    return activity.id === selectedActivity.id;
  });

  state.activities.splice(selectedIndex, 1);

  localStorage.setItem("activity_data", JSON.stringify(state.activities));
  console.log(state.activities);
};
export const getActivityData = () => {
  const activitiesData = state.activities;
  return activitiesData;
};
