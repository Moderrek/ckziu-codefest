import { TerminalIcon } from 'lucide-react';
import { NextPage } from 'next';

import ArticleSection from '@/components/fetchable/articles';
import { Projects } from '@/components/fetchable/Projects';
import DefaultLayout from '@/components/layout/DefaultLayout';
import Seo from '@/components/Seo';

const Index: NextPage = (): JSX.Element => {
  return (
    <>
      <DefaultLayout>
        <Seo templateTitle='Strona główna' />

        {/*<Homepage />*/}

        {/*
        INFORMACJE O KONKURSIE
         REGULAMIN
         ZGLOS SIE DO KONKURSU
         ODLICZANIE DO GLOSOWANIE
         TIME LINE
         */}
        {/*<Timeline/>*/}
        {/*<section className='py-20'>*/}
        {/*  <div className='container mx-auto'>*/}
        {/*<Countdown />*/}
        {/*</div>*/}
        {/*</section>*/}

        {/* TRENDING PROJECTS */}
        <section className='py-20'>
          <div className='container mx-auto rounded-2xl bg-gray-200 dark:bg-gray-900 shadow pt-4 pb-8'>
            <div className='px-2 sm:w-3/4 lg:w-5/12'>
              <h1 id='popularne' className='text-3xl text-amber-700 text-center justify-center flex flex-row'>
                <TerminalIcon /> Projekty na czasie
              </h1>
            </div>
            <div className='mx-auto flex flex-wrap gap-4 justify-center'>
              {/* PROJEKT */}
              <Projects />
            </div>
          </div>
        </section>

        {/* ARTICLES SECTION */}
        <section className='bg-blue-gray-50 mt-20 py-20 lg:mt-60'>
          <div className='container mx-auto'>
            <div className='mx-auto px-2 sm:w-3/4 lg:w-5/12'>
              <h1
                id='wiadomosci'
                className='mt-4 text-center text-3xl text-amber-500'
              >
                Najnowsze aktualności
              </h1>
              <p className='mt-4 text-center text-gray-600'>
                Tutaj znajdziesz odpowiedzi na często zadawane pytania. Jeżeli
                nie znajdziesz odpowiedzi na swój problem zadaj pytanie na
                naszym Discordzie.
              </p>
            </div>
            <div className='mx-auto mt-12 flex flex-wrap gap-4'>
              <ArticleSection />
            </div>
          </div>
        </section>

        {/*<section className='py-20'>*/}
        {/*  <div className='container mx-auto'>*/}
        {/*    <div className='mx-auto px-2 sm:w-3/4 lg:w-5/12'>*/}
        {/*      <h1 id='pomoc' className='text-center text-3xl text-amber-500'>*/}
        {/*        Najnowsze wiadomości*/}
        {/*      </h1>*/}
        {/*      <p className='mt-4 text-center text-gray-600'>*/}
        {/*        Tutaj znajdziesz odpowiedzi na często zadawane pytania. Jeżeli*/}
        {/*        nie znajdziesz odpowiedzi na swój problem zadaj pytanie na*/}
        {/*        naszym Discordzie.*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    <div className='mx-auto mt-12 sm:w-3/4 lg:w-5/12'>*/}
        {/*      <ArticleSection />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </DefaultLayout>
    </>
  );
};

export default Index;
