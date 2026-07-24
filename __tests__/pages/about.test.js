jest.mock('../../services', () => ({
  getSite: jest.fn(),
}));

import { getSite } from '../../services';
import { getServerSideProps } from '../../pages/about';

describe('about getServerSideProps', () => {
  beforeEach(() => {
    getSite.mockReset();
  });

  it('requests and returns the active locale', async () => {
    const site = { name: 'Sebastian Gomez' };
    getSite.mockResolvedValue(site);

    const result = await getServerSideProps({ locale: 'en' });

    expect(getSite).toHaveBeenCalledWith('en');
    expect(result).toEqual({ props: { site, locale: 'en' } });
  });

  it('defaults to Spanish when no locale is provided', async () => {
    getSite.mockResolvedValue(null);

    const result = await getServerSideProps({});

    expect(getSite).toHaveBeenCalledWith('es');
    expect(result).toEqual({ props: { site: [], locale: 'es' } });
  });
});
