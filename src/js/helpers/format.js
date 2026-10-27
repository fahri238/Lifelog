export const _numbersOnly = (numbers) => {
  return (numbers.replace(/\D/g, ""));
} 

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

export const getDurationMin = (duration) => {
  const hour = Number(_numbersOnly(duration).slice(0, 2));
  const min = Number(_numbersOnly(duration).slice(2));
  // console.log((hour * 60) + min);
  return (hour * 60) + min;
}
