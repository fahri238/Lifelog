import { getTodayDateString } from "../helpers/utils";
import { DAILY_GOAL } from "../config";
import FormView from "./formViews";


class AddActivityViews extends FormView {
  _previewTitle = document.getElementById("preview-title");
  _previewCategory = document.getElementById("preview-category");
  _previewDuration = document.getElementById("preview-duration");

  _goalCurrent = document.querySelector(".goal-current");
  _goalMotivation = document.querySelector(".goal-motivation");
  _goalBar = document.querySelector(".goal-bar-fill");
  _goalIconFire = document.querySelector(".goal-icon-fire");

  constructor() {
    super();

    this._inputTitle = document.getElementById("activity-title");
    this._inputCategory = document.getElementById("activity-category");
    this._inputDate = document.getElementById("activity-date");
    this._inputStartTime = document.getElementById("activity-start");
    this._inputEndTime = document.getElementById("activity-end");
    this._inputDescription = document.getElementById("activity-notes");
    this._formInput = document.getElementById("new-activity-form");
    this._formActionBtn = document.querySelector(".btn-form--clear");
  }

  _updateDuration(handlerTime) {
    if (!this._inputStartTime.value || !this._inputEndTime.value) return;
    this._previewDuration.textContent = handlerTime(
      this._inputStartTime.value,
      this._inputEndTime.value,
    );
  }

  renderLivePreview(handlerTime) {
    this._inputTitle.addEventListener("input", (e) => {
      this._previewTitle.textContent =
        this._inputTitle.value.trim() || "Activity Title...";
    });

    this._inputCategory.addEventListener("input", (e) => {
      this._previewCategory.textContent =
        this._inputCategory.options[this._inputCategory.selectedIndex].text;
      this._previewCategory.className = `label badge--${this._inputCategory.value}`;
    });

    [this._inputStartTime, this._inputEndTime].forEach((input) => {
      input.addEventListener("change", () => {
        this._updateDuration(handlerTime);
      });
    });

    this._formInput.addEventListener("reset", () => {
      this._previewTitle.textContent = "Activity Title...";
      this._previewCategory.textContent = "Category";
      this._previewCategory.className = "label badge--work";
      this._previewDuration.textContent = "--h --m";
    });
  }

  renderDailyGoal(currentCount, goalState) {
    // update daily current number
    this._goalCurrent.textContent = currentCount;

    // update teks motivation
    this._goalMotivation.textContent = goalState.motivation;

    // update class css progress bar and width percentage
    this._goalBar.className = `goal-bar-fill ${goalState.className}`.trim();
    const percentage = Math.min((currentCount / DAILY_GOAL) * 100, 100);
    this._goalBar.style.width = `${percentage}%`;

    // update achieved fire streak
    this._goalIconFire.classList.toggle("icon-fire-active", goalState.fire);
  }

}

export default new AddActivityViews();
