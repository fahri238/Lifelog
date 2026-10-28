import dashboardView from "../views/DashboardView";
import { state } from "../model/state";
import activitiesView from "../views/activitiesView";
import {
  alphabetSorting,
  alphabetSortingDescending,
} from "../model/activityManager";

const activityData = state.activities;

export const listOfActivityController = () => {
  dashboardView.renderActivityList(alphabetSorting(activityData));
};

export const sortingActivityList = () => {
  dashboardView.sortingListOfActivities(
    () => {
      const sortedAlphabet = alphabetSorting(activityData);
      dashboardView.renderActivityList(sortedAlphabet);
    },
    () => {
      const sortedAlphabet = alphabetSortingDescending(activityData);
      dashboardView.renderActivityList(sortedAlphabet);
    },
  );
};

export const goToActivityController = () => {
  dashboardView.goToClickedActivity((activityId) => {
    const selectedActivity = activityData.find((activity) => {
      return activity.id === Number(activityId);
    });
    activitiesView.detailValue(selectedActivity);
  });
};
