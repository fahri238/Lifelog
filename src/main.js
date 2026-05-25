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

formInput.addEventListener("submit", (e) => {
  e.preventDefault();

  activityData.title = inputTitle.value;
  activityData.category = inputCategory.value;
  activityData.date = inputDate.value;
  activityData.startTime = inputStartTime.value;
  activityData.endTime = inputEndTime.value;
  activityData.description = inputDescription.value;
  activityData.duration = previewDuration.textContent;
  console.log(activityData);
});

console.log("data berhasil disimpan :", activityData);

formInput.addEventListener("reset", () => {
  previewTitle.textContent = "Acitivvity Title...";
  previewCategory.textContent = "Category";
  previewCategory.className = "label";
  previewDuration.textContent = "--h --m";
});
