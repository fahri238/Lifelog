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
      const classIcon = this.getBaseIcon(selectedIcon);
      const classIconActive = `${classIcon}-fill`;

      this.iconsEl.forEach((icon) => {
        const baseIcon = this.getBaseIcon(icon);
        const activeIcon = `${baseIcon}-fill`;
        icon.classList.replace(activeIcon, baseIcon);
      });
      selectedIcon.classList.replace(classIcon, classIconActive);

      this.contentsEl.forEach((content) => content.classList.add("hidden"));
      const targetId = selectEl.getAttribute("href");

      // selected content
      const targetContent = document.querySelector(targetId);
      if (targetContent) targetContent.classList.remove("hidden");
    });
  }

  getBaseIcon(iconEl) {
    return [...iconEl.classList].at(0).includes("-fill")
      ? [...iconEl.classList].at(0).replace("-fill", "")
      : [...iconEl.classList].at(0);
  }
}

export default new SidebarView();
