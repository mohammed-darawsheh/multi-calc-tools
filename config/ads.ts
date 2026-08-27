export type AdNetwork = 'adsense' | 'adsterra';

export interface AdConfig {
  network: AdNetwork;
  adsensePublisherId: string;
  fallback: AdNetwork;
}

export const adConfig: AdConfig = {
  network: 'adsense',
  adsensePublisherId: 'ca-pub-8815310111970503',
  fallback: 'adsterra',
};

export const adSlots: Record<string, string> = {
  'tool-top': '0000000000',
  'tool-bottom': '0000000000',
  'sidebar': '0000000000',
  'home-hero': '0000000000',
};
