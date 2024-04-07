import * as React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='flex flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
