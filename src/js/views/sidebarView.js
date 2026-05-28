class SidebarView {
  _parentEl = document.querySelector(".menus");
  _menusEl = document.querySelectorAll(".menu");
  _contentsEl = document.querySelectorAll(".section-container");

  setFocusMenu() {
    this._parentEl.addEventListener("click", (e) => {
      e.preventDefault();
      const selectEl = e.target.closest(".menu");
      if (!selectEl) return;

      this._menusEl.forEach((menu) => menu.classList.remove("menu__focus"));
      selectEl.classList.add("menu__focus");

      this._contentsEl.forEach((content) => content.classList.add("hidden"));
      const targetId = selectEl.getAttribute("href");
      
      // selected content
      const targetContent = document.querySelector(targetId);
      if (targetContent) targetContent.classList.remove("hidden");
    });
  }
}

export default new SidebarView();
