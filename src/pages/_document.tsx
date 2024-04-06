import {Head, Html, Main, NextScript} from 'next/document'
import {cn} from "@/lib/utils";
import {fontSans} from "@/lib/fonts";

export default function Document() {
  return (
    <Html lang="pl-PL" suppressHydrationWarning={true}>
        <Head/>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.className
        )}>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}