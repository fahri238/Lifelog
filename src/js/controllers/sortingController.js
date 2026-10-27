import { state } from "../model/state";
import sortingViews from "../views/sortingViews";
import { getDurationMin } from "../helpers/format";
import activitiesView from "../views/activitiesView";
import { renderActivityList } from "./activitiesController";

export const sortingDefaultController = () => {
  const sortType = state.sortType;
  const alphabetSorting = [...state.activities].sort((a, b) =>
    b.title.localeCompare(a.title),
  );

  const durationSorting = [...state.activities].sort((a, b) => {
    return getDurationMin(b.duration) - getDurationMin(a.duration);
  });

  console.log(state.activities)
  const dateSorting = [...state.activities].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  });

  const defaultSorting = state.activities;

  const sortingMap = {
    default: defaultSorting,
    date: dateSorting,
    alphabet: alphabetSorting,
    duration: durationSorting,
  };

  sortingViews.sortingActivity((userChoice) => {
    console.log(sortingMap[userChoice]);
    const dynamicSortingType = sortingMap[userChoice] || sortingMap.default;

    sortingViews.renderActivites(dynamicSortingType);
  });
};
