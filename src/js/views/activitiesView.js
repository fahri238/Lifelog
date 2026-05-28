import { formattedDate } from "../helpers/format";


class ActivitiesViews {
  _detailCategory = document.getElementById("detail-category");
  _detailTitle = document.getElementById("detail-title");
  _detailDate = document.getElementById("detail-date");
  _detailDuration = document.getElementById("detail-duration");
  _detailTimeSesstion = document.getElementById("detail-time-session");
  _detailNotes = document.getElementById("detail-notes");

  renderDetailActivity(activityData) {
    this._detailCategory.textContent = activityData.category;
    this._detailTitle.textContent = activityData.title;
    this._detailDate.textContent = formattedDate(activityData.date);
    this._detailDuration.textContent = `${activityData.startTime} - ${activityData.endTime}`;
    this._detailTimeSesstion.textContent = activityData.duration;
    this._detailNotes.textContent = activityData.description;
  }
}
export default new ActivitiesViews();
