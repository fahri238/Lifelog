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

const initialDefaultCategory = () => {
  initialCategoryModel();
};

const userSettingController = () => {
  SettingView.inputUserProfile((username, role) => {
    userProfileModel(username, role);
  });

  const { username, role } = getUserProfile();
  SettingView.userSettingView(username, role);
};

const addCategoryController = () => {
  getCategories().forEach((category) => SettingView.renderCategory(category));

  SettingView.addCategoryView((newCategory, colorBadge) => {
    const activitiesData = getActivityData();

    activitiesView.categories(activitiesData);
    addCategoryModel(newCategory, colorBadge);
  });
};

const editCategoryController = () => {
  SettingView.editCategoryView((editedCategoryObj) => {
    const { selectedCategory, editedCategory } = editedCategoryObj;
    editCategoryModel(selectedCategory, editedCategory);

    const activitiesData = getActivityData();

    activitiesView.removeActivityList();
    activitiesData.forEach((activity) =>
      activitiesView.renderActivityList(activity),
    );
    activitiesView.categories(activitiesData);
  });
};

const deleteCategoryController = () => {
  SettingView.deleteCategoryView((category) => {
    deleteCategoryModel(category);
    const activitiesData = getActivityData();

    activitiesView.removeActivityList();
    activitiesData.forEach((activity) =>
      activitiesView.renderActivityList(activity),
    );
  });
};

export const init = () => {
  initialDefaultCategory();
  userSettingController();
  addCategoryController();
  editCategoryController();
  deleteCategoryController();
};
