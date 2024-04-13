import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider as MaterialThemeProvider } from '@material-tailwind/react';
import { AppProps } from 'next/app';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/styles/globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

config.autoAddCss = false;

const CodeFestApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MaterialThemeProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem={false}
      >
        <NextThemeProvider>
          <Component {...pageProps} />
          <Toaster />
        </NextThemeProvider>
      </ThemeProvider>
    </MaterialThemeProvider>
  );
};

export default CodeFestApp;
