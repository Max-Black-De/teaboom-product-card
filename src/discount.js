/**
 * Процент скидки: Math.round((1 - price / oldPrice) * 100).
 * Возвращает 0, если старой цены нет или она не больше текущей.
 * @param {number} price
 * @param {number} oldPrice
 * @returns {number}
 */
export function getDiscountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

/** «−N %»: настоящий минус и узкий неразрывный пробел перед %. */
export function formatDiscount(percent) {
  return `\u2212${percent}\u202F%`;
}
