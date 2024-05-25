import * as React from 'react';

import { Footer } from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { GoogleAnalytics } from '@next/third-parties/google';

export interface NavbarBreadcrumb {
  name: string;
  url: string;
}

const DefaultLayout = ({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs?: NavbarBreadcrumb[];
}) => {
  return (
    <>
      <Navbar breadcrumbs={breadcrumbs} />
      <main className='sticky flex-grow h-max w-full flex-1 flex-col'>
        {children}
      </main>
      <Footer />
      <GoogleAnalytics gaId='G-9LCWSWF9Y8' />
    </>
  );
};

export default DefaultLayout;
