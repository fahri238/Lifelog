import AddActivityView from "../views/AddActivityView";
import * as activityManager from "../model/activityManager";
import activitiesView from "../views/activitiesView";
import { saveDataForm, getActivityData, state } from "../model/state";
import { GOAL_STATES } from "../config";
import { editActivityController } from "./activitiesController";

export const livePreviewController = () => {
  AddActivityView.renderLivePreview(activityManager.countTimeDifference);
};

export const addActivityController = () => {
  AddActivityView.formData((data) => {
    activityManager.countTimeDifference;
    saveDataForm(data);

    activitiesView.renderActivityList(data);
    activitiesView.detailValue(data);

    const updateData = activityManager.processdailyCounter();
    console.log(updateData.currentCount, updateData.stateDailyGoal)
    AddActivityView.renderDailyGoal(
      updateData.currentCount,
      updateData.stateDailyGoal,
    );

  });

  AddActivityView.resetForm();
};
