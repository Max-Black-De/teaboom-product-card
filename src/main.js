import { getDiscountPercent, formatDiscount } from './discount.js';

const currency = { style: 'currency', currency: 'RUB' };
const formatters = {
  whole: new Intl.NumberFormat('ru-RU', { ...currency, maximumFractionDigits: 0 }),
  kopecks: new Intl.NumberFormat('ru-RU', { ...currency, minimumFractionDigits: 2 }),
};

/** Копейки показываем, только если они есть: «326,40 ₽», но «1 432 ₽». */
function formatPrice(value) {
  return (Number.isInteger(value) ? formatters.whole : formatters.kopecks).format(value);
}

function initVariants(form) {
  const field = (role) => form.querySelector(`[data-role="${role}"]`);
  const sku = field('sku');
  const price = field('price');
  const oldPrice = field('old-price');
  const oldPriceWrap = field('old-price-wrap');
  const discount = field('discount');
  const announcer = field('announcer');

  function render(input, { announce }) {
    const current = Number(input.dataset.price);
    const old = Number(input.dataset.oldPrice);
    const percent = getDiscountPercent(current, old);
    const label = input.closest('label').textContent.trim();

    sku.textContent = input.dataset.sku;
    price.value = input.dataset.price;
    price.textContent = formatPrice(current);
    oldPrice.value = input.dataset.oldPrice ?? '';
    oldPrice.textContent = percent ? formatPrice(old) : '';
    oldPriceWrap.hidden = !percent;
    discount.hidden = !percent;
    discount.textContent = percent ? formatDiscount(percent) : '';

    if (announce) {
      announcer.textContent = `${label}: ${formatPrice(current)}, артикул ${input.dataset.sku}`;
    }
  }

  form.addEventListener('change', (event) => {
    if (event.target.matches('.variants__input')) render(event.target, { announce: true });
  });
  form.addEventListener('submit', (event) => event.preventDefault());

  const checked = form.querySelector('.variants__input:checked');
  if (checked) render(checked, { announce: false });
}

function initGallery(gallery) {
  const image = gallery.querySelector('.gallery__image');
  const thumbs = [...gallery.querySelectorAll('.gallery__thumb')];

  gallery.addEventListener('click', (event) => {
    const thumb = event.target.closest('.gallery__thumb');
    if (!thumb) return;
    const { src, width, height } = thumb.dataset;
    image.src = src;
    image.width = Number(width);
    image.height = Number(height);
    image.alt = thumb.querySelector('img').alt;
    thumbs.forEach((item) => item.setAttribute('aria-pressed', String(item === thumb)));
  });
}

const form = document.querySelector('.product__form');
const gallery = document.querySelector('.gallery');
if (form) initVariants(form);
if (gallery) initGallery(gallery);
