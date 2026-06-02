import { DEFAULT_TIME, GOAL_STATES } from "../config";
import { getTodayDateString } from "../helpers/utils";
import { getActivityData } from "./state";

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

export const processdailyCounter = () => {
  const today = getTodayDateString();

  const savedData = localStorage.getItem("activity_data_tracker");
  let currentCount = getActivityData() ? getActivityData().length : 0;

  if (savedData !== today) {
    currentCount = 0;
    localStorage.setItem("activity_data_tracker", today);
    localStorage.setItem("activity_daily_count", "0");
  }

  const stateDailyGoal = getGoalState(currentCount);

  return { currentCount, stateDailyGoal };
};
