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
    spectator.service.products$.subscribe();

    spectator.expectOne('/server/api/products', HttpMethod.GET);
  });
});
