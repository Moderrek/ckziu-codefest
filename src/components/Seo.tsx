import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const defaultMeta = {
  title: 'CKZiU CodeFest',
  siteName: 'CKZiU CodeFest',
  description: 'Serwis konkursowy CKZiU CodeFest w Łodzi.',
  url: 'https://ckziucodefest.pl',
  type: 'website',
  robots: 'follow, index',
  image: 'https://ckziucodefest.pl/images/ckziu_thumbnail.png',
  keywords:
    'ckziu, lodz, łódź, szkoła, zawodowe, zawod, programista, centrum, kształcenia, zawodowego, ustawicznego, łodzi, codefest, 2024, 24, codefest24, konkurs, cez, programowanie, witryny, technik, informatyk, informatyka, strona internetowa, witryna, plan lekcji, plan zajęć, hegemonstudio, żeromskiego, zeromskiego, politechnika, technikum nr 19',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
  keywords?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      <meta
        name='author'
        content='Co-authored by Tymon Woźniak, Filip Sobczuk'
      />
      <meta name='keywords' content={meta.keywords} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          {/*<meta*/}
          {/*  name='author'*/}
          {/*  property='article:author'*/}
          {/*  content='Tymon Woźniak'*/}
          {/*/>*/}
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
}

const favicons: Array<React.ComponentPropsWithoutRef<'link'>> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  {
    rel: 'mask-icon',
    href: '/favicon/safari-pinned-tab.svg',
    color: '#00e887',
  },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
];
