import {
  editCategoryModel,
  getCategories,
  getUserProfile,
  userProfileModel,
} from "../model/settingsModel";
import { addCategoryModel } from "../model/settingsModel";
import SettingView from "../views/SettingView";

export const userSettingController = () => {
  SettingView.inputUserProfile((username, role) => {
    userProfileModel(username, role);
  });

  const { username, role } = getUserProfile();
  SettingView.userSettingView(username, role);
};

export const addCategoryController = () => {
  getCategories().forEach((category) => SettingView.renderCategory(category));

  SettingView.addCategoryView((newCategory, colorBadge) => {
    return addCategoryModel(newCategory, colorBadge);
  });
};

export const editCategoryController = () => {
  SettingView.editCategoryView((editedCategoryObj) => {
    const { selectedCategory, editedCategory } = editedCategoryObj;
    editCategoryModel(selectedCategory, editedCategory);
  });
};
