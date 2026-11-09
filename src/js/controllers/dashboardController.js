import dashboardView from "../views/DashboardView";
import { state } from "../model/state";
import activitiesView from "../views/activitiesView";
import {
  alphabetSorting,
  defaultSorting,
  getLastWeek,
  productivityTodayModel,
  statusActivityWeek,
  topCategoryModel,
  totalActivityLastWeek,
  totalActivityThisWeek,
  totalLastTwoWeek,
} from "../model/activityManager";
import { formattedDuration } from "../helpers/format";

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

// productivity time today
export const productivityTodayController = () => {
  dashboardView.productyTime(productivityTodayModel);
};

// total activity this week
export const getWeekController = () => {
  dashboardView.totalActivityWeek(
    statusActivityWeek,
    totalActivityThisWeek,
    totalActivityLastWeek,
  );
};

// weekly activity chart
export const weeklyActivityCartController = () => {
  const weeklyActivity = getLastWeek().thisWeek.map((day) => day.length);

  const maximum = Math.max(...weeklyActivity);

  weeklyActivity.forEach((activitiesDay, index) => {
    dashboardView.weeklyActivityChart(activitiesDay, index, maximum);
  });

  weeklyActivity.forEach((activitiesDay, index) => {
    dashboardView.displayamount(activitiesDay, index);
  });
};

// handle summaries contents
export const sumTotalActivities = () => {
  dashboardView.summaryTotalActivities((activities) => {
    activities = activityData.length;

    return activities;
  });
};

// activities this vs last week chart
export const thisVsLastWeekActivityController = () => {
  const { totalThisWeek, totalLastWeek, totalLasTwotWeek } = totalLastTwoWeek();
  const maximum = totalLasTwotWeek;

  const data = {
    totalTwoWeek: `${(totalLasTwotWeek * 100) / maximum}%`,

    thisWeekPersen: `${(totalThisWeek * 100) / maximum}%`,
    thisWeekTotal: totalThisWeek,

    lastWeekPersen: `${(totalLastWeek * 100) / maximum}%`,
    lastWeekTotal: totalLastWeek,
  };

  dashboardView.thisVsLastActivityView(data);
};
