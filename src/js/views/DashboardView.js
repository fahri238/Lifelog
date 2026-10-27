class DashboardViews {
  _activityListContainer = document.querySelector(".activities-list");

  listOfActivity(activity) {
    this._renderListOfActivityMarkup(activity)
  }

  _renderListOfActivityMarkup(activity) {
    const listActivityMarkup = `
        <li class="activity">${activity}</li>
    `;

    this._activityListContainer.insertAdjacentHTML("afterbegin", listActivityMarkup)
  }
}

export default new DashboardViews();
