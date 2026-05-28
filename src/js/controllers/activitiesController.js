import { state, getActivityData } from "../model/state";
import ActivitiesView from "../views/ActivitiesView";

export const detailActivityController = (activityData) => {
  activityData = getActivityData();

  console.log(activityData);
  if (!activityData) return;
  ActivitiesView.renderDetailActivity(activityData[0]);
};
