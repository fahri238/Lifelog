import sidebarView, * as SideBar from "./sidebarView";

class DashboardViews {
  _activityListContainer = document.querySelector(".activities-list");
  _activityMenu = document.getElementById("activity-menu");
  _activityContent = document.getElementById("activities");
  _sortBtn = document.getElementsByClassName("activities__sort")

  renderActivityList(activities) {
    const listActivityMarkup = `
        <li class="activity" id=${activities.id}>${activities.title}</li>
    `;

    this._activityListContainer.insertAdjacentHTML(
      "afterbegin",
      listActivityMarkup,
    );
  }

  goToClickedActivity(handler) {
    const activityEl = document.querySelectorAll(".activity");
    activityEl.forEach((elemen) =>
      elemen.addEventListener("click", (e) => {
        sidebarView.menusEl.forEach((menu) =>
          menu.classList.remove("menu__focus"),
        );
        this._activityMenu.classList.add("menu__focus");

        sidebarView.contentsEl.forEach((content) =>
          content.classList.add("hidden"),
        );
        this._activityContent.classList.remove("hidden");

        const selectedActivity = e.target.closest(".activity");

        handler(selectedActivity.id);
      }),
    );
  }

  sortingListOfActivities(activities) {
    
  }
}

export default new DashboardViews();
