import { formattedDate } from "../helpers/format.js";

class ActivitiesViews {
  _detailCategory = document.getElementById("detail-category");
  _detailTitle = document.getElementById("detail-title");
  _detailDate = document.getElementById("detail-date");
  _detailDuration = document.getElementById("detail-duration");
  _detailTimeSesstion = document.getElementById("detail-time-session");
  _detailNotes = document.getElementById("detail-notes");
  _rowContainer = document.querySelector(".row-container");
  _btnEdit = document.querySelector(".btn-edit");
  _formEdit = document.querySelector(".form-panel__edit");
  _overlay = document.querySelector(".overlay-blur");

  _detailValue(activity) {
    this._detailCategory.textContent = activity.category;
    this._detailCategory.className = `badge-category badge--${activity.category}`;
    this._detailTitle.textContent = activity.title;
    this._detailDate.textContent = formattedDate(activity.date);
    this._detailDuration.textContent = `${activity.startTime} - ${activity.endTime}`;
    this._detailTimeSesstion.textContent = activity.duration;
    this._detailNotes.textContent = activity.description;
  }

  renderDetailActivity(activityData) {
    const rowContainer = document.querySelector(".row-container");
    rowContainer.addEventListener("click", (e) => {
      const selectEl = e.target.closest(".list-row");
      if (!selectEl) return;

      const activityId = selectEl.dataset.id;
      console.log(activityId);

      const selectDetail = activityData.find((activity) => {
        return activity.id === Number(activityId);
      });

      this._detailValue(selectDetail);
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
        <button class="btn-icon btn-edit" title="Edit">
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
  editActivity() {
    this._rowContainer.addEventListener("click", (e) => {
      const selectEl = e.target.closest(".btn-edit");
      if (!selectEl) return;

      this._formEdit.classList.toggle("hidden");
      this._overlay.classList.toggle("hidden");

      console.log("test");
    });
  }

  _closeBtn = document.querySelector(".btn-form--close");
  closeEditActivity() {
    [this._overlay, this._closeBtn].forEach((element) => {
      element.addEventListener("click", (e) => {
        this._formEdit.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden");
      });
    });
  }
}
export default new ActivitiesViews();
