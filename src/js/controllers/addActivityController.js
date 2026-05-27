import addActivityView from "../views/addActivityView";
import * as addActivityModel from "../model/addActivityModel";
import { saveDataForm } from "../model/state";
import { GOAL_STATES } from "../config";

export const livePreviewController = () => {
  addActivityView.livePreview(addActivityModel.countTimeDifference);
};

export const addActivityController = () => {
  const { currentCount, state } = addActivityModel.processdailyCounter(false);
  addActivityView.dailyGoal(currentCount, state);

  addActivityView.formData((formData) => {
    saveDataForm(formData);

    const updateData = addActivityModel.processdailyCounter(true);

    addActivityView.dailyGoal(updateData.currentCount, updateData.state);
  });
};
