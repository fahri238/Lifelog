import sidebarView from "./js/views/sidebarView";
import { DEFAULT_TIME } from "./js/config";
import addActivityView from "./js/views/addActivityView";
import * as addActivityController from "./js/controllers/addActivityController";
import * as config from "./js/config";
sidebarView.setFocusMenu();

document.addEventListener("DOMContentLoaded", () => {
  addActivityController.livePreviewController();
  addActivityController.addActivityController();
});
