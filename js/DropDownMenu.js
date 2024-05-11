export class DropDownMenu {
  constructor() {
    this.buttonSelector = '.drop-down-menu';
    this.dropDownMenus = document.querySelectorAll(this.buttonSelector);
    this.init();
  }

  init() {
    // Add a click listener to the whole document
    document.addEventListener('click', (event) => {
      // Check if the clicked element or any of its parents has the 'drop-down-menu' class
      const menuElement = event.target.closest(this.buttonSelector);
      if (menuElement) {
        const dropDownMenu = menuElement.querySelector('.drop-down-menu-items');
        if (dropDownMenu) {
          this.toggleMenu(dropDownMenu);
        }
      } else {
        // If clicked outside, hide any visible dropdown menus
        this.hideAllMenus();
      }
    });
  }

  toggleMenu(menu) {
    if (menu.classList.contains('visible')) {
      // If menu is currently visible, remove 'visible' class immediately
      menu.classList.remove('visible');
      menu.classList.add('hidden');
    } else {
      menu.classList.remove('hidden');
      menu.classList.add('visible');
    }
  }

  hideAllMenus() {
    // Hide all menus by removing 'visible' and adding 'hidden'
    const menus = document.querySelectorAll('.drop-down-menu-items');
    menus.forEach((menu) => {
      if (menu.classList.contains('visible')) {
        menu.classList.remove('visible');
        menu.classList.add('hidden');
      }
    });
  }
}
