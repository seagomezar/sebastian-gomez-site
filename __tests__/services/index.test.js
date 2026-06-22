// Control Apollo's client.query so getConferenceDetails can be tested in isolation.
const mockQuery = jest.fn();
jest.mock('@apollo/client', () => ({
  ApolloClient: jest.fn().mockImplementation(() => ({ query: (...args) => mockQuery(...args) })),
  InMemoryCache: jest.fn(),
  HttpLink: jest.fn(),
}));

import { getConferenceDetails, submitConferenceFeedback } from '../../services';

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
