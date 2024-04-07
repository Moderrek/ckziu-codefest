import { NextPage } from 'next';

import ArticleSection from '@/components/articles';
import Homepage from '@/components/homepage';
import Seo from '@/components/Seo';
import DefaultLayout from '@/components/layout/DefaultLayout';

const Index: NextPage = (): JSX.Element => {
  return (
    <>
      <DefaultLayout>
        <Seo templateTitle='Strona główna' />
        <ArticleSection />
        <Homepage />
      </DefaultLayout>
    </>
  );
};

export default Index;
