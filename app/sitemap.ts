import { MetadataRoute } from 'next';
import { toolsRegistry } from '@/config/tools-registry';

const BASE_URL = 'https://calctools.io';
const locales = ['ar', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', 'about', 'privacy', 'contact'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path ? '/' + path : ''}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.7,
      });
    }
    for (const tool of toolsRegistry) {
      entries.push({
        url: `${BASE_URL}/${locale}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
