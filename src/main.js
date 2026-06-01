import "../style.css";
import * as sidebarController from "./js/controllers/sidebarController";
import { DEFAULT_TIME } from "./js/config";
import addActivityView from "./js/views/addActivityView";
import activitiesView from "./js/views/activitiesView";
import * as addActivityController from "./js/controllers/addActivityController";
import * as config from "./js/config";
import * as activitiesController from "./js/controllers/activitiesController";
import { state } from "./js/model/state";

document.addEventListener("DOMContentLoaded", () => {
  sidebarController.setFocusMenuController();

  addActivityController.livePreviewController();
  addActivityController.addActivityController();

  // activties
  activitiesController.detailActivityController();
  activitiesController.renderActivityList();
  activitiesController.editActivityController();
  activitiesController.deleteActivityController();
});
