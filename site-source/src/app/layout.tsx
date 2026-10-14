import type { Metadata } from 'next';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
import './editorial.css';
import { SiteShell } from '@/components/site-shell';
import { publicPath } from '@/lib/paths';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://milan-lamsal-digital-workspace.fairy-crane-2335.chatgpt.site'),
  title: { default: 'Milan Lamsal — Projects & engineering', template: '%s — Milan Lamsal' },
  description: 'Computer Science student at Rowan University. Explore full-stack projects, thoughtful web experiences, and interactive engineering experiments.',
  openGraph: { title: 'Milan Lamsal — Projects & engineering', description: 'Selected work, engineering experiments, and a little chess.', type: 'website', images: [publicPath('/og-image.svg')] },
  twitter: { card: 'summary_large_image' }, icons: { icon: publicPath('/icon.svg') },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning><body><SiteShell>{children}</SiteShell></body></html>;
}

