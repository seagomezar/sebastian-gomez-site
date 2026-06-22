import { isAdSenseEnabled } from '../../lib/ads';

const VALID = {
  nodeEnv: 'production',
  clientId: 'ca-pub-1234567890',
  slotId: '1234567890',
};

describe('isAdSenseEnabled', () => {
  it('is true only when production + client ID + slot ID are all present', () => {
    expect(isAdSenseEnabled(VALID)).toBe(true);
  });

  it('is false when the ad slot ID is missing (script must not load)', () => {
    expect(isAdSenseEnabled({ ...VALID, slotId: '' })).toBe(false);
    expect(isAdSenseEnabled({ ...VALID, slotId: undefined })).toBe(false);
  });

  it('is false when the client ID is missing', () => {
    expect(isAdSenseEnabled({ ...VALID, clientId: '' })).toBe(false);
  });

  it('is false for placeholder client or slot IDs', () => {
    expect(isAdSenseEnabled({ ...VALID, clientId: 'ca-pub-XXXXXXXXX' })).toBe(false);
    expect(isAdSenseEnabled({ ...VALID, slotId: 'XXXXXXXXX' })).toBe(false);
  });

  it('is false outside production even with both IDs', () => {
    expect(isAdSenseEnabled({ ...VALID, nodeEnv: 'development' })).toBe(false);
  });

  it('is false with no args', () => {
    expect(isAdSenseEnabled()).toBe(false);
  });
});
