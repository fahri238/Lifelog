import { errorMessage, succesMessage } from "../helpers/utils";

class SettingsView {
  _usernameBio = document.querySelector(".user-name-bio");
  _roleBio = document.querySelector(".role-bio");

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
  addCategoryView() {
    const inputCategory = document.querySelector(".input-category");
    const categoryListContainer = document.querySelector(
      ".category-badges-list",
    );
    const btnAddCategory = document.querySelector(".btn-add-category");

    const inputSelectCategory = document.querySelector("#activity-category");
    const editSelectCategory = document.querySelector(
      "#activity-category-edit",
    );

    const activitiesCategories = document.querySelector(".category");

    const colors = [
      "badge-color-1",
      "badge-color-2",
      "badge-color-3",
      "badge-color-4",
      "badge-color-5",
    ];

    let initialColor = 5;
    btnAddCategory.addEventListener("click", () => {
      if (inputCategory.value.length === 0)
        return errorMessage("This field is required!");

      const colorGenerator =
        initialColor === 0 ? (initialColor = 4) : (initialColor -= 1);

      const markupList = `
        <span class="badge-setting ${colors[colorGenerator]}"
        >${inputCategory.value} <i class="bi bi-x" ></i>
        </span>
        `;

      categoryListContainer.insertAdjacentHTML("afterbegin", markupList);

      const markupSelect = `
      <option value="${inputCategory.value.toLowerCase()}">${inputCategory.value}</option>
      `;

      [inputSelectCategory, editSelectCategory].forEach((element) =>
        element.insertAdjacentHTML("beforeend", markupSelect),
      );

      const markupCategories = `
      <button class="${inputCategory.value.toLowerCase()}-category btn-category">${inputCategory.value}</button>
      `;

      activitiesCategories.insertAdjacentHTML("beforeend", markupCategories);
    });
  }
}

export default new SettingsView();
