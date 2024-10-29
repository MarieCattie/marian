let currentIndex = 0;
const slides = document.querySelector('.slides');
const bullets = document.querySelectorAll('.bullet');

function showSlide(index) {
  if (index >= bullets.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = bullets.length - 1;
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

function currentSlide(index) {
  showSlide(index);
}

function autoSlide() {
  showSlide(currentIndex + 1);
}

setInterval(autoSlide, 7000); // Автоматическая смена каждые 3 секунды
