// Color utilities for picking accessible text colors against dynamic backgrounds.

// Parse a hex color (#rgb, #rrggbb, with or without the leading #) into {r, g, b}.
// Returns null for anything we can't confidently parse.
const parseHex = (hex) => {
  if (typeof hex !== 'string') return null;

  let value = hex.trim().replace(/^#/, '');

  // Expand 3-digit shorthand (e.g. "fff" -> "ffffff").
  if (value.length === 3) {
    value = value.split('').map((c) => c + c).join('');
  }

  if (!/^[0-9a-fA-F]{6}$/.test(value)) return null;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
};

// WCAG relative luminance of an 8-bit RGB color (0 = black, 1 = white).
// https://www.w3.org/TR/WCAG20/#relativeluminancedef
const relativeLuminance = ({ r, g, b }) => {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

// Return the text color (#000000 or #ffffff) that contrasts best with the given
// background color. Falls back to white text for missing/invalid input.
export const getReadableTextColor = (backgroundHex) => {
  const rgb = parseHex(backgroundHex);
  if (!rgb) return '#ffffff';

  // 0.179 is the standard luminance threshold where black vs. white text flips
  // for best WCAG contrast.
  return relativeLuminance(rgb) > 0.179 ? '#000000' : '#ffffff';
};

const toHex = ({ r, g, b }) => `#${[r, g, b]
  .map((c) => Math.round(c).toString(16).padStart(2, '0'))
  .join('')}`;

// Return a version of the color that stays visible against a white background.
// Brand colors that are already dark/saturated enough are returned unchanged;
// near-white colors are darkened (preserving hue when possible) so accents like
// borders don't vanish on the white page. Falls back to the pink-600 default.
export const getVisibleColorOnWhite = (hex) => {
  const rgb = parseHex(hex);
  if (!rgb) return '#db2777';

  // Visible enough already.
  if (relativeLuminance(rgb) <= 0.7) return toHex(rgb);

  // Too light. If it has hue, scale it down toward a richer shade; if it's a
  // near-neutral (white/very light gray), fall back to a dark neutral gray.
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  if (max - min < 12) return '#4b5563'; // gray-600

  const scale = 0.55;
  return toHex({ r: rgb.r * scale, g: rgb.g * scale, b: rgb.b * scale });
};
