import activitiesView from "./activitiesView";

class SortingViews {
  _sortContainer = document.querySelector("#sort");
  _listContainer = document.querySelector(".row-container");
  _defaultSorting = document.querySelector(".default-sort");

  sortingActivity(handler) {
    this._sortContainer.addEventListener("change", () => {
      const userChoice = this._sortContainer.value;

      handler(userChoice);
    });
  }

  renderActivites(sortedData) {
    this._activitiesMarkup(sortedData);
  }

  _activitiesMarkup(sortedData) {
    activitiesView.removeActivityList();
    sortedData.forEach((activity) =>
      activitiesView.renderActivityList(activity),
    );
  }
}

export default new SortingViews();
