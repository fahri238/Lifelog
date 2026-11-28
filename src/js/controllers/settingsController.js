import { topCategoryModel } from "../model/activityManager";
import { getNewestActivity } from "../model/dashboardModel";
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
import DashboardView from "../views/DashboardView";
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

// refresh render categories inside multiple menus (setting, activities, addactivities & dashboard)
const refreshCategories = () => {
  const categories = getCategories().map((item) => item.category);
  const lastActivityCategory = getNewestActivity(getActivityData()).category;
  const { categoryName, _ } = topCategoryModel();

  // Activities Menu
  activitiesView.removeActivityList();
  getActivityData().forEach((activity) =>
    activitiesView.renderActivityList(activity),
  );

  // Activities & Add Activities Menu
  renderSelectInputCategory(categories);
  activitiesView.renderCategoryTab([...categories].reverse());

  // Dashboard Menu
  DashboardView.renderCategoryNewest(lastActivityCategory);
  DashboardView.renderTopCategory(categoryName);
};

const addCategoryController = () => {
  getCategories().forEach((category) => SettingView.renderCategory(category));

  SettingView.addCategoryView((newCategory, badgeColor) => {
    addCategoryModel(newCategory, badgeColor);
    refreshCategories();
  });
};

const editCategoryController = () => {
  SettingView.editCategoryView((editedCategoryObj) => {
    const { selectedCategory, editedCategory } = editedCategoryObj;
    editCategoryModel(selectedCategory, editedCategory);

    refreshCategories();
  });
};

const deleteCategoryController = () => {
  SettingView.deleteCategoryView((category) => {
    deleteCategoryModel(category);

    refreshCategories();
  });
};

export const init = () => {
  const categories = getCategories().map((item) => item.category);
  activitiesView.renderCategoryTab([...categories].reverse());

  initialDefaultCategory();
  userSettingController();
  addCategoryController();
  editCategoryController();
  deleteCategoryController();
};
