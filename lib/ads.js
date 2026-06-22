// AdSense gating. Both the client (publisher) ID and the ad slot ID must be present
// and non-placeholder: without a slot the <ins> can't render an ad, so loading the
// heavy AdSense script would be wasted. Gating the script load and the ad render on
// the same condition keeps loading truly on-demand.

const PLACEHOLDER_CLIENT = 'ca-pub-XXXXXXXXX';
const PLACEHOLDER_SLOT = 'XXXXXXXXX';

export const isAdSenseEnabled = ({ nodeEnv, clientId, slotId } = {}) => Boolean(
  nodeEnv === 'production'
    && clientId && clientId !== PLACEHOLDER_CLIENT
    && slotId && slotId !== PLACEHOLDER_SLOT,
);
