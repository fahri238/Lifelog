import {
  state,
  getActivityData,
  editDataForm,
  deleteDataForm,
} from "../model/state";

import { processdailyCounter } from "../model/activityManager";
import activitiesView from "../views/activitiesView";
import addActivityView from "../views/addActivityView";
import { getCategories } from "../model/settingsModel";

export const detailActivityController = () => {
  const activityData = state.activities;

  if (!activityData) return;
  activitiesView.renderDetailActivity(activityData);
};

export const editActivityController = () => {
  const activityData = state.activities;

  activitiesView.openEditActivites(getActivityData);
  activitiesView.submitEditActivity((currentActivity, editedData) => {
    editDataForm(currentActivity, editedData);
  });
};

export const deleteActivityController = () => {
  const activityData = state.activities;
  const { currentCount, stateDailyGoal } = processdailyCounter();
  addActivityView.renderDailyGoal(currentCount, stateDailyGoal);

  activitiesView.deleteActivites((selectedActivity) => {
    deleteDataForm(selectedActivity);

    const updateData = processdailyCounter();
    const updateGoalState = addActivityView.renderDailyGoal(
      updateData.currentCount,
      updateData.stateDailyGoal,
    );
  });
};

export const renderActivityList = () => {
  const activityData = state.activities;
  if (activityData) {
    activityData.forEach((activity) => {
      activitiesView.renderActivityList(activity);
    });
  }
};

export const categoriesController = () => {
  const categories = getCategories().map((item) => item.category);
  const activityData = state.activities;

  activitiesView.renderCategoryTab([...categories].reverse());
  activitiesView.categories(activityData);
};
