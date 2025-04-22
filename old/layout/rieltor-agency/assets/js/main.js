// Add class to header if scrolled
window.addEventListener('scroll', isMenuScrolled)
document.addEventListener("DOMContentLoaded", isMenuScrolled);

function isMenuScrolled() {
  const header = document.getElementById('header');

  if (window.scrollY > 50) {
    header.classList.add('header-scroll')
  } else {
    header.classList.remove('header-scroll')
  }
}
// Reviews slider
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelector('.reviews__slider');
  const slideItems = document.querySelectorAll('.reviews__slide');
  const totalSlides = slideItems.length;
  const bulletsContainer = document.querySelector('.reviews__bullets');
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');

  let currentIndex = 0;

  // Create bullets
  slideItems.forEach((_, index) => {
      const bullet = document.createElement('button');
      bullet.classList.add('bullet');
      if (index === 0) bullet.classList.add('active');
      bullet.addEventListener('click', () => showSlide(index));
      bulletsContainer.appendChild(bullet);
  });

  const bullets = document.querySelectorAll('.reviews__bullets .bullet');

  function showSlide(index) {
      if (index >= totalSlides) {
          currentIndex = 0;
      } else if (index < 0) {
          currentIndex = totalSlides - 1;
      } else {
          currentIndex = index;
      }

      slides.style.transform = `translateX(${-currentIndex * 100}%)`;
      updateBullets();
  }

  function updateBullets() {
      bullets.forEach((bullet, index) => {
          bullet.classList.toggle('active', index === currentIndex);
      });
  }

  leftArrow.addEventListener('click', () => {
      showSlide(currentIndex - 1);
  });

  rightArrow.addEventListener('click', () => {
      showSlide(currentIndex + 1);
  });

  function autoSlide() {
      showSlide(currentIndex + 1);
  }

  setInterval(autoSlide, 5000); // Change every 5 seconds

  // Initial setup
  showSlide(currentIndex);
});

