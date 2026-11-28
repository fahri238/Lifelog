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
  _btnAddCategory = document.querySelector(".btn-add-category");
  _btnEditCategory = document.querySelector(".btn-edit-category");
  _allCategories;

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

      // check duplicate category
      if (this._allCategories.includes(formattedString(newCategory)))
        return errorMessage(`${newCategory} category already added!`);

      // check more than 1 word
      if (newCategory.split(" ").length !== 1)
        return errorMessage("The category should contains 1 word!");

      const categoryData = {
        category: newCategory,
        badgeColor: badgeColor,
      };

      this.renderCategory(categoryData);
      handler(newCategory, badgeColor);
      this._inputCategory.value = "";
      succesMessage("New category has been added");
    });
  }

  // edit category
  editCategoryView(handler) {
    let selectedCategory;
    this._categoryListContainer.addEventListener("click", (e) => {
      selectedCategory = e.target.closest(".badge-setting");

      if (!selectedCategory || e.target.closest(".btn-category__delete"))
        return;

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
      if (this._inputCategory.value.length === 0)
        return errorMessage("The category should contains 1 word!");

      const categoryEditObj = {
        selectedCategory: selectedCategory.textContent.trim(),
        editedCategory: uppercaseAtFirst(this._inputCategory.value),
      };

      // check if there's no changes
      if (categoryEditObj.selectedCategory === categoryEditObj.editedCategory)
        return errorMessage("No changes were made");
      // check duplicate category
      if (
        this._allCategories.includes(
          formattedString(categoryEditObj.editedCategory),
        )
      )
        return errorMessage(
          `${categoryEditObj.editedCategory} category already added!`,
        );
      // check input more than 1 word
      if (categoryEditObj.editedCategory.split(" ").length !== 1) {
        return errorMessage("The category should contains 1 word!");
      }

      // early render changes, and empty the input
      const categoryText = selectedCategory.querySelector(".category-text");
      categoryText.textContent = categoryEditObj.editedCategory;
      this._inputCategory.value = "";

      // change the btns, remove edit btn, and display add btn (default)
      this._btnEditCategory.classList.add("hidden");
      this._btnAddCategory.classList.remove("hidden");

      handler(categoryEditObj);
      succesMessage("Category has been edited");
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

        selectedCategory.textContent;

        handleDelete(formattedCategory);
        succesMessage(`${formattedCategory} category has been deleted`);
      }, "category");
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
      ><span class="category-text">${category}</span> <i class="bi bi-x btn-category__delete" ></i>
      </span>
      `;

    this._categoryListContainer.insertAdjacentHTML("afterbegin", markupList);
  }
}

export default new SettingsView();
