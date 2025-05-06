export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}
export function toBoolean(str: string) {
  return str.toLocaleLowerCase() == "true";
}
