export const getTodayDateString = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - offset * 60 * 1000);
  return localToday.toISOString().split("T")[0];
};

export const showDeleteValidation = (handler) => {
  const overlayParentEl = document.querySelector(".delete-modal");
  const cancelBtn = document.getElementById("btn-cancel-delete");
  let confirmBtn = document.getElementById("btn-confirm-delete");
  const overlay = document.querySelector(".overlay");

  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  confirmBtn = newConfirmBtn;

  overlayParentEl.className = "delete-modal overlay";

  [overlayParentEl, cancelBtn].forEach((element) => {
    element.addEventListener("click", (e) => {
      const selectEl = e.target.closest("#btn-cancel-delete");
      const selectElParent = e.target.closest(".delete-modal");

      if (!selectEl && !selectElParent) return;
      overlayParentEl.className = "delete-modal overlay hidden";
    });
  });

  confirmBtn.addEventListener("click", (e) => {
    handler();
    overlayParentEl.className = "delete-modal overlay hidden";
  });
};
