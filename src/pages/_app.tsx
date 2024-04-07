import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider as MaterialThemeProvider } from '@material-tailwind/react';
import { AppProps } from 'next/app';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/styles/globals.css';

import { ThemeProvider } from '@/components/theme-provider';

import Layout from '@/pages/layout';

config.autoAddCss = false;

const CodeFestApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MaterialThemeProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem={false}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </MaterialThemeProvider>
  );
};

export default CodeFestApp;
