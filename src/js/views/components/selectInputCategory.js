export const renderSelectInputCategory = (categories) => {
  const selectItems = document.querySelectorAll(".base-category");
  selectItems.forEach((item) => item.remove());

  categories.forEach((category) => selectCategoriesMarkup(category));
};

const selectCategoriesMarkup = (category) => {
  const selectCategory = document.querySelectorAll(".select-placeholder");

  const markupSelect = `
      <option class="select-input-category base-category" value="${category.toLowerCase()}">${category}</option>
      `;

  selectCategory.forEach((element) =>
    element.insertAdjacentHTML("afterend", markupSelect),
  );
};
