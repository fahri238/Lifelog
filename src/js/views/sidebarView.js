class SidebarView {
  parentEl = document.querySelector(".menus");
  menusEl = document.querySelectorAll(".menu");
  contentsEl = document.querySelectorAll(".section-container");
  iconsEl = document.querySelectorAll(".menu__icon");

  setFocusMenu() {
    this.parentEl.addEventListener("click", (e) => {
      e.preventDefault();
      const selectEl = e.target.closest(".menu");
      if (!selectEl) return;

      this.menusEl.forEach((menu) => menu.classList.remove("menu__focus"));
      selectEl.classList.add("menu__focus");

      const selectedIcon = selectEl.querySelector(".menu__icon");
      const classIcon = [...selectedIcon.classList].at(0);
      const classIconActive = `${classIcon}-fill`;
      const classIcons = [...this.iconsEl].map((iconEl) =>
        [...iconEl.classList].at(0),
      );

      this.iconsEl.forEach((icon, i) => {
        console.log(classIcons[3])
        return icon.classList.replace(classIcons[i] ,`${classIcons[i]}-fill`);
      });

      this.contentsEl.forEach((content) => content.classList.add("hidden"));
      const targetId = selectEl.getAttribute("href");

      // selected content
      const targetContent = document.querySelector(targetId);
      if (targetContent) targetContent.classList.remove("hidden");
    });
  }
}

export default new SidebarView();
