// Global next/image loader (configured via images.loaderFile in next.config.js).
//
// Resizing happens on Hygraph's image CDN, NOT on Vercel, so it never consumes the
// Vercel Image Optimization transformation quota. Non-Hygraph sources (local
// /public assets, other hosts) are passed through untouched.
//
// Both the current `graphassets.com` host and the legacy `graphcms.com` host are
// rewritten: legacy URLs 301-redirect to graphassets and preserve the transform
// segment, so the same syntax works for both.

const HYGRAPH_HOSTS = ['graphassets.com', 'graphcms.com'];

const isHygraphUrl = (src) => HYGRAPH_HOSTS.some((host) => src.includes(host));

export default function imageLoader({ src, width, quality }) {
  // Only rewrite Hygraph asset URLs.
  if (typeof src !== 'string' || !isHygraphUrl(src)) {
    return src;
  }

  // next/image always supplies width; guard against manual/unexpected calls so we
  // never emit "resize=width:undefined".
  if (!width) {
    return src;
  }

  // Hygraph asset URLs look like:
  //   https://<region>.graphassets.com/<environmentId>/<handle>
  // A transformed URL has transform segments (e.g. resize=, output=) before the
  // handle. If one is already present, leave it alone to avoid double-transforming.
  if (/\/(resize|output|quality|crop|auto_image|compress)=/.test(src)) {
    return src;
  }

  const parts = src.split('/');
  const handle = parts.pop();
  const base = parts.join('/');
  const q = quality || 75;

  // output=format:webp -> modern format; resize fit:max keeps aspect ratio within width.
  return `${base}/output=format:webp/resize=width:${width},fit:max/quality=value:${q}/${handle}`;
}
