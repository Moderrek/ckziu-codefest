import { GoogleAnalytics } from '@next/third-parties/google';
import { Head, Html, Main, NextScript } from 'next/document';

import { cn } from '@/lib/utils';

export default function Document() {
  return (
    <Html
      lang='pl-PL'
      suppressHydrationWarning={true}
      className='scroll-smooth'
    >
      <Head />
      <body
        className={cn(
          'bg-background min-h-full scroll-smooth font-sans antialiased'
        )}
      >
        <Main />
        <GoogleAnalytics gaId='G-9LCWSWF9Y8' />
        <NextScript />
      </body>
    </Html>
  );
}
