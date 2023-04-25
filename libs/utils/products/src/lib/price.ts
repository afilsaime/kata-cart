import { BOOK_CATEGORY, FIRST_NECESSITIES } from '@kata-cart/models';
export function roundToUpperFiveCents(amount: number): number {
  return Math.ceil(amount / 0.05) * 0.05;
}

export function taxIncludedPrice(
  price: number,
  category: string,
  isImported = false
): number {
  let importationTax = 0;
  let VAT = 0;

  if (!FIRST_NECESSITIES.includes(category)) {
    if (category === BOOK_CATEGORY) {
      VAT = roundToUpperFiveCents(price * 0.1);
    } else {
      VAT = roundToUpperFiveCents(price * 0.2);
    }
  }

  if (isImported) {
    importationTax = roundToUpperFiveCents(price * 0.05);
  }

  return currencyPrecision(price + importationTax + VAT);
}

function currencyPrecision(value: number): number {
  return Number(value.toFixed(2));
}
