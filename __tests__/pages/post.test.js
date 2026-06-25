// Unit-tests the post page's getServerSideProps: unknown slug -> 404,
// found post -> props, and locale selection via ?lang.
jest.mock('../../services', () => ({
  getPostDetails: jest.fn(),
}));

import { getPostDetails } from '../../services';
import { getServerSideProps } from '../../pages/post/[slug]';

describe('post/[slug] getServerSideProps', () => {
  beforeEach(() => getPostDetails.mockReset());

  it('returns notFound when the post does not exist', async () => {
    getPostDetails.mockResolvedValue(null);

    const result = await getServerSideProps({ params: { slug: 'nope' }, query: {} });

    expect(result).toEqual({ notFound: true });
  });

  it('returns the post as props when found (default es locale)', async () => {
    const post = { slug: 'hello', title: 'Hola' };
    getPostDetails.mockResolvedValue(post);

    const result = await getServerSideProps({ params: { slug: 'hello' }, query: {} });

    expect(result).toEqual({ props: { post, locale: 'es' } });
    expect(getPostDetails).toHaveBeenCalledWith('hello', 'es');
  });

  it('uses ?lang=en when supported', async () => {
    getPostDetails.mockResolvedValue({ slug: 'hello', title: 'Hi' });

    const result = await getServerSideProps({ params: { slug: 'hello' }, query: { lang: 'en' } });

    expect(result.props.locale).toBe('en');
    expect(getPostDetails).toHaveBeenCalledWith('hello', 'en');
  });

  it('falls back to es for an unsupported lang', async () => {
    getPostDetails.mockResolvedValue({ slug: 'hello', title: 'Hola' });

    const result = await getServerSideProps({ params: { slug: 'hello' }, query: { lang: 'fr' } });

    expect(result.props.locale).toBe('es');
  });
});
