import sidebarView from "./js/views/sidebarView";

sidebarView.setFocusMenu();

const inputTitle = document.getElementById("activity-title");
const inputCategory = document.getElementById("activity-category");
const inputDate = document.getElementById("activity-date");
const inputStartTime = document.getElementById("activity-start");
const inputEndTime = document.getElementById("activity-end");
const inputDescription = document.getElementById("activity-notes");
const formInput = document.getElementById("new-activity-form");
const clearInputActivity = document.querySelector(".btn-form--clear");

const activityData = {};

formInput.addEventListener("submit", (e) => {
  e.preventDefault();

  activityData.title = inputTitle.value;
  activityData.category = inputCategory.value;
  activityData.date = inputDate.value;
  activityData.startTime = inputStartTime.value;
  activityData.endTime = inputEndTime.value;
  activityData.description = inputDescription.value;
});

formInput.addEventListener("reset", () => {});
