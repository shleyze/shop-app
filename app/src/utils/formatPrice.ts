/**
 * Форматирует числовое значение цены в строку с валютой (рубли).
 *
 * Эта функция использует `Intl.NumberFormat` для форматирования цены
 * в соответствии с русской локалью, добавляя символ рубля и убирая
 * дробную часть.
 *
 * @param {number} price - Цена для форматирования.
 * @returns {string} Отформатированная строка цены с символом рубля.
 *
 * @example
 * // Возвращает "1 234 ₽"
 * formatPrice(1234);
 *
 * @example
 * // Возвращает "999 ₽"
 * formatPrice(999.99);
 */
export function formatPrice(price: number) {
  return new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(price);
}
