import { Head, Html, Main, NextScript } from 'next/document';

import { cn } from '@/lib/utils';

export default function Document() {
  return (
    <Html lang='pl-PL' suppressHydrationWarning={true}>
      <Head />
      <body className={cn('bg-background min-h-full font-sans antialiased')}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
