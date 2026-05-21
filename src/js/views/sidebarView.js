class SidebarView {
  parentEl = document.querySelector(".menus");
  menusEl = document.querySelectorAll(".menu");

  setFocusMenu(handler) {
    this.parentEl.addEventListener("click", (e) => {
      const selectEl = e.target.closest(".menu");
      if (!selectEl) return;
      this.menusEl.forEach((menu) => menu.classList.remove("menu__focus"));
      selectEl.classList.add("menu__focus");
      

      console.log(selectEl);
    });
  }
}

export default new SidebarView();
