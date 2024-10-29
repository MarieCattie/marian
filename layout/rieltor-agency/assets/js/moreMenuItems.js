// provide for many menu items
// if more than 3, a pop-up menu appears

document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.main-nav__list');
    const items = menu.querySelectorAll('.main-nav__item');
  
    if (items.length > 3) {
        // Creating a point with three points
        const moreItem = document.createElement('li');
        moreItem.classList.add('main-nav__item', 'more');
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            moreItem.appendChild(dot);
        }
  
        // Creating a nested list for the remaining items
        const moreMenu = document.createElement('ul');
        moreMenu.classList.add('more-menu');
  
        // We transfer all the elements starting from the 4th to moreMenu
        for (let i = 3; i < items.length; i++) {
            moreMenu.appendChild(items[i]);
        }
  
        // Adding moreMenu to the "..." item
        moreItem.appendChild(moreMenu);
        menu.appendChild(moreItem);
    }
  });