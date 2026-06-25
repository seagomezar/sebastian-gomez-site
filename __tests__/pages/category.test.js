// Unit-tests the category page's getServerSideProps: unknown slug -> 404,
// known-but-empty -> 200 props with empty posts, populated -> 200 props.
jest.mock('../../services', () => ({
  getCategoryPageData: jest.fn(),
}));

import { getCategoryPageData } from '../../services';
import { getServerSideProps } from '../../pages/category/[slug]';

describe('category/[slug] getServerSideProps', () => {
  beforeEach(() => getCategoryPageData.mockReset());

  it('returns notFound when the category does not exist', async () => {
    getCategoryPageData.mockResolvedValue({ category: null, posts: [] });

    const result = await getServerSideProps({ params: { slug: 'nope' } });

    expect(result).toEqual({ notFound: true });
  });

  it('returns props with empty posts for a known category with no posts', async () => {
    const category = { name: 'Empty', slug: 'empty' };
    getCategoryPageData.mockResolvedValue({ category, posts: [] });

    const result = await getServerSideProps({ params: { slug: 'empty' } });

    expect(result).toEqual({ props: { category, posts: [] } });
  });

  it('returns props with posts for a populated category', async () => {
    const category = { name: 'React', slug: 'react' };
    const posts = [{ node: { slug: 'a' } }];
    getCategoryPageData.mockResolvedValue({ category, posts });

    const result = await getServerSideProps({ params: { slug: 'react' } });

    expect(result).toEqual({ props: { category, posts } });
  });
});
