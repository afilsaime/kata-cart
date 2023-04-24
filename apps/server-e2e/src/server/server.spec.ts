import { MOCK_PRODUCTS } from '@kata-cart/mocks';
import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/products`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual(MOCK_PRODUCTS);
  });
});
