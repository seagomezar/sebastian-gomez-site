// Unit-tests pagination getServerSideProps: invalid/out-of-range page -> 404,
// valid page -> props.
jest.mock('../../services', () => ({
  getPostsPerPage: jest.fn(),
  getPosts: jest.fn(),
  getSite: jest.fn(),
}));

import { getPostsPerPage, getPosts, getSite } from '../../services';
import { getServerSideProps } from '../../pages/posts/page/[pageNumber]';

describe('posts/page/[pageNumber] getServerSideProps', () => {
  beforeEach(() => {
    getPostsPerPage.mockReset();
    getPosts.mockReset();
    getSite.mockReset();
    getPosts.mockResolvedValue(Array.from({ length: 8 }, (_, i) => ({ id: i })));
    getSite.mockResolvedValue({});
  });

  it('returns notFound for a non-numeric page number', async () => {
    const result = await getServerSideProps({ params: { pageNumber: 'abc' } });
    expect(result).toEqual({ notFound: true });
    expect(getPostsPerPage).not.toHaveBeenCalled();
  });

  it('returns notFound for a page number below 1', async () => {
    const result = await getServerSideProps({ params: { pageNumber: '0' } });
    expect(result).toEqual({ notFound: true });
  });

  it('returns notFound for an out-of-range page (empty beyond page 1)', async () => {
    getPostsPerPage.mockResolvedValue([]);
    const result = await getServerSideProps({ params: { pageNumber: '99' } });
    expect(result).toEqual({ notFound: true });
  });

  it('returns props for a valid page with posts', async () => {
    const posts = [{ node: { slug: 'a' } }];
    getPostsPerPage.mockResolvedValue(posts);
    const result = await getServerSideProps({ params: { pageNumber: '2' } });
    expect(result.props.posts).toEqual(posts);
    expect(result.notFound).toBeUndefined();
  });

  it('renders page 1 even when empty (not a 404)', async () => {
    getPostsPerPage.mockResolvedValue([]);
    const result = await getServerSideProps({ params: { pageNumber: '1' } });
    expect(result.notFound).toBeUndefined();
    expect(result.props.posts).toEqual([]);
  });
});
