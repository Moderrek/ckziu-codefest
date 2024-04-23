import * as React from 'react';

import { NewFooter } from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='sticky inset-0 block h-max w-full flex-1 flex-col'>
        {children}
      </main>
      <NewFooter />
    </>
  );
};

export default DefaultLayout;
