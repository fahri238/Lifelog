import addActivityView from "../views/addActivityView";
import * as activityManager from "../model/activityManager";
import activitiesView from "../views/activitiesView";
import { saveDataForm, getActivityData } from "../model/state";
import { GOAL_STATES } from "../config";

export const livePreviewController = () => {
  addActivityView.renderLivePreview(activityManager.countTimeDifference);
};

export const addActivityController = () => {
  const { currentCount, state } = activityManager.processdailyCounter(false);
  addActivityView.renderDailyGoal(currentCount, state);

  addActivityView.formData((data) => {
    activityManager.countTimeDifference;
    saveDataForm(data);

    activitiesView.renderActivityList(data);

    const updateData = activityManager.processdailyCounter(true);
    addActivityView.renderDailyGoal(updateData.currentCount, updateData.state);
  });

  addActivityView.resetForm();
};
