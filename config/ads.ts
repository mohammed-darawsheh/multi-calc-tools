export type AdNetwork = 'adsense' | 'adsterra';

export interface AdConfig {
  /** Active ad network. Switch to 'adsterra' if AdSense rejects the site. */
  network: AdNetwork;
  /** Google AdSense publisher ID (ca-pub-XXXXXX) */
  adsensePublisherId: string;
  /** Fallback network used automatically if primary is unavailable */
  fallback: AdNetwork;
}

export const adConfig: AdConfig = {
  network: 'adsense',
  adsensePublisherId: 'ca-pub-0000000000000000', // TODO: replace with your real AdSense ID
  fallback: 'adsterra',
};

/**
 * Map of named ad slots → their AdSense ad unit IDs.
 * Replace placeholder IDs with real ones from your AdSense account.
 */
export const adSlots: Record<string, string> = {
  'tool-top': '0000000000',
  'tool-bottom': '0000000000',
  'sidebar': '0000000000',
  'home-hero': '0000000000',
};
