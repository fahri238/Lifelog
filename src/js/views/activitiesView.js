import { detailActivityController } from "../controllers/activitiesController.js";
import { formattedDate } from "../helpers/format.js";
import FormView from "./formViews.js";

class ActivitiesViews extends FormView {
  _detailContainer = document.getElementById("detail-panel");
  _detailCategory = document.getElementById("detail-category");
  _detailTitle = document.getElementById("detail-title");
  _detailDate = document.getElementById("detail-date");
  _detailDuration = document.getElementById("detail-duration");
  _detailTimeSesstion = document.getElementById("detail-time-session");
  _detailNotes = document.getElementById("detail-notes");
  _editDetailBtn = document.getElementById("detail-edit-btn");

  _rowContainer = document.querySelector(".row-container");
  _btnEdit = document.querySelector(".btn-edit");
  _formEdit = document.querySelector(".form-panel__edit");
  _overlay = document.querySelector(".overlay-blur");
  _currentActivity;
  _editedData;
  _selectActivityId;
  constructor() {
    super();

    this._inputTitle = document.getElementById("activity-title-edit");
    this._inputCategory = document.getElementById("activity-category-edit");
    this._inputDate = document.getElementById("activity-date-edit");
    this._inputStartTime = document.getElementById("activity-start-edit");
    this._inputEndTime = document.getElementById("activity-end-edit");
    this._inputDescription = document.getElementById("activity-notes-edit");
    this._formInput = document.getElementById("edit-activity-form");
    this._formActionBtn = document.querySelector(".btn-form--close");
    this._editFormBtn = document.querySelector(".btn-form--edit");
  }

  _detailValue(activity = null) {
    this._detailContainer.dataset.id = activity.id;

    this._detailCategory.textContent = activity.category;
    this._detailCategory.className = `badge-category badge--${activity.category}`;
    this._detailTitle.textContent = activity.title;
    this._detailDate.textContent = formattedDate(activity.date);
    this._detailDuration.textContent = `${activity.startTime} - ${activity.endTime}`;
    this._detailTimeSesstion.textContent = activity.duration;
    this._detailNotes.textContent = activity.description;
  }

  renderDetailActivity(activities) {
    const rowContainer = document.querySelector(".row-container");
    rowContainer.addEventListener("click", (e) => {
      const selectEl = e.target.closest(".list-row");
      if (!selectEl) return;

      const activityId = selectEl.dataset.id;
      const selectedActivity = activities.find(
        (activity) => activity.id === Number(activityId),
      );

      this._detailValue(selectedActivity);
    });
  }

  renderActivityList(activity) {
    this._rowContainer.insertAdjacentHTML(
      "afterbegin",
      this.activityMarkup(activity),
    );
  }

  activityMarkup(activiy) {
    return `
    <li class="list-row" data-id="${activiy.id}">
      <div class="row-info">
        <h4>${activiy.title}</h4> 
        <span class="label badge--${activiy.category}">${activiy.category}</span>
      </div>
      <div class="row-date">
        <i class="bi bi-calendar3"></i>
        <p>${activiy.date}</p>
      </div>
      <div class="row-duration">
        <i class="bi bi-clock"></i>
        <p>${activiy.duration}</p>
      </div>
      <div class="row-actions">
        <button class="btn-icon btn-edit " title="Edit">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn-icon btn-delete" title="Delete">
          <i class="bi bi-trash"></i>
        </button>
      </div>
     </li>
    `;
  }

  // HANDLE EDIT FORM
  openEditActivites(activities) {
    [this._rowContainer, this._detailContainer].forEach((editBtn) => {
      editBtn.addEventListener("click", (e) => {
        let selectEl;

        editBtn === this._rowContainer
          ? (selectEl = e.target.closest(".btn-edit"))
          : (selectEl = e.target.closest(".btn-panel--primary"));

        if (!selectEl) return;

        selectEl === e.target.closest(".btn-edit")
          ? (this._selectActivityId = Number(
              e.target.closest(".list-row").dataset.id,
            ))
          : (this._selectActivityId = Number(
              e.target.closest(".detail-panel").dataset.id,
            ));

        if (!editBtn || !this._selectActivityId) return;

        this._formEdit.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden");

        this._editSelectedActivities(activities());
      });
    });
  }

  _editSelectedActivities(activities) {
    const foundActivity = activities.find(
      (activity) => activity.id === this._selectActivityId,
    );

    this._currentActivity = foundActivity;
    this._selectedActivity(this._currentActivity);
  }

  submitEditActivity(activities, handler) {
    this._formInput.addEventListener("submit", (e) => {
      e.preventDefault();

      this._editedData = {
        id: this._currentActivity.id,
        title: this._inputTitle.value,
        category: this._inputCategory.value,
        date: this._inputDate.value,
        startTime: this._inputStartTime.value,
        endTime: this._inputEndTime.value,
        description: this._inputDescription.value,
        duration: this._previewDuration.textContent,
      };

      // replace old formated list activity
      const selectedActivity = this._rowContainer.querySelector(
        `[data-id="${this._editedData.id}"]`,
      );
      selectedActivity.outerHTML = this.activityMarkup(this._editedData);

      this._detailValue(this._editedData);

      handler(this._currentActivity, this._editedData);
    });

    this.closeEditActivity();
  }

  _selectedActivity(activity) {
    id: activity.id;
    this._inputTitle.value = activity.title;
    this._inputCategory.value = activity.category;
    this._inputDate.value = activity.date;
    this._inputStartTime.value = activity.startTime;
    this._inputEndTime.value = activity.endTime;
    this._inputDescription.value = activity.description;
  }

  closeEditActivity() {
    [this._overlay, this._formActionBtn, this._editFormBtn].forEach(
      (element) => {
        element.addEventListener("click", (e) => {
          this._formEdit.classList.toggle("hidden");
          this._overlay.classList.toggle("hidden");
        });
      },
    );
  }

  // HANDLE DELETE FORM
  deleteActivites(activities, handler) {
    [this._rowContainer, this._detailContainer].forEach((editBtn) => {
      editBtn.addEventListener("click", (e) => {
        let selectEl;

        editBtn === this._rowContainer
          ? (selectEl = e.target.closest(".btn-delete"))
          : (selectEl = e.target.closest(".btn-panel--secondary"));

        if (!selectEl) return;

        selectEl === e.target.closest(".btn-delete")
          ? (this._selectActivityId = Number(
              e.target.closest(".list-row").dataset.id,
            ))
          : (this._selectActivityId = Number(
              e.target.closest(".detail-panel").dataset.id,
            ));

        if (!editBtn || !this._selectActivityId) return;

        const activityEl = document.querySelector(".list-row");

        activityEl.remove();
        this._detailDefaultValue();
        handler(this._selectedActivity);
      });
    });
  }

  _detailDefaultValue() {
    this._detailContainer.dataset.id = "";

    this._detailCategory.textContent = "Category";
    this._detailCategory.className = `badge-category badge--work`;
    this._detailTitle.textContent = "Select Your Activity...";
    this._detailDate.textContent = "";
    this._detailDuration.textContent = "";
    this._detailTimeSesstion.textContent = "";
    this._detailNotes.textContent = "your note/description...";
  }
}
export default new ActivitiesViews();
