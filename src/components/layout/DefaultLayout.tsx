import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='sticky inset-0 z-10 block flex h-max w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
