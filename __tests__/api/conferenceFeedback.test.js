import handler from '../../pages/api/conferenceFeedback';

// Mock graphql-request so no real network/CMS call happens.
const mockRequest = jest.fn();
jest.mock('graphql-request', () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: (...args) => mockRequest(...args),
  })),
  gql: (strings) => strings.join(''),
}));

// Build a minimal Next.js API res mock that records status + payload.
function mockRes() {
  const res = {};
  res.statusCode = null;
  res.payload = undefined;
  res.status = jest.fn((code) => {
    res.statusCode = code;
    return res;
  });
  res.send = jest.fn((payload) => {
    res.payload = payload;
    return res;
  });
  res.json = jest.fn((payload) => {
    res.payload = payload;
    return res;
  });
  return res;
}

// A submission old enough to pass the timing check.
const PAST = 5000;
const validBody = (overrides = {}) => ({
  userName: 'Ada',
  comment: 'Great talk!',
  score: 4,
  slug: 'react-conf',
  website: '',
  renderedAt: Date.now() - PAST,
  ...overrides,
});

beforeEach(() => {
  mockRequest.mockReset();
  mockRequest.mockResolvedValue({ createConferenceFeedback: { id: 'abc123' } });
});

describe('conferenceFeedback API', () => {
  it('persists valid feedback and returns 200', async () => {
    const res = mockRes();
    await handler({ body: validBody() }, res);

    expect(res.statusCode).toBe(200);
    expect(mockRequest).toHaveBeenCalledTimes(1);
    const [, variables] = mockRequest.mock.calls[0];
    expect(variables).toMatchObject({
      userName: 'Ada',
      comment: 'Great talk!',
      score: 4,
      slug: 'react-conf',
    });
  });

  it.each(['userName', 'comment', 'slug'])(
    'rejects missing %s with 400 and no mutation',
    async (field) => {
      const res = mockRes();
      await handler({ body: validBody({ [field]: '' }) }, res);

      expect(res.statusCode).toBe(400);
      expect(mockRequest).not.toHaveBeenCalled();
    }
  );

  it.each([0, 6, -1, NaN, 'abc'])(
    'rejects out-of-range score %p with 400',
    async (score) => {
      const res = mockRes();
      await handler({ body: validBody({ score }) }, res);

      expect(res.statusCode).toBe(400);
      expect(mockRequest).not.toHaveBeenCalled();
    }
  );

  it('coerces a numeric-string score to an integer', async () => {
    const res = mockRes();
    await handler({ body: validBody({ score: '3' }) }, res);

    expect(res.statusCode).toBe(200);
    const [, variables] = mockRequest.mock.calls[0];
    expect(variables.score).toBe(3);
  });

  it('rejects an over-long userName with 400', async () => {
    const res = mockRes();
    await handler({ body: validBody({ userName: 'a'.repeat(101) }) }, res);

    expect(res.statusCode).toBe(400);
    expect(mockRequest).not.toHaveBeenCalled();
  });

  it('rejects an over-long comment with 400', async () => {
    const res = mockRes();
    await handler({ body: validBody({ comment: 'a'.repeat(2001) }) }, res);

    expect(res.statusCode).toBe(400);
    expect(mockRequest).not.toHaveBeenCalled();
  });

  it('returns a fake 200 and skips the mutation when the honeypot is filled', async () => {
    const res = mockRes();
    await handler({ body: validBody({ website: 'http://spam.example' }) }, res);

    expect(res.statusCode).toBe(200);
    expect(mockRequest).not.toHaveBeenCalled();
  });

  it('returns a fake 200 and skips the mutation when submitted too fast', async () => {
    const res = mockRes();
    await handler({ body: validBody({ renderedAt: Date.now() }) }, res);

    expect(res.statusCode).toBe(200);
    expect(mockRequest).not.toHaveBeenCalled();
  });

  it('returns a generic 500 without leaking the raw CMS error', async () => {
    mockRequest.mockRejectedValueOnce(new Error('secret CMS internals'));
    const res = mockRes();
    await handler({ body: validBody() }, res);

    expect(res.statusCode).toBe(500);
    expect(JSON.stringify(res.payload)).not.toContain('secret CMS internals');
  });
});
