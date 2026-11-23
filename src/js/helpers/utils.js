export const getTodayDateString = (date = new Date()) => {
  const offset = date.getTimezoneOffset();
  const localToday = new Date(date.getTime() - offset * 60 * 1000);
  return localToday.toISOString().split("T")[0];
};

export const showDeleteValidation = (handler, typeItem = "activity") => {
  const overlayParentEl = document.querySelector(".delete-modal");
  const cancelBtn = document.getElementById("btn-cancel-delete");
  let confirmBtn = document.getElementById("btn-confirm-delete");

  const typeItemHeading = document.querySelectorAll(".type-item")[0];
  const typeItemBody = document.querySelectorAll(".type-item")[1];

  typeItemBody.textContent = typeItem;
  typeItemHeading.textContent = uppercaseAtFirst(typeItem);

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

export const succesMessage = (message) => {
  const succesMessage = document.getElementById("message-success");
  const toastParentEl = document.querySelector(".toast--success");
  succesMessage.textContent = message;
  toastParentEl.classList.remove("hidden");
  setTimeout(() => {
    toastParentEl.classList.add("fade-out");
  }, 3000);
  setTimeout(() => {
    toastParentEl.classList.add("hidden");
    toastParentEl.classList.remove("fade-out");
  }, 3200);
};

export const errorMessage = (message) => {
  const succesMessage = document.getElementById("message-error");
  const toastParentEl = document.querySelector(".toast--error");
  succesMessage.textContent = message;
  toastParentEl.classList.remove("hidden");
  setTimeout(() => {
    toastParentEl.classList.add("fade-out");
  }, 3000);
  setTimeout(() => {
    toastParentEl.classList.add("hidden");
    toastParentEl.classList.remove("fade-out");
  }, 3200);
};

export const badgeColorGenerator = () => {
  const lengtOfCategory = document.querySelectorAll(".badge-setting").length;
  const colors = [
    "badge--work",
    "badge--study",
    "badge--exercise",
    "badge--social",
    "badge--hobby",
  ];

  const colorIndex = lengtOfCategory % 5;

  return colors[colorIndex];
};

export const uppercaseAtFirst = (text) => {
  return text.split("")[0].toUpperCase() + text.slice(1).toLowerCase();
};

export const formattedString = (text) => {
  return text.toLowerCase().trim();
};
