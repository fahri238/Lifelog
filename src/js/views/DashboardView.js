import { formattedCreatedAt } from "../helpers/format";
import sidebarView, * as SideBar from "./SidebarView";

class DashboardViews {
  // list of activities
  _activityListContainer = document.querySelector(".activities-list");
  _activityMenu = document.getElementById("activity-menu");
  _activityContent = document.getElementById("activities");
  _sortBtn = document.querySelectorAll(".activities__sort");
  _activitiesEl = document.querySelectorAll(".activity");
  _selectedSort = document.getElementById("ascending-sort");
  _selectedDefaultSorting = document.getElementById("default-sort");

  // newest activity
  _newestCardContainer = document.querySelectorAll(".card")[0];
  _newestTitle = document.querySelector(".newest__title");
  _newestCategory = document.querySelectorAll(".newest__detail")[0];
  _newestDuration = document.querySelectorAll(".newest__detail")[1];
  _newestCreatedAt = document.querySelector(".card__date-create");

  // summaries contents
  _summTotalActivities = document.querySelector(".summary__total-activities");

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

  sortingListOfActivities(handlerAscending, handleDefaultSorting) {
    this._sortBtn.forEach((btnEl) => {
      btnEl.addEventListener("click", (e) => {
        this._sortBtn.forEach((btn) => btn.classList.toggle("hidden"));

        const element = this._activityListContainer;

        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        if (!this._selectedSort.classList.contains("hidden")) {
          return handlerAscending();
        }

        if (!this._selectedDefaultSorting.classList.contains("hidden")) {
          return handleDefaultSorting();
        }
      });
    });
  }

  // HANDLE NEWEST ACTIVITY
  newestActivityView(handlerActivity, handleGoto) {
    this._newestCardContainer.id = handlerActivity().id;
    this._newestTitle.textContent = handlerActivity().title;
    this._newestCategory.textContent = `Category: ${handlerActivity().category}`;
    this._newestDuration.textContent = `Duration: ${handlerActivity().duration}`;
    this._newestCreatedAt.textContent = formattedCreatedAt(
      handlerActivity().createdAt,
    );

    handlerActivity();

    this.moveToActivityMenu(this._newestCardContainer, (id) => {
      handleGoto(id);
    });
  }

  moveToActivityMenu(parentEl, handler) {
    parentEl.addEventListener("click", (e) => {
      if (!parentEl) return;

      // 1. go to activities menu
      sidebarView.menusEl.forEach((menu) =>
        menu.classList.remove("menu__focus"),
      );
      this._activityMenu.classList.add("menu__focus");

      sidebarView.contentsEl.forEach((content) =>
        content.classList.add("hidden"),
      );
      this._activityContent.classList.remove("hidden");

      handler(parentEl.id);
    });
  }

  // summaries contents
  summaryTotalActivities(activitiesHandler) {
    this._summTotalActivities.textContent = activitiesHandler();
  }
}

export default new DashboardViews();
