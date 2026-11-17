import {
  badgeColorGenerator,
  errorMessage,
  formattedString,
  succesMessage,
  uppercaseAtFirst,
} from "../helpers/utils";

class SettingsView {
  _usernameBio = document.querySelector(".user-name-bio");
  _roleBio = document.querySelector(".role-bio");

  _inputCategory = document.querySelector(".input-category");
  _categoryListContainer = document.querySelector(".category-badges-list");
  _allCategories;
  _btnAddAction = document.querySelectorAll(".btn-action-category")[0];
  _btnEditAction = document.querySelectorAll(".btn-action-category")[1];

  // USER PROFILE
  userSettingView(username, role) {
    this._usernameBio.textContent = username;
    this._roleBio.textContent = role;
  }

  inputUserProfile(handler) {
    const userNameForm = document.getElementById("user-name");
    const userRoleForm = document.getElementById("user-role");
    const btnSetting = document.querySelector(".btn-setting");

    btnSetting.addEventListener("click", () => {
      if (userNameForm.value.length === 0 || userRoleForm.value.length === 0) {
        errorMessage("Please fill in all required fields.");
      } else {
        this._usernameBio.textContent = userNameForm.value;
        this._roleBio.textContent = userRoleForm.value;
        handler(userNameForm.value, userRoleForm.value);
        succesMessage("Form submitted successfully!");
      }
    });
  }

  // MANAGE CATEGORIES
  addCategoryView(handler) {
    const btnAddCategory = document.querySelector(".btn-add-category");

    btnAddCategory.addEventListener("click", () => {
      if (this._inputCategory.value.length === 0)
        return errorMessage("This field is required!");

      this._allCategories = [
        ...document.querySelectorAll(".badge-setting"),
      ].map((element) => formattedString(element.textContent));

      const newCategory = uppercaseAtFirst(this._inputCategory.value);
      const badgeColor = badgeColorGenerator();

      if (this._allCategories.includes(formattedString(newCategory)))
        return errorMessage(`this ${newCategory} category already added!`);

      if (newCategory.split(" ").length !== 1)
        return errorMessage("The category should contains 1 word!");

      const categoryData = {
        category: newCategory,
        badgeColor: badgeColor,
      };

      this.renderCategory(categoryData);
      handler(newCategory, badgeColor);
    });
  }

  // edit category
  editCategoryView() {
    this._categoryListContainer.addEventListener("click", (e) => {
      const selectedCategory = e.target.closest(".badge-setting");

      if (!selectedCategory) return;

      this._inputCategory.value = selectedCategory.textContent;
      this._renderBtnAction();
    });

    const btnCancel = document.querySelector(".btn-cancel-category");
    btnCancel.addEventListener("click", () => {
      this._inputCategory.value = "";
      this._btnAddAction.classList.remove("hidden");
      this._btnEditAction.classList.add("hidden");
    });
  }

  _renderBtnAction() {
    this._allCategories = [...document.querySelectorAll(".badge-setting")].map(
      (element) => formattedString(element.textContent),
    );

    const selectedCategory = this._inputCategory.value.trim().toLowerCase();
    if (this._allCategories.includes(selectedCategory)) {
      (this._btnAddAction.classList.add("hidden"),
        this._btnEditAction.classList.remove("hidden"));
    }
  }

  renderCategory(categoryData) {
    const { category, badgeColor } = categoryData;

    const markupList = `
      <span class="badge-setting ${badgeColor}"
      >${category} <i class="bi bi-x" ></i>
      </span>
      `;

    this._categoryListContainer.insertAdjacentHTML("afterbegin", markupList);

    const selectCategory = document.querySelectorAll(".select-placeholder");

    const activitiesCategories = document.querySelector(".all-category");

    const markupSelect = `
      <option value="${category.toLowerCase()}">${category}</option>
      `;

    selectCategory.forEach((element) =>
      element.insertAdjacentHTML("afterend", markupSelect),
    );

    const markupCategories = `
      <button class="${category.toLowerCase()}-category btn-category">${category}</button>
      `;

    activitiesCategories.insertAdjacentHTML("afterend", markupCategories);
  }
}

export default new SettingsView();
