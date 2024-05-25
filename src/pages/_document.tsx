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
          'bg-background min-h-full scroll-smooth font-codefest antialiased'
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
