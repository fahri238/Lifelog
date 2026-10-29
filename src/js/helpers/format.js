import { dateSorting } from "../model/activityManager";

export const _numbersOnly = (numbers) => {
  return numbers.replace(/\D/g, "");
};

export const formattedDate = (date) => {
  const dateObject = new Date(date);
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return dateFormatted.format(dateObject);
};

export const formatedHoursMinutes = (time) => {
  const hoursObject = new Date(time);
  const hoursFormatted = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return hoursFormatted.format(hoursObject);
};

export const getIdActivity = () => {
  return Date.now();
};

export const getDurationMin = (duration) => {
  const hour = Number(_numbersOnly(duration).slice(0, 2));
  const min = Number(_numbersOnly(duration).slice(2));
  return hour * 60 + min;
};

export const getTimeNow = () => {
  const timeNow = new Date();
  return timeNow;
};

export const formattedCreatedAt = (unformatedDate) => {
  const unformated = new Date(unformatedDate);

  return `${formattedDate(unformated)}, ${formatedHoursMinutes(unformated)}`;
};
