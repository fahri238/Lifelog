import "../style.css";
import * as sidebarController from "./js/controllers/sidebarController";
import * as addActivityController from "./js/controllers/addActivityController";
import * as activitiesController from "./js/controllers/activitiesController";
import * as sortingController from "./js/controllers/sortingController";
// import * as dfa from "./js/controllers/dashboardController"
import * as dashboardController from "./js/controllers/dashboardController";

document.addEventListener("DOMContentLoaded", () => {
  // DASHBOARD
  // list of activities
  dashboardController.listOfActivityController();
  dashboardController.sortingActivityList();
  dashboardController.goToActivityController();

  // newest activity
  dashboardController.newestController();

  // SIDEBAR
  sidebarController.setFocusMenuController();

  // ADD ACTIVITY
  addActivityController.livePreviewController();
  addActivityController.addActivityController();

  // activties
  activitiesController.detailActivityController();
  activitiesController.renderActivityList();
  activitiesController.editActivityController();
  activitiesController.deleteActivityController();
  activitiesController.categoriesController();

  // sorting
  sortingController.sortingDefaultController();
});
