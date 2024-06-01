import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider as MaterialThemeProvider } from "@material-tailwind/react";
import { AppProps } from "next/app";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/styles/globals.css";

import { Toaster } from "@/components/ui/toaster";

import { GlobalStateProvider } from "@/globalstate/GlobalStateProvider";
import { SessionContext } from "@/pages-components/profile/SessionContext";
import { NextThemesProvider } from "@/providers/NextThemesProvider";

config.autoAddCss = false;

const CodeFestApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalStateProvider>
      {/*<GatewayProvider>*/}
      <MaterialThemeProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <NextThemeProvider>
            <SessionContext.Provider value={undefined}>
              <Component {...pageProps} />
            </SessionContext.Provider>
            <Toaster />
          </NextThemeProvider>
        </NextThemesProvider>
      </MaterialThemeProvider>
      {/*</GatewayProvider>*/}
    </GlobalStateProvider>
  );
};

export default CodeFestApp;
