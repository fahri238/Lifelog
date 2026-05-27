export const state = {
  activityData: {},
};

export const saveDataForm = (formData) => {
  state.activityData = formData;

  console.log(state.activityData);
};
