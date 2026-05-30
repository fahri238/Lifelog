export const formattedDate = (date) => {
  const dateObject = new Date(date);
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return dateFormatted.format(dateObject);
};

export const getIdActivity = () => {
  return Date.now();
};
