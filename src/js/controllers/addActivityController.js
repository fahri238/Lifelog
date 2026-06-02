import addActivityView from "../views/addActivityView";
import * as activityManager from "../model/activityManager";
import activitiesView from "../views/activitiesView";
import { saveDataForm, getActivityData, state } from "../model/state";
import { GOAL_STATES } from "../config";
import { editActivityController } from "./activitiesController";

export const livePreviewController = () => {
  addActivityView.renderLivePreview(activityManager.countTimeDifference);
};

export const addActivityController = () => {
  addActivityView.formData((data) => {
    activityManager.countTimeDifference;
    saveDataForm(data);

    activitiesView.renderActivityList(data);
    activitiesView._detailValue(data);

    const updateData = activityManager.processdailyCounter();
    addActivityView.renderDailyGoal(
      updateData.currentCount,
      updateData.stateDailyGoal,
    );
  });

  addActivityView.resetForm();
};
