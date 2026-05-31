import {
  state,
  getActivityData,
  saveDataForm,
  editDataForm,
} from "../model/state";
import activitiesView from "../views/activitiesView";

export const detailActivityController = () => {
  const activityData = getActivityData();

  if (!activityData) return;

  activitiesView.renderDetailActivity(activityData);
};

export const editActivityController = () => {
  const activityData = getActivityData();

  activitiesView.openEditActivity(
    activityData,
    (currentActivity, ediedData) => {
      editDataForm(currentActivity, ediedData);
    },
  );

  activitiesView.closeEditActivity();
};

export const renderActivityList = () => {
  const activityData = getActivityData();
  if (activityData) {
    activityData.forEach((activity) => {
      activitiesView.renderActivityList(activity);
    });
  }
};
