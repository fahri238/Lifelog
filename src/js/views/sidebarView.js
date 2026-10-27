class SidebarView {
  parentEl = document.querySelector(".menus");
  menusEl = document.querySelectorAll(".menu");
  contentsEl = document.querySelectorAll(".section-container");

  setFocusMenu() {
    this.parentEl.addEventListener("click", (e) => {
      e.preventDefault();
      const selectEl = e.target.closest(".menu");
      if (!selectEl) return;

      this.menusEl.forEach((menu) => menu.classList.remove("menu__focus"));
      selectEl.classList.add("menu__focus");

      this.contentsEl.forEach((content) => content.classList.add("hidden"));
      const targetId = selectEl.getAttribute("href");
      
      // selected content
      const targetContent = document.querySelector(targetId);
      if (targetContent) targetContent.classList.remove("hidden");
    });
  }
}

export default new SidebarView();
