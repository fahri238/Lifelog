import dashboardView from "../views/dashboardView";
import { state } from "../model/state";
import activitiesView from "../views/activitiesView";

export const listOfActivityController = () => {
  const activityData = state.activities;

  activityData.forEach((activity) => {
    return dashboardView.renderActivityList(activity);
  });

  dashboardView.goToClickedActivity((activityId) => {
    const selectedActivity = activityData.find((activity) => {
      return activity.id === Number(activityId);
    });

    activitiesView._detailValue(selectedActivity);
  });
};
