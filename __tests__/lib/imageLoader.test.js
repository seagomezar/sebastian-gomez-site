import imageLoader from '../../lib/imageLoader';

const HYGRAPH = 'https://us-east-1.graphassets.com/Abgsgv6A7SOmdd6d9vwuEz/VKHHNvEETYqZRkqgjybc';

describe('imageLoader (global next/image loader)', () => {
  it('rewrites a Hygraph URL to request a resized WebP from the Hygraph CDN', () => {
    const out = imageLoader({ src: HYGRAPH, width: 60, quality: 75 });
    expect(out).toBe(
      'https://us-east-1.graphassets.com/Abgsgv6A7SOmdd6d9vwuEz/output=format:webp/resize=width:60,fit:max/quality=value:75/VKHHNvEETYqZRkqgjybc',
    );
  });

  it('defaults quality to 75 when not provided', () => {
    const out = imageLoader({ src: HYGRAPH, width: 800 });
    expect(out).toContain('quality=value:75');
    expect(out).toContain('resize=width:800,fit:max');
  });

  it('keeps the resize on the Hygraph CDN (never hits Vercel)', () => {
    const out = imageLoader({ src: HYGRAPH, width: 200, quality: 50 });
    expect(out.startsWith('https://us-east-1.graphassets.com/')).toBe(true);
  });

  it('passes through local/static assets unchanged', () => {
    expect(imageLoader({ src: '/logo.png', width: 200, quality: 75 })).toBe('/logo.png');
    expect(imageLoader({ src: '/en.png', width: 60 })).toBe('/en.png');
  });

  it('passes through any non-Hygraph absolute URL unchanged', () => {
    const other = 'https://example.com/image.jpg';
    expect(imageLoader({ src: other, width: 100, quality: 80 })).toBe(other);
  });

  it('does not double-transform an already-transformed Hygraph URL', () => {
    const already = `${HYGRAPH.split('/').slice(0, 4).join('/')}/resize=width:60/VKHHNvEETYqZRkqgjybc`;
    // A URL that already contains a transform segment should be returned as-is.
    expect(imageLoader({ src: already, width: 120, quality: 75 })).toBe(already);
  });

  it('rewrites legacy graphcms.com URLs the same way (they redirect to graphassets)', () => {
    const legacy = 'https://media.graphcms.com/VKHHNvEETYqZRkqgjybc';
    const out = imageLoader({ src: legacy, width: 60, quality: 75 });
    expect(out).toBe(
      'https://media.graphcms.com/output=format:webp/resize=width:60,fit:max/quality=value:75/VKHHNvEETYqZRkqgjybc',
    );
  });

  it('passes a Hygraph URL through unchanged when width is missing', () => {
    // next/image always supplies width; guard against manual/unexpected calls so we
    // never emit "resize=width:undefined".
    expect(imageLoader({ src: HYGRAPH })).toBe(HYGRAPH);
    expect(imageLoader({ src: HYGRAPH, quality: 75 })).toBe(HYGRAPH);
  });
});
