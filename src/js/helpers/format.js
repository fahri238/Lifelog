import { state } from "../model/state";

export const formattedDate = (date) => {
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return dateFormatted(date);
};
