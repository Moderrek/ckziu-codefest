import { NextPage } from 'next';

import ArticleSection from '@/components/articles';
import Homepage from '@/components/homepage';
import Seo from '@/components/Seo';

const Index: NextPage = (): JSX.Element => {
  return (
    <>
      <Seo templateTitle='Strona główna' />
      {/*<Navbar/>*/}
      <div className='flex h-screen flex-col'>
        <div className='m-auto'>
          <div className='mt-10 flex flex-wrap justify-center'>
            <ArticleSection />
          </div>
        </div>
      </div>
      <Homepage />
    </>
  );
};

export default Index;
