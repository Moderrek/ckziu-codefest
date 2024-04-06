import {ThemeProvider} from 'next-themes'
import {ReactNode, useEffect, useState} from "react";
import {Toaster} from "@/components/ui/toaster";

export default function Layout({children}: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (<>{children}</>);
  }

  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster/>
    </>
  )
}