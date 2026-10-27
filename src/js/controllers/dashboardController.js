import dashboardView from "../views/dashboardView";
import { state } from "../model/state";

export const listOfActivityController = () => {
  state.activities.forEach(activity => {
    console.log(activity.title)
    return dashboardView.listOfActivity(activity.title);
  });
};
