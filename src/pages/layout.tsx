import {ThemeProvider} from 'next-themes'
import {ReactNode, useEffect, useState} from "react";
import {fontSans} from "@/lib/fonts";
import {cn} from "@/lib/utils";

export default function Layout({children}: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (<>{children}</>);
  }

  return (
    <html suppressHydrationWarning>
    <head/>
    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
    <ThemeProvider>{children}</ThemeProvider>
    </body>
    </html>
  )
}