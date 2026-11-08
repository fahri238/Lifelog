import { DEFAULT_TIME, GOAL_STATES } from "../config";
import { getTodayDateString } from "../helpers/utils";
import { getActivityData } from "./state";
import { state } from "./state";
import {
  formattedDuration,
  getDurationMin,
  getIdActivity,
} from "../helpers/format";

// return formatted time difference
export const countTimeDifference = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);

  let [endHour, endMinute] = endTime.split(":").map(Number);

  const startMinutesTotal = startHour * 60 + startMinute;
  let endMinutesTotal = endHour * 60 + endMinute;

  if (endMinutesTotal < startMinutesTotal) endMinutesTotal += 24 * 60;

  const diffMinutes = endMinutesTotal - startMinutesTotal;

  const displayHours = Math.floor(diffMinutes / 60);
  const displayMinutes = diffMinutes % 60;

  return `${String(displayHours).padStart(2, "0")}h ${String(displayMinutes).padStart(2, "0")}m`;
};

export const getGoalState = (count) => {
  if (count >= GOAL_STATES.achieved.min) return GOAL_STATES.achieved;
  if (count >= GOAL_STATES.medium.min) return GOAL_STATES.medium;
  if (count >= GOAL_STATES.low.min) return GOAL_STATES.low;
  return GOAL_STATES.empty;
};

export const getTodayRange = (dateRange = getTodayDateString()) => {
  const startDate = new Date(dateRange + "T00:00:00");
  const endDate = new Date(dateRange + "T23:59:59");

  const todayRangeActivity = getActivityData().filter((activity) => {
    const itemDate = new Date(activity.createdAt);

    return itemDate >= startDate && itemDate <= endDate;
  });

  return todayRangeActivity;
};

export const processdailyCounter = () => {
  const savedData = localStorage.getItem("activity_data_tracker");
  let currentCount = getActivityData() ? getTodayRange().length : 0;

  if (savedData !== getTodayDateString()) {
    currentCount = 0;
    localStorage.setItem("activity_data_tracker", getTodayDateString());
    localStorage.setItem("activity_daily_count", "0");
  }

  const stateDailyGoal = getGoalState(currentCount);

  return { currentCount, stateDailyGoal };
};

export const alphabetSorting = (activitiesState) => {
  return [...activitiesState].sort((a, b) => b.title.localeCompare(a.title));
};

export const alphabetSortingDescending = (activitiesState) => {
  return [...activitiesState].sort((a, b) => a.title.localeCompare(b.title));
};

export const durationSorting = (activitiesState) => {
  return [...activitiesState].sort(
    (a, b) => getDurationMin(b.duration) - getDurationMin(a.duration),
  );
};

export const dateSorting = (activitiesState) => {
  return [...activitiesState].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
};

export const defaultSorting = (activitiesState) => {
  return activitiesState;
};

export const countDuration = (hourMin) => {
  if (!hourMin) return;
  let [hour, min] = hourMin.replace(/[^0-9 ]/g, "").split(" ");

  hour = Number(hour);
  min = Number(min);
  const totalDurationInHour = hour + min / 60;

  return totalDurationInHour;
};

export const topCategoryModel = () => {
  if (!activities) return;
  const countCategory = [...getActivityData()].reduce((acc, activity) => {
    const activityCategory = activity.category;
    acc[activityCategory] = (acc[activityCategory] || 0) + 1;
    return acc;
  }, {});

  const categoryArray = Object.values(countCategory);
  const totalHigestCategory = Math.max(...categoryArray);

  const higestCategory = Object.keys(countCategory).reduce((a, b) => {
    return countCategory[a] > countCategory[b] ? a : b;
  });

  return [higestCategory, totalHigestCategory];
};

// handle productivity time today card
export const productivityTodayModel = () => {
  const totalHourToday = getTodayRange().reduce(
    (acc, curr) => countDuration(acc.duration) + countDuration(curr.duration),
    0,
  );

  const singleInputedActivity = getTodayRange().at(-1)
    ? getTodayRange().at(-1).duration
    : "00h 00m";

  return totalHourToday
    ? formattedDuration(totalHourToday)
    : singleInputedActivity;
};

export const getLastWeek = () => {
  const today = new Date();

  const sundayOffset = today.getDate() - today.getDay() - 7;

  const twoWeeksActivty = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(sundayOffset + index);

    return getTodayRange(getTodayDateString(date));
  });

  return {
    thisWeek: twoWeeksActivty.slice(7),
    lastWeek: twoWeeksActivty.slice(0, 7),
  };
};

export const totalActivityThisWeek = () => {
  const thisWeekTotal = getLastWeek()
    .thisWeek.filter((item) => {
      return item.length != 0;
    })
    .map((item) => item.length)
    .reduce((acc, curr) => acc + curr, 0);
  return String(thisWeekTotal).padStart(2, "0");
};

export const totalActivityLastWeek = () => {
  const lastWeekTotal = getLastWeek()
    .lastWeek.filter((item) => {
      return item.length != 0;
    })
    .map((item) => item.length)
    .reduce((acc, curr) => acc + curr, 0);

  return String(lastWeekTotal).padStart(2, "0");
};

export const statusActivityWeek = () => {
  const thisWeek = getLastWeek()
    .thisWeek.filter((item) => {
      return item.length != 0;
    })
    .map((item) => item.length)
    .reduce((acc, curr) => acc + curr, 0);

  const lastWeek = getLastWeek()
    .lastWeek.filter((item) => {
      return item.length != 0;
    })
    .map((item) => item.length)
    .reduce((acc, curr) => acc + curr, 0);

  return thisWeek > lastWeek ? "Higher" : "Lower";
};
