import { GoogleAnalytics } from '@next/third-parties/google';
import * as React from 'react';

import { Footer } from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export interface NavbarBreadcrumb {
  name: string;
  url: string;
}

const DefaultLayout = ({
                         children,
                         breadcrumbs
                       }: {
  children: React.ReactNode;
  breadcrumbs?: NavbarBreadcrumb[];
}) => {
  return (
    <>
      <Navbar breadcrumbs={breadcrumbs} />
      <main className="sticky h-max w-full flex-1 grow flex-col">
        {children}
      </main>
      <Footer />
      <GoogleAnalytics gaId="G-9LCWSWF9Y8" />
    </>
  );
};

export default DefaultLayout;
