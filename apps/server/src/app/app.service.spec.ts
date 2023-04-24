import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { MOCK_PRODUCTS } from '@kata-cart/mocks';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getProducts()).toEqual(MOCK_PRODUCTS);
    });
  });
});
