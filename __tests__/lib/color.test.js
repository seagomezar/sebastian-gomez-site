import { getReadableTextColor, getVisibleColorOnWhite } from '../../lib/color';

describe('getReadableTextColor', () => {
  it('returns white text on a dark background', () => {
    expect(getReadableTextColor('#000000')).toBe('#ffffff');
    expect(getReadableTextColor('#1a1a1a')).toBe('#ffffff');
    expect(getReadableTextColor('#db2777')).toBe('#ffffff'); // pink-600 default
  });

  it('returns black text on a light background', () => {
    expect(getReadableTextColor('#ffffff')).toBe('#000000');
    expect(getReadableTextColor('#ffeb3b')).toBe('#000000'); // bright yellow
    expect(getReadableTextColor('#f3f4f6')).toBe('#000000'); // light gray
  });

  it('accepts hex without a leading hash', () => {
    expect(getReadableTextColor('000000')).toBe('#ffffff');
    expect(getReadableTextColor('ffffff')).toBe('#000000');
  });

  it('supports 3-digit shorthand hex', () => {
    expect(getReadableTextColor('#000')).toBe('#ffffff');
    expect(getReadableTextColor('#fff')).toBe('#000000');
  });

  it('falls back to white for invalid or missing input', () => {
    expect(getReadableTextColor(undefined)).toBe('#ffffff');
    expect(getReadableTextColor('')).toBe('#ffffff');
    expect(getReadableTextColor('not-a-color')).toBe('#ffffff');
  });
});

describe('getVisibleColorOnWhite', () => {
  it('returns a sufficiently saturated/dark color unchanged', () => {
    expect(getVisibleColorOnWhite('#db2777')).toBe('#db2777'); // pink-600
    expect(getVisibleColorOnWhite('#4825f1')).toBe('#4825f1'); // deep purple
    expect(getVisibleColorOnWhite('#000000')).toBe('#000000');
  });

  it('darkens a near-white color so it stays visible on a white background', () => {
    const result = getVisibleColorOnWhite('#ffffff');
    expect(result).not.toBe('#ffffff');
    // Should be a dark, neutral gray rather than invisible white.
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
    expect(result.toLowerCase()).not.toMatch(/^#f.f.f.$/);
  });

  it('falls back to the pink default for invalid or missing input', () => {
    expect(getVisibleColorOnWhite(undefined)).toBe('#db2777');
    expect(getVisibleColorOnWhite('not-a-color')).toBe('#db2777');
  });
});
