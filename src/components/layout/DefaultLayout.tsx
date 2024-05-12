import * as React from 'react';

import { Footer } from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

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
      <main className='sticky inset-0 block h-max w-full flex-1 flex-col'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
