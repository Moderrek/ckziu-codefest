import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { ThemeProvider } from '@/components/theme-provider';

import Layout from '@/pages/layout';

const CodeFestApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default CodeFestApp;
