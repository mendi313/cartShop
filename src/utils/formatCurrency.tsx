const CURRENCY_FORMATTER = Intl.NumberFormat('he-IL', {
  currency: 'ILS',
  style: 'currency',
});
export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}
