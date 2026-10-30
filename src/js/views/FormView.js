import { getIdActivity, getTimeNow } from "../helpers/format";
import * as activityManager from "../model/activityManager";
import { succesMessage } from "../helpers/utils";

export default class FormView {
  _inputTitle;
  _inputCategory;
  _inputDate;
  _inputStartTime;
  _inputEndTime;
  _inputDescription;
  _formInput;
  _formActionBtn;
  _currentActivity;

  formData(handlerSaveData) {
    this._formInput.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        id: getIdActivity(),
        title: this._inputTitle.value,
        category: this._inputCategory.value,
        date: this._inputDate.value,
        startTime: this._inputStartTime.value,
        endTime: this._inputEndTime.value,
        description: this._inputDescription.value,
        duration: activityManager.countTimeDifference(
          this._inputStartTime.value,
          this._inputEndTime.value,
        ),
        createdAt: getTimeNow(),
      };

      handlerSaveData(formData);
      succesMessage("Activity has been added!");
    });
  }

  resetForm() {
    this._formInput.addEventListener("submit", (e) => {
      this._formInput.reset();
    });
  }
}
