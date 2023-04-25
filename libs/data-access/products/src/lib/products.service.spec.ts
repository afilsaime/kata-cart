import { MOCK_PRODUCTS, MOCK_PRODUCTS_WITH_TAXES } from '@kata-cart/mocks';
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

  it('should get the products from the api', () => {
    spectator.service.products$.subscribe((products) =>
      expect(products).toEqual(MOCK_PRODUCTS_WITH_TAXES)
    );

    const req = spectator.expectOne('/server/api/products', HttpMethod.GET);
    req.flush(MOCK_PRODUCTS);
  });
});
