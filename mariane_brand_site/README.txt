MARIANÉ — статический адаптивный сайт

Файлы:
- index.html
- styles.css
- script.js

Как вставить изображения:
1. Создайте рядом папку images.
2. В index.html найдите блоки с классом image-placeholder.
3. Замените каждый такой блок на обычный тег img.

Пример:
<div class="image-placeholder hero-image">
  <span>ГЛАВНОЕ ИЗОБРАЖЕНИЕ</span>
</div>

заменить на:

<div class="hero-image">
  <img src="images/hero.jpg" alt="MARIANÉ">
</div>

Классы размеров уже настроены:
hero-image
product-image
collection-photo
smolensk-shirt
illustration-large
gallery-image

Сайт адаптирован под компьютер, планшет и телефон.
