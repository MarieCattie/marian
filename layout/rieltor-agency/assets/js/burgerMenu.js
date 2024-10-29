let burger = document.getElementById('burger');
let menu = document.getElementById('menu');
let wrap = document.querySelector('main');

let footer = document.querySelector('footer');

document.addEventListener("DOMContentLoaded", ready);
window.addEventListener("resize", ready);

function ready() {
    if(window.innerWidth < 867) {
        menu.classList.add('menu')
    } else {
        menu.classList.remove('menu')
    }
}

// Open menu
function calcShowMenu(showMenu) {
    burger.classList.toggle("burger-open", showMenu);
    // menu.classList.toggle("menu", showMenu);
    menu.classList.toggle("menu-open", showMenu);
    menu.classList.toggle("menuMoveLeft", showMenu);
    const menuWidth = menu.offsetWidth;
}

let showMenu = false

// Click on burger
burger.addEventListener('click', () => calcShowMenu(showMenu = !showMenu));

// Close menu when click on menu item
document.getElementById('menu').onclick = function (event) {
    var target = event.target;
    if (target.tagName == 'A') {
        calcShowMenu(showMenu = !showMenu)
    }
}

// Close menu when click outside the menu
window.addEventListener('mousedown', event => {
    if (!event.target.closest(".menu, .burger"))
        calcShowMenu(showMenu = false);
})
window.addEventListener('touchstart', event => {
    if (!event.target.closest(".menu, .burger"))
        calcShowMenu(showMenu = false);
})

// Hover on burger
burger.onmouseover = function () {
    burger.classList.toggle("hoverBurger");
}
burger.onmouseout = function () {
    burger.classList.toggle("hoverBurger");
}