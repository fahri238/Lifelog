import {
  state,
  getActivityData,
  saveDataForm,
  editDataForm,
} from "../model/state";
import activitiesView from "../views/activitiesView";

export const detailActivityController = () => {
  const activityData = state.activities;

  if (!activityData) return;
  activitiesView.renderDetailActivity(activityData);
};

export const editActivityController = () => {
  const activityData = state.activities;

  activitiesView.openEditActivites(getActivityData);
  activitiesView.submitEditActivity(
    activityData,
    (currentActivity, editedData) => {
      editDataForm(currentActivity, editedData);
    },
  );
};

export const renderActivityList = () => {
  const activityData = state.activities;
  if (activityData) {
    activityData.forEach((activity) => {
      activitiesView.renderActivityList(activity);
    });
  }
};
