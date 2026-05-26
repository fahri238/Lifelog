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

const previewTitle = document.getElementById("preview-title");
const previewCategory = document.getElementById("preview-category");
const previewDuration = document.getElementById("preview-duration");

const activityData = {};

// config
const currentHour = String(new Date().getHours()).padStart(2, "0");
const currentMinute = String(new Date().getMinutes()).padStart(2, "0");
const defaultDuration = `${currentHour}:${currentMinute}`;

// counting the difference start time & end time
const countTimeDifference = (
  startTime = defaultDuration,
  endTime = defaultDuration,
) => {
  const [startHour, startMinute] = (startTime || defaultDuration)
    .split(":")
    .map(Number);

  let [endHour, endMinute] = (endTime || defaultDuration)
    .split(":")
    .map(Number);

  const startMinutesTotal = startHour * 60 + startMinute;
  let endMinutesTotal = endHour * 60 + endMinute;

  if (endMinutesTotal < startMinutesTotal) endMinutesTotal += 24 * 60;

  const diffMinutes = endMinutesTotal - startMinutesTotal;

  const displayHours = Math.floor(diffMinutes / 60);
  const displayMinutes = diffMinutes % 60;

  return `${String(displayHours).padStart(2, "0")}h ${String(displayMinutes).padStart(2, "0")}m`;
};

// update the duration preview
const updateDurationPreview = () => {
  previewDuration.textContent = countTimeDifference(
    inputStartTime.value,
    inputEndTime.value,
  );
};

// live preview
inputTitle.addEventListener("input", (e) => {
  previewTitle.textContent = inputTitle.value.trim() || "Activity Title...";
});

inputCategory.addEventListener("input", (e) => {
  previewCategory.textContent =
    inputCategory.options[inputCategory.selectedIndex].text;
  previewCategory.className = `label label--${inputCategory.value}`;
});

[inputStartTime, inputEndTime].forEach((input) => {
  input.addEventListener("change", updateDurationPreview);
});

formInput.addEventListener("reset", () => {
  previewTitle.textContent = "Activity Title...";
  previewCategory.textContent = "Category";
  previewCategory.className = "label label--work";
  previewDuration.textContent = "--h --m";
});

const goalCurrent = document.querySelector(".goal-current");
const goalMotivation = document.querySelector(".goal-motivation");
const goalBar = document.querySelector(".goal-bar-fill");
const goalIconFire = document.querySelector(".goal-icon-fire");

const getTodayDateString = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - offset * 60 * 1000);
  return localToday.toISOString().split("T")[0];
};

const updateDailyCounter = (increment = false) => {
  const today = getTodayDateString();

  const savedData = localStorage.getItem("activity_data_tracker");
  let currentCount =
    parseInt(localStorage.getItem("activity_daily_count")) || 0;

  if (savedData !== today) {
    currentCount = 0;
    localStorage.setItem("activity_data_tracker", today);
    localStorage.setItem("activity_daily_count", "0");
  }

  if (increment) {
    currentCount += 1;
    localStorage.setItem("activity_daily_count", currentCount.toString());
  }

  if (currentCount >= 5) {
    goalIconFire.classList.add("icon-fire-active");
    goalCurrent.textContent = currentCount;
    goalBar.className = "goal-bar-fill state-high";
    goalBar.style.width = "100%";
    goalMotivation.textContent = "Awesome! Daily goal achieved!";
  } else if (currentCount === 3 || currentCount === 4) {
    goalIconFire.classList.remove("icon-fire-active");
    goalCurrent.textContent = currentCount;
    goalBar.className = "goal-bar-fill state-medium";
    goalBar.style.width = currentCount === 4 ? "80%" : "60%";
    goalMotivation.textContent = "Almost there! Keep the momentum going.";
  } else if (currentCount === 1 || currentCount === 2) {
    goalIconFire.classList.remove("icon-fire-active");
    goalCurrent.textContent = currentCount;
    goalBar.className = "goal-bar-fill state-low";
    goalBar.style.width = currentCount === 1 ? "20%" : "40%";
    goalMotivation.textContent = "Good start! Keep going.";
  } else {
    goalCurrent.textContent = currentCount;
    goalBar.className = "goal-bar-fill";
    goalBar.style.width = "0%";
    goalMotivation.textContent = "Let's get started today!";
  }

  console.log(currentCount);
};

document.addEventListener("DOMContentLoaded", () => {
  updateDailyCounter(false);
});

formInput.addEventListener("submit", (e) => {
  e.preventDefault();

  activityData.title = inputTitle.value;
  activityData.category = inputCategory.value;
  activityData.date = inputDate.value;
  activityData.startTime = inputStartTime.value;
  activityData.endTime = inputEndTime.value;
  activityData.description = inputDescription.value;
  activityData.duration = previewDuration.textContent;

  updateDailyCounter(true);
});
