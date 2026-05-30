import { state, getActivityData } from "../model/state";
import activitiesView from "../views/activitiesView";
import ActivitiesView from "../views/activitiesView";

export const detailActivityController = () => {
  const activityData = getActivityData();

  activityData.forEach((activity) => {
    ActivitiesView.renderActivityList(activity);
  });

  if (!activityData) return;

  ActivitiesView.renderDetailActivity(activityData);
};

export const editActivityController = () => {
  activitiesView.editActivity(getActivityData());

  activitiesView.closeEditActivity();
};
