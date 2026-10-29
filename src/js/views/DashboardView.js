import sidebarView, * as SideBar from "./sidebarView";

class DashboardViews {
  _activityListContainer = document.querySelector(".activities-list");
  _activityMenu = document.getElementById("activity-menu");
  _activityContent = document.getElementById("activities");
  _sortBtn = document.querySelectorAll(".activities__sort");
  _activitiesEl = document.querySelectorAll(".activity");
  _selectedSort = document.getElementById("ascending-sort");
  _selectedSortDescending = document.getElementById("descending-sort");

  // HANDLE LIST OF ACTIVITY
  renderActivityList(activities) {
    activities.forEach((activity) => {
      const listActivityMarkup = `
        <li class="activity" id=${activity.id}>${activity.title}</li>
    `;

      this._activityListContainer.insertAdjacentHTML(
        "afterbegin",
        listActivityMarkup,
      );
    });
  }

  goToClickedActivity(handler) {
    this._activityListContainer.addEventListener("click", (e) => {
      const selectedActivity = e.target.closest(".activity");

      if (!selectedActivity) return;

      sidebarView.menusEl.forEach((menu) =>
        menu.classList.remove("menu__focus"),
      );
      this._activityMenu.classList.add("menu__focus");

      sidebarView.contentsEl.forEach((content) =>
        content.classList.add("hidden"),
      );
      this._activityContent.classList.remove("hidden");

      handler(selectedActivity.id);
    });
  }

  sortingListOfActivities(handlerAscending, handlerDescending) {
    this._sortBtn.forEach((btnEl) => {
      btnEl.addEventListener("click", (e) => {
        this._sortBtn.forEach((btn) => btn.classList.toggle("hidden"));

        const element = this._activityListContainer;

        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        if (this._selectedSort.classList.contains("hidden")) {
          return handlerAscending();
        }

        if (this._selectedSortDescending.classList.contains("hidden")) {
          return handlerDescending();
        }
      });
    });
  }

  // HANDLE NEWEST ACTIVITY
  
}

export default new DashboardViews();
