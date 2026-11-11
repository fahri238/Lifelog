import "../style.css";
import * as sidebarController from "./js/controllers/sidebarController";
import * as addActivityController from "./js/controllers/addActivityController";
import * as activitiesController from "./js/controllers/activitiesController";
import * as sortingController from "./js/controllers/sortingController";
// import * as dfa from "./js/controllers/dashboardController"
import * as dashboardController from "./js/controllers/dashboardController";
import * as settingController from "./js/controllers/settingsController"

document.addEventListener("DOMContentLoaded", () => {  
  // SIDEBAR
  sidebarController.setFocusMenuController();
  
  // DASHBOARD MENU
  // list of activities
  dashboardController.listOfActivityController();
  dashboardController.sortingActivityList();
  dashboardController.goToActivityController();

  // top category
  dashboardController.topCategoryController();

  // newest activity
  dashboardController.newestController();

  // productivity time today
  dashboardController.productivityTodayController();

  // activities this week
  dashboardController.getWeekController();

  // weekly activity chart
  dashboardController.weeklyActivityCartController();

  // SUMMARIES CONTENTS
  // total activity (all time)
  dashboardController.sumTotalActivities();

  // activities differences (week)
  dashboardController.activitiesDifferencesController()

  // weather status
  dashboardController.weatherStatusController()
  
  // activities this vs lat week chart
  dashboardController.thisVsLastWeekActivityController()

  // ADD ACTIVITY MENU
  addActivityController.livePreviewController();
  addActivityController.addActivityController();

  // ACTIVTIES MENU
  activitiesController.detailActivityController();
  activitiesController.renderActivityList();
  activitiesController.editActivityController();
  activitiesController.deleteActivityController();
  activitiesController.categoriesController();

  // SETTINGS MENU
  settingController.userSettingController();

  // sorting
  sortingController.sortingDefaultController();
});
