import {
  badgeColorGenerator,
  errorMessage,
  formattedString,
  showDeleteValidation,
  succesMessage,
  uppercaseAtFirst,
} from "../helpers/utils";

class SettingsView {
  _usernameBio = document.querySelector(".user-name-bio");
  _roleBio = document.querySelector(".role-bio");

  _inputCategory = document.querySelector(".input-category");
  _categoryListContainer = document.querySelector(".category-badges-list");
  _allCategories;
  _btnAddCategory = document.querySelector(".btn-add-category");
  _btnEditCategory = document.querySelector(".btn-edit-category");

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
  // add category
  addCategoryView(handler) {
    this._btnAddCategory.addEventListener("click", (e) => {
      if (this._inputCategory.value.length === 0)
        return errorMessage("This field is required!");

      this._allCategories = [
        ...document.querySelectorAll(".badge-setting"),
      ].map((element) => formattedString(element.textContent));

      const newCategory = uppercaseAtFirst(this._inputCategory.value);
      const badgeColor = badgeColorGenerator();

      if (this._allCategories.includes(formattedString(newCategory)))
        return errorMessage(`${newCategory} category already added!`);

      if (newCategory.split(" ").length !== 1)
        return errorMessage("The category should contains 1 word!");

      const categoryData = {
        category: newCategory,
        badgeColor: badgeColor,
      };

      this.renderCategory(categoryData);
      handler(newCategory, badgeColor);
      succesMessage("New category has been added");
    });
  }

  // delete cotegory
  deleteCategoryView(handleDelete) {
    this._categoryListContainer.addEventListener("click", (e) => {
      const btnDelete = e.target.closest(".btn-category__delete");
      if (!btnDelete) return;
      const selectedCategory = e.target.closest(".badge-setting");
      this._inputCategory.value = "";
      const formattedCategory = selectedCategory.textContent.trim();
      showDeleteValidation(() => {
        selectedCategory.remove();
        handleDelete(formattedCategory);
        succesMessage(`${formattedCategory} category has been deleted`);
      }, "category");
    });
  }

  // edit category
  editCategoryView(handler) {
    let selectedCategory;
    this._categoryListContainer.addEventListener("click", (e) => {
      selectedCategory = e.target.closest(".badge-setting");

      if (!selectedCategory) return;

      this._inputCategory.value = selectedCategory.textContent.trim();
      this._renderBtnAction();
    });

    const btnCancel = document.querySelector(".btn-cancel-category");
    btnCancel.addEventListener("click", () => {
      this._inputCategory.value = "";
      this._btnAddCategory.classList.remove("hidden");
      this._btnEditCategory.classList.add("hidden");
    });

    this._btnEditCategory.addEventListener("click", (e) => {
      const categoryEditObj = {
        selectedCategory: selectedCategory.textContent.trim(),
        editedCategory: uppercaseAtFirst(this._inputCategory.value),
      };
      if (categoryEditObj.selectedCategory === categoryEditObj.editedCategory)
        return errorMessage("No changes were made");

      handler(categoryEditObj);

      // early render changes, and empty the input
      selectedCategory.textContent = categoryEditObj.editedCategory;
      this._inputCategory.value = "";

      // change the btns, remove edit btn, and display add btn (default)
      this._btnEditCategory.classList.add("hidden");
      this._btnAddCategory.classList.remove("hidden");

      succesMessage("Category has been edited");
    });
  }

  _renderBtnAction() {
    this._allCategories = [...document.querySelectorAll(".badge-setting")].map(
      (element) => formattedString(element.textContent),
    );

    const selectedCategory = this._inputCategory.value.trim().toLowerCase();
    if (this._allCategories.includes(selectedCategory)) {
      (this._btnAddCategory.classList.add("hidden"),
        this._btnEditCategory.classList.remove("hidden"));
    }
  }

  renderCategory(categoryData) {
    const { category, badgeColor } = categoryData;

    const markupList = `
      <span class="badge-setting ${badgeColor}"
      >${category} <i class="bi bi-x btn-category__delete" ></i>
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
