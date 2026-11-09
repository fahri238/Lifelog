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

  // move to activity detail

  // category list el
  _btnCategory = document.querySelectorAll(".btn-category");
  _allCategory = document.querySelectorAll(".btn-category")[0];
  _workCategory = document.querySelectorAll(".btn-category")[1];
  _studyCategory = document.querySelectorAll(".btn-category")[2];
  _exerciseCategory = document.querySelectorAll(".btn-category")[3];
  _socialCategory = document.querySelectorAll(".btn-category")[4];
  _hobbyCategory = document.querySelectorAll(".btn-category")[5];

  // newest activity
  _newestCardContainer = document.querySelectorAll(".card")[0];
  _newestTitle = document.querySelector(".newest__title");
  _newestCategory = document.querySelectorAll(".newest__detail")[0];
  _newestDuration = document.querySelectorAll(".newest__detail")[1];
  _cardFooter = document.querySelector(".card-footer");

  // top category
  _topCategoryContainer = document.querySelectorAll(".card")[3];
  _categoryName = document.querySelector(".category-name");
  _totalCategory = document.querySelector(".total-category");

  // producty time today
  _productyTimeCardContainer = document.querySelectorAll(".card")[2];

  // summaries contents
  _summTotalActivities = document.querySelector(".summary__total-activities");

  // HANDLE LIST OF ACTIVITY
  renderActivityList(activities) {
    activities.forEach((activity) => {
      const listActivityMarkup = `
        <li class="activity" id=${activity.id}>
          <span class="shorter-text">${activity.title}</span>
        </li>

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
    this._cardFooter.textContent = formattedCreatedAt(
      handlerActivity().createdAt,
    );

    handlerActivity();

    this._newestCardContainer.addEventListener("click", (e) => {
      if (!this._newestCardContainer) return;

      this._moveToActivitiesMenu();

      handleGoto(this._newestCardContainer.id);
    });
  }

  // HANDLE TOP CATEGORY
  topCategoryViews(nameCategory, totalCategory, handler) {
    this._categoryName.textContent = nameCategory;
    this._totalCategory.textContent = totalCategory;

    this._topCategoryContainer.addEventListener("click", (e) => {
      const test = [...this._btnCategory].find(
        (activity) => activity.textContent.toLowerCase() === nameCategory,
      );
      this._moveToActivitiesMenu(
        document.querySelector(`.${nameCategory}-category`),
      );

      handler();
    });
  }

  // HANDLE PRODUCTIVE TIME TODAY
  productyTime(handler) {
    const cardDescription = document.querySelectorAll(".card__description")[2];
    cardDescription.textContent = handler();

    this._productyTimeCardContainer.addEventListener("click", () => {
      this._moveToActivitiesMenu();
    });
  }

  // HANDLE TOTAL ACTIVITY THIS WEEK
  totalActivityWeek(
    statusActivityThisWeek,
    totalActivityThisWeek,
    totalActivityLastWeek,
  ) {
    const activitiesThisWeekTotal =
      document.querySelectorAll(".card__description")[1];
    const activitiesLastWeekTotal = document.querySelector(".total-last-week");
    const countStatusTotal = document.querySelector(".count-status");
    const totalActivityWeekContainer = document.querySelectorAll(".card")[1];

    activitiesThisWeekTotal.textContent = totalActivityThisWeek();
    activitiesLastWeekTotal.textContent = totalActivityLastWeek();
    countStatusTotal.textContent = statusActivityThisWeek();

    totalActivityWeekContainer.addEventListener("click", () =>
      this._moveToActivitiesMenu(),
    );
  }

  weeklyActivityChart(activitiesDay, index, maximum) {
    const bars = document.querySelectorAll(".bar");

    const minimumBarHeigth = 0.5;
    const activitiesDayFormat =
      ((!activitiesDay ? minimumBarHeigth : activitiesDay) / maximum) * 100;

    return (bars[index].style.height = `${activitiesDayFormat}%`);
  }

  displayamount(actvitiesDay, index) {
    const bars = document.querySelectorAll(".bar");
    const toolTip = document.getElementById("tooltip");

    bars[index].addEventListener("mouseenter", (e) => {
      toolTip.textContent = actvitiesDay;
      toolTip.classList.remove("hidden");
    });

    bars[index].addEventListener("mousemove", (e) => {
      toolTip.style.left = e.pageX + 6 + "px";
      toolTip.style.top = e.pageY + -10 + "px";
    });

    bars[index].addEventListener("mouseleave", (e) => {
      toolTip.classList.add("hidden");
    });
  }

  // summaries contents
  summaryTotalActivities(activitiesHandler) {
    this._summTotalActivities.textContent = activitiesHandler();
  }

  // activities this vs last week chart
  thisVsLastActivityView(data) {
    const weeksBarContainer = document.querySelectorAll(".summary__bar-week");

    const thisWeekBar = document.querySelectorAll(".chart-progress")[0];
    const thisWeekTotal = document.querySelectorAll(".label-total")[0];

    const lastWeekBar = document.querySelectorAll(".chart-progress")[1];
    const lastWeekTotal = document.querySelectorAll(".label-total")[1];

    weeksBarContainer.forEach((container) => {
      container.style.width = data.totalTwoWeeks;
    });

    thisWeekBar.style.width = data.thisWeekPersen;
    thisWeekTotal.textContent = data.thisWeekTotal;

    lastWeekBar.style.width = data.lastWeekPersen;
    lastWeekTotal.textContent = data.lastWeekTotal;
  }

  // move to activities menu
  // default value = category all
  _moveToActivitiesMenu(
    categoryFocus = document.querySelector(".all-category"),
  ) {
    sidebarView.menusEl.forEach((menu) => menu.classList.remove("menu__focus"));
    this._activityMenu.classList.add("menu__focus");

    sidebarView.contentsEl.forEach((content) =>
      content.classList.add("hidden"),
    );
    this._activityContent.classList.remove("hidden");

    this._btnCategory.forEach((btn) =>
      btn.classList.remove("btn-category-focus"),
    );
    categoryFocus.classList.add("btn-category-focus");
  }
}

export default new DashboardViews();
