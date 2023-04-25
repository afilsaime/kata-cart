import { roundToUpperFiveCents, taxIncludedPrice } from './price';

describe('price', () => {
  describe('toUpperFiveCents', () => {
    it('should return 1', () => {
      expect(roundToUpperFiveCents(0.99)).toEqual(1);
      expect(roundToUpperFiveCents(1)).toEqual(1);
    });

    it('should return 1.05', () => {
      expect(roundToUpperFiveCents(1.01)).toEqual(1.05);
      expect(roundToUpperFiveCents(1.02)).toEqual(1.05);
    });
  });

  describe('taxIncludedPrice', () => {
    it('should not have taxes if the product is a fist necessity', () => {
      expect(taxIncludedPrice(1, 'Food')).toEqual(1);
      expect(taxIncludedPrice(1.01, 'Food')).toEqual(1.01);
    });

    it('should have a 10% vat if the product is a book', () => {
      expect(taxIncludedPrice(1, 'Books')).toEqual(1.1);
      expect(taxIncludedPrice(1.01, 'Books')).toEqual(1.16);
    });

    it('should have a 20% vat otherwise', () => {
      expect(taxIncludedPrice(1, 'Other')).toEqual(1.2);
      expect(taxIncludedPrice(1.01, 'Other')).toEqual(1.26);
    });

    it('should have an additional 5% tax if the product is imported', () => {
      expect(taxIncludedPrice(1, 'Food', true)).toEqual(1.05);
      expect(taxIncludedPrice(1, 'Books', true)).toEqual(1.15);
      expect(taxIncludedPrice(1, 'Other', true)).toEqual(1.25);
    });
  });
});
