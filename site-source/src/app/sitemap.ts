import type { MetadataRoute } from 'next';
import { projects } from '@/content/portfolio';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://milan-lamsal-digital-workspace.fairy-crane-2335.chatgpt.site'; return ['', '/labs', ...projects.map(p => '/projects/' + p.slug)].map(path => ({ url: origin + path + '/', changeFrequency: 'monthly', priority: path === '' ? 1 : 0.7 })); }
