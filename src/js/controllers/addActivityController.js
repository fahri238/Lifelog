import addActivityView from "../views/addActivityView";
import * as activityManager from "../model/activityManager";
import activitiesView from "../views/activitiesView";
import { saveDataForm, getActivityData, state } from "../model/state";
import { getCategories } from "../model/settingsModel";

export const livePreviewController = () => {
  addActivityView.renderLivePreview(
    activityManager.countTimeDifference,
    getCategories(),
  );
};

export const addActivityController = () => {
  addActivityView.formData((data) => {
    activityManager.countTimeDifference;
    saveDataForm(data);

    activitiesView.renderActivityList(data);
    activitiesView.detailValue(data);

    const updateData = activityManager.processdailyCounter();
    console.log(updateData.currentCount, updateData.stateDailyGoal);
    addActivityView.renderDailyGoal(
      updateData.currentCount,
      updateData.stateDailyGoal,
    );
  });

  addActivityView.resetForm();
};
