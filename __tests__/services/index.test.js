// Control Apollo's client.query so getConferenceDetails can be tested in isolation.
const mockQuery = jest.fn();
jest.mock('@apollo/client', () => ({
  ApolloClient: jest.fn().mockImplementation(() => ({ query: (...args) => mockQuery(...args) })),
  InMemoryCache: jest.fn(),
  HttpLink: jest.fn(),
}));

import { getConferenceDetails, submitConferenceFeedback, getCategoryPageData, getPostDetails } from '../../services';

describe('getConferenceDetails', () => {
  beforeEach(() => mockQuery.mockReset());

  it('returns data.conference for a slug', async () => {
    const conference = { name: 'React Conf', slug: 'react-conf' };
    mockQuery.mockResolvedValue({ data: { conference } });

    const result = await getConferenceDetails('react-conf');

    expect(result).toEqual(conference);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({ variables: { slug: 'react-conf' } }),
    );
  });
});

describe('getPostDetails', () => {
  beforeEach(() => mockQuery.mockReset());

  it('returns null when the post does not exist (404 contract)', async () => {
    mockQuery.mockResolvedValue({ data: { post: null } });

    const result = await getPostDetails('nope');

    expect(result).toBeNull();
  });

  it('returns the post with availableLocales derived from localizations', async () => {
    const post = { slug: 'hello', title: 'Hola', localizations: [{ locale: 'en' }] };
    mockQuery.mockResolvedValue({ data: { post } });

    const result = await getPostDetails('hello');

    expect(result.slug).toBe('hello');
    expect(result.availableLocales).toEqual(['en']);
  });

  it('returns an empty availableLocales array when there are no other localizations', async () => {
    const post = { slug: 'solo', title: 'Solo', localizations: [] };
    mockQuery.mockResolvedValue({ data: { post } });

    const result = await getPostDetails('solo');

    expect(result.availableLocales).toEqual([]);
  });

  it('requests [locale, es] for a non-es locale', async () => {
    mockQuery.mockResolvedValue({ data: { post: { slug: 'x', localizations: [] } } });

    await getPostDetails('x', 'en');

    expect(mockQuery).toHaveBeenCalledWith(
      expect.objectContaining({ variables: { slug: 'x', locales: ['en', 'es'] } }),
    );
  });
});

describe('getCategoryPageData', () => {
  beforeEach(() => mockQuery.mockReset());

  it('returns the category and its posts when the category exists', async () => {
    const category = { name: 'React', slug: 'react' };
    const edges = [{ node: { slug: 'a' } }];
    mockQuery.mockResolvedValue({ data: { category, postsConnection: { edges } } });

    const result = await getCategoryPageData('react');

    expect(result).toEqual({ category, posts: edges });
  });

  it('returns category: null for an unknown slug', async () => {
    mockQuery.mockResolvedValue({ data: { category: null, postsConnection: { edges: [] } } });

    const result = await getCategoryPageData('nope');

    expect(result).toEqual({ category: null, posts: [] });
  });

  it('returns the category with empty posts when it has none', async () => {
    const category = { name: 'Empty', slug: 'empty' };
    mockQuery.mockResolvedValue({ data: { category, postsConnection: { edges: [] } } });

    const result = await getCategoryPageData('empty');

    expect(result).toEqual({ category, posts: [] });
  });
});

describe('submitConferenceFeedback', () => {
  afterEach(() => {
    delete global.fetch;
  });

  it('POSTs the feedback object as JSON and parses the response', async () => {
    const json = jest.fn().mockResolvedValue({ createConferenceFeedback: { id: 'abc' } });
    global.fetch = jest.fn().mockResolvedValue({ json });

    const obj = { userName: 'Ada', comment: 'Nice', score: 5, slug: 'react-conf' };
    const result = await submitConferenceFeedback(obj);

    expect(result).toEqual({ createConferenceFeedback: { id: 'abc' } });
    expect(global.fetch).toHaveBeenCalledWith('/api/conferenceFeedback', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    }));
  });
});
