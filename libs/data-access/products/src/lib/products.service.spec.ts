import {
  MOCK_BOOKS_WITH_TAXES,
  MOCK_PRODUCTS,
  MOCK_PRODUCTS_CATEGORIES,
  MOCK_PRODUCTS_WITH_TAXES,
} from '@kata-cart/mocks';
import { ProductsService } from './products.service';
import {
  HttpMethod,
  SpectatorHttp,
  createHttpFactory,
} from '@ngneat/spectator/jest';

describe('ProductsService', () => {
  let spectator: SpectatorHttp<ProductsService>;

  const createHttp = createHttpFactory({
    service: ProductsService,
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should get the products from the api', (done) => {
    spectator.service.products$.subscribe((products) => {
      expect(products).toEqual(MOCK_PRODUCTS_WITH_TAXES);
      done();
    });

    const req = spectator.expectOne('/server/api/products', HttpMethod.GET);
    req.flush(MOCK_PRODUCTS);
  });

  it('should return a list of categories from the product list', (done) => {
    spectator.service.productsCategories$.subscribe((categories) => {
      expect(categories).toEqual(MOCK_PRODUCTS_CATEGORIES);
      done();
    });

    const req = spectator.expectOne('/server/api/products', HttpMethod.GET);
    req.flush(MOCK_PRODUCTS);
  });

  it('should return all the products', (done) => {
    spectator.service.filteredProducts$.subscribe((products) => {
      expect(products).toEqual(MOCK_PRODUCTS_WITH_TAXES);
      done();
    });

    const req = spectator.expectOne('/server/api/products', HttpMethod.GET);
    req.flush(MOCK_PRODUCTS);
  });

  it('should return only the books', (done) => {
    spectator.service.filteredProducts$.subscribe((products) => {
      expect(products).toEqual(MOCK_BOOKS_WITH_TAXES);
      done();
    });

    spectator.service.selectCategory('Books');

    const req = spectator.expectOne('/server/api/products', HttpMethod.GET);
    req.flush(MOCK_PRODUCTS);
  });
});
