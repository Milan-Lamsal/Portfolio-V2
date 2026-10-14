import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots { const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://milan-lamsal-digital-workspace.fairy-crane-2335.chatgpt.site'; return { rules: { userAgent: '*', allow: '/' }, sitemap: origin + '/sitemap.xml' }; }
