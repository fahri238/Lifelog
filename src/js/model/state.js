export const state = {
  activityData: [],
};

export const saveDataForm = (formData) => {
  state.activityData.push(formData);
  const activityDataString = JSON.stringify(state.activityData);
  localStorage.setItem("activity_data", activityDataString);
  console.log(state.activityData);
};

export const getActivityData = () => {
  return JSON.parse(localStorage.getItem("activity_data"));
};
