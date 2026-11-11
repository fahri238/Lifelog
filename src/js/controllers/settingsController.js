import { getUserProfile, userProfileModel } from "../model/settingsModel";
import SettingView from "../views/SettingView";

export const userSettingController = () => {
  SettingView.inputUserProfile((username, role) => {
    userProfileModel(username, role);
  });

  const {username, role} = getUserProfile();
  SettingView.userSettingView(username, role);
};
