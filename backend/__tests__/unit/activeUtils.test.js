import truncate from '../util/truncate';

import { getActive, getActiveBond } from '../../src/app/services/activeUtils';

describe('Active', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create Stock in database searching data in web', async () => {
    const response = await getActive('ITUB3');

    expect(response.dataValues).toHaveProperty('id');
    expect(response.dataValues.type).toBe('Stock');
  });

  it('should be able to create FII in database searching data in web', async () => {
    const response = await getActive('KNRI11');

    expect(response.dataValues).toHaveProperty('id');
    expect(response.dataValues.type).toBe('FII');
  });

  it('should be able to create ETF in database searching data in web', async () => {
    const response = await getActive('BOVA11');

    expect(response.dataValues).toHaveProperty('id');
    expect(response.dataValues.type).toBe('ETF');
  });
});
