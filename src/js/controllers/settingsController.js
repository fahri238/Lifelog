import {
  deleteCategoryModel,
  editCategoryModel,
  getCategories,
  getUserProfile,
  initialCategoryModel,
  userProfileModel,
} from "../model/settingsModel";
import { addCategoryModel } from "../model/settingsModel";
import { getActivityData, state } from "../model/state";
import activitiesView from "../views/activitiesView";
import SettingView from "../views/SettingView";

export const initialDefaultCategory = () => {
  initialCategoryModel();
};

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
  const activitiesData = getActivityData();
  SettingView.editCategoryView((editedCategoryObj) => {
    const { selectedCategory, editedCategory } = editedCategoryObj;
    editCategoryModel(selectedCategory, editedCategory);

    console.log(activitiesData)
    activitiesData.forEach((activity) =>
      activitiesView.renderActivityList(activity),
    );
  });
};

export const deleteCategoryController = () => {
  const activitiesData = getActivityData();
  SettingView.deleteCategoryView((category) => {
    deleteCategoryModel(category);
    activitiesView.removeActivityList();

    activitiesData.forEach((activity) =>
      activitiesView.renderActivityList(activity),
    );
  });
};
