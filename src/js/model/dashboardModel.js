import { getActivityData } from "./state";
import { getTodayDateString } from "../helpers/utils";
import { formattedDuration } from "../helpers/format";
import { getTodayRange } from "./activityManager";


// DASHBOARD
export const getNewestActivity = (activitiesData) => {
  const lastActivity = activitiesData.at(-1);
  return lastActivity;
};

export const topCategoryModel = () => {
  if (!getActivityData()) return;
  const countCategory = [...getActivityData()].reduce((acc, activity) => {
    const activityCategory = activity.category;
    acc[activityCategory] = (acc[activityCategory] || 0) + 1;
    return acc;
  }, {});

  const categoryArray = Object.values(countCategory);

  // total highest category
  const totalHigestCategory = Math.max(...categoryArray);

  // highest category
  const highestCategory = Object.keys(countCategory).reduce((a, b) => {
    return countCategory[a] > countCategory[b] ? a : b;
  });

  return { categoryName: highestCategory, categoryTotal: totalHigestCategory };
};

// handle productivity time today card
export const productivityTodayModel = () => {
  if (!getActivityData()) return;
  const singleInputedActivity = getTodayRange().at(-1)
    ? getDurationMin(getTodayRange().at(-1).duration)
    : 0;

  if (getTodayRange().length === 0 || getTodayRange().length === 1)
    return formattedDuration(singleInputedActivity / 60);

  const totalHourToday = getTodayRange().reduce(
    (acc, curr) => countDuration(acc.duration) + countDuration(curr.duration),
  );

  return formattedDuration(totalHourToday);
};

export const getLastWeek = () => {
  if (!getActivityData()) return;

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
  if (!getActivityData()) return;
  const thisWeekTotal = getLastWeek()
    .thisWeek.filter((item) => {
      return item.length != 0;
    })
    .map((item) => item.length)
    .reduce((acc, curr) => acc + curr, 0);
  return String(thisWeekTotal).padStart(2, "0");
};

export const totalActivityLastWeek = () => {
  if (!getActivityData()) return;

  const lastWeekTotal = getLastWeek()
    .lastWeek.filter((item) => {
      return item.length != 0;
    })
    .map((item) => item.length)
    .reduce((acc, curr) => acc + curr, 0);

  return String(lastWeekTotal).padStart(2, "0");
};

export const statusActivityWeek = () => {
  if (!getActivityData()) return;
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

// get total activity for the last two weeks
export const totalLastTwoWeek = () => {
  if (!getActivityData()) return;

  const totalThisWeek = getLastWeek()
    .thisWeek.map((day) => day.length)
    .reduce((acc, curr) => acc + curr, 0);

  const totalLastWeek = getLastWeek()
    .lastWeek.map((day) => day.length)
    .reduce((acc, curr) => acc + curr, 0);

  const lastTwoWeeks = {
    totalThisWeek: totalThisWeek,
    totalLastWeek: totalLastWeek,
    totalLasTwotWeeks: totalThisWeek + totalLastWeek,
  };

  return lastTwoWeeks;
};

export const weatherStatusModel = async () => {
  try {
    const baseUrl = import.meta.env.VITE_WEATHER_API_URL;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    // api docs
    // [base_url]key=[apiKey]&q=[City]

    const res = await fetch(`${baseUrl}key=${apiKey}&q=Banjarmasin`);
    const data = await res.json();

    return {
      isDay: data.current.is_day,
      code: data.current.condition.code,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
    };
  } catch (error) {
    console.log(error);
  }
};
