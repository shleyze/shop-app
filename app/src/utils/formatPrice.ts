export function formatPrice(price: number) {
  return new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(price);
}
