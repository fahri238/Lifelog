import {
  deleteCategoryModel,
  editCategoryModel,
  getCategories,
  getUserProfile,
  initialCategoryModel,
  userProfileModel,
} from "../model/settingsModel";
import { addCategoryModel } from "../model/settingsModel";
import { getActivityData } from "../model/state";
import activitiesView from "../views/activitiesView";
import { renderSelectInputCategory } from "../views/components/selectInputCategory";
import SettingView from "../views/SettingView";

const initialDefaultCategory = () => {
  initialCategoryModel();
};

// USER PROFILE
const userSettingController = () => {
  SettingView.inputUserProfile((username, role) => {
    userProfileModel(username, role);
  });

  const { username, role } = getUserProfile();
  SettingView.userSettingView(username, role);
};

// MANAGE CATEGORIES

// refresh render categories inside multiple menus (setting, activities, addactivities)
const refreshCategories = () => {
  const categories = getCategories().map((item) => item.category);
  renderSelectInputCategory(categories);
  activitiesView.renderCategoryTab([...categories].reverse())
};

const addCategoryController = () => {
  getCategories().forEach((category) => SettingView.renderCategory(category));

  SettingView.addCategoryView((newCategory, badgeColor) => {

    // activitiesView.categories(activitiesData);
    addCategoryModel(newCategory, badgeColor);
    refreshCategories();
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
    refreshCategories();
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
    refreshCategories();
  });
};

export const init = () => {
  initialDefaultCategory();
  refreshCategories();
  userSettingController();
  addCategoryController();
  editCategoryController();
  deleteCategoryController();
};
