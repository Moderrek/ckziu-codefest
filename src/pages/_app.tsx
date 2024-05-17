import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider as MaterialThemeProvider } from '@material-tailwind/react';
import { AppProps } from 'next/app';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/styles/globals.css';

import { SessionContext } from '@/components/profile/SessionContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import { GatewayProvider } from '@/gateway/GatewayProvider';

config.autoAddCss = false;

const CodeFestApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GatewayProvider>
      <MaterialThemeProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
        >
          <NextThemeProvider>
            <SessionContext.Provider value={undefined}>
              <Component {...pageProps} />
            </SessionContext.Provider>
            <Toaster />
          </NextThemeProvider>
        </ThemeProvider>
      </MaterialThemeProvider>
    </GatewayProvider>
  );
};

export default CodeFestApp;
