// Control Apollo's client.query so getConferenceDetails can be tested in isolation.
const mockQuery = jest.fn();
jest.mock('@apollo/client', () => ({
  ApolloClient: jest.fn().mockImplementation(() => ({ query: (...args) => mockQuery(...args) })),
  InMemoryCache: jest.fn(),
  HttpLink: jest.fn(),
}));

import { getConferenceDetails, submitConferenceFeedback, getCategoryPageData } from '../../services';

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
