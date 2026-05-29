import { state, getActivityData } from "../model/state";
import ActivitiesView from "../views/activitiesView";

export const detailActivityController = () => {
  const activityData = getActivityData();
  activityData.forEach((activity) => {
    ActivitiesView.renderActivityList(activity);
  });

  console.log(activityData);
  if (!activityData) return;
  ActivitiesView.renderDetailActivity(activityData[0]);
};
