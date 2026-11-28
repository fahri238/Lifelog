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

// refresh render categories inside multiple menus (setting, activities, addactivities)
const refreshCategories = () => {
  const categories = getCategories().map((item) => item.category);
  const lastActivityCategory = getNewestActivity(getActivityData()).category;

  // Activities Menu
  renderSelectInputCategory(categories);
  activitiesView.removeActivityList();
  getActivityData().forEach((activity) =>
    activitiesView.renderActivityList(activity),
  );
  
  // Activities & Add Activities Menu
  activitiesView.renderCategoryTab([...categories].reverse());

  // Dashboard Menu
  DashboardView.renderCategoryNewest(lastActivityCategory);
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
    const activitiesData = getActivityData();

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
