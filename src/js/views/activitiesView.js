import { formattedDate } from "../helpers/format.js";

class ActivitiesViews {
  _detailCategory = document.getElementById("detail-category");
  _detailTitle = document.getElementById("detail-title");
  _detailDate = document.getElementById("detail-date");
  _detailDuration = document.getElementById("detail-duration");
  _detailTimeSesstion = document.getElementById("detail-time-session");
  _detailNotes = document.getElementById("detail-notes");
  _rowContainer = document.querySelector(".row-container");

  renderDetailActivity(activityData) {
    this._detailCategory.textContent = activityData.category;
    this._detailCategory.className = `badge-category badge--${activityData.category}`;
    this._detailTitle.textContent = activityData.title;
    this._detailDate.textContent = formattedDate(activityData.date);
    this._detailDuration.textContent = `${activityData.startTime} - ${activityData.endTime}`;
    this._detailTimeSesstion.textContent = activityData.duration;
    this._detailNotes.textContent = activityData.description;
  }

  renderActivityList(activity) {
    const _rowContainer = document.querySelector(".row-container");
    // _rowContainer.addEventListener("click", (e) => {
    //   const selectEl = e.target.closest(".list-row");
    //   console.log(selectEl);
    // });
    _rowContainer.insertAdjacentHTML("afterbegin", this.activityMarkup(activity))
  }



  activityMarkup(activiy) {
    return  `
    <li class="list-row">
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
    `
  }
}
export default new ActivitiesViews();
