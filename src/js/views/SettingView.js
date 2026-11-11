import { errorMessage, succesMessage } from "../helpers/utils";

class SettingsView {
  _usernameBio = document.querySelector(".user-name-bio");
  _roleBio = document.querySelector(".role-bio");

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
}

export default new SettingsView();
