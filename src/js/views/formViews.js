import { getIdActivity } from "../helpers/format";

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
  _previewDuration = document.getElementById("preview-duration");

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
        duration: this._previewDuration.textContent,
      };

      handlerSaveData(formData);
    });
  }

  // editData(activityId, handlerEditData) {
  //   this._formInput.addEventListener("click", (e) => {
  //     const editedData = {
  //       title: activityId._inputTitle.value,
  //       category: activityId._inputCategory.value,
  //       date: activityId._inputDate.value,
  //       startTime: activityId._inputStartTime.value,
  //       endTime: activityId._inputEndTime.value,
  //       description: activityId._inputDescription.value,
  //       duration: activityId._previewDuration.textContent,
  //     };

  //     handlerEditData(editedData)
  //   });
  // }

  resetForm() {
    this._formInput.addEventListener("reset", (e) => {});
  }
}
