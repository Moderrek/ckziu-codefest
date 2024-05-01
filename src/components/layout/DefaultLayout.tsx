import * as React from 'react';

import { Footer } from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='sticky inset-0 block h-max w-full flex-1 flex-col'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
