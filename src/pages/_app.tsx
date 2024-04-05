import "@/styles/globals.css"
import {AppProps} from "next/app";
import {ThemeProvider} from "@/components/theme-provider";
import Layout from "@/pages/layout";

export default function CodeFestApp({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}