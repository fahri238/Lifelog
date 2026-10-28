import { state } from "../model/state";
import sortingViews from "../views/sortingViews";
import {
  alphabetSorting,
  dateSorting,
  defaultSorting,
  durationSorting,
} from "../model/activityManager";

export const sortingDefaultController = () => {
  const sortType = state.sortType;

  const sortingMap = {
    default: defaultSorting(),
    date: dateSorting(),
    alphabet: alphabetSorting(),
    duration: durationSorting(),
  };

  sortingViews.sortingActivity((userChoice) => {
    const dynamicSortingType = sortingMap[userChoice] || sortingMap.default;

    sortingViews.renderActivites(dynamicSortingType);
  });
};
