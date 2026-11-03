import dashboardView from "../views/DashboardView";
import { state } from "../model/state";
import activitiesView from "../views/activitiesView";
import {
  alphabetSorting,
  countDuration,
  defaultSorting,
  topCategoryModel,
} from "../model/activityManager";
import { renderActivityList } from "./activitiesController";

const activityData = state.activities;

export const listOfActivityController = () => {
  dashboardView.renderActivityList(defaultSorting(activityData));
};

export const sortingActivityList = () => {
  dashboardView.sortingListOfActivities(
    () => {
      const sortedAlphabet = alphabetSorting(activityData);
      dashboardView.renderActivityList(sortedAlphabet);
    },
    () => {
      const sortedAlphabet = defaultSorting(activityData);
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

// handle newest activity
export const newestController = () => {
  dashboardView.newestActivityView(
    (activityhandler) => {
      const activity = activityData.at(-1);
      return activity;
    },
    (id) => {
      const activity = activityData.find(
        (activity) => activity.id === Number(id),
      );

      activitiesView.categories(activityData);
      activitiesView.detailValue(activity);
    },
  );
};

// top category
export const topCategoryController = () => {
  const categoryName = topCategoryModel()[0];
  const categoryTotal = topCategoryModel()[1];
  dashboardView.topCategoryViews(categoryName, categoryTotal, () => {
    const filteredCategory = [...activityData].filter(
      (activity) => activity.category === categoryName,
    );

    activitiesView.removeActivityList(activityData);
    filteredCategory.forEach((activity) =>
      activitiesView.renderActivityList(activity),
    );
  });
};

// handle summaries contents
export const sumTotalActivities = () => {
  dashboardView.summaryTotalActivities((activities) => {
    activities = activityData.length;

    return activities;
  });
};
