import { Button } from '@material-tailwind/react';
import { TerminalIcon } from 'lucide-react';
import { NextPage } from 'next';

import ArticleSection from '@/components/fetchable/articles';
import { Projects } from '@/components/fetchable/Projects';
import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { RewardCard } from '@/components/RewardCard';
import Seo from '@/components/Seo';

const Index: NextPage = (): JSX.Element => {
  return (
    <>
      <DefaultLayout>
        <Seo templateTitle='Strona główna' />

        {/*<Homepage />*/}
        <section className='container mx-auto mt-10 flex flex-col items-center'>
          <CkziuLogo width={100} height={100} />
          <h1 className='text-center text-4xl font-bold hover:text-black'>
            CKZiU
            <br />
            CodeFest 2024
          </h1>
          <div className='flex flex-row gap-4'>
            <Button
              variant='gradient'
              color='indigo'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Weź udział
            </Button>
            <Button
              variant='gradient'
              color='red'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Regulamin
            </Button>
          </div>
          <p>
            Organizowany przez prof. Marka Bułę, Tymona Woźniaka i Filipa
            Sobczuka
          </p>
          <p>Konkurs polega ...</p>
        </section>

        <section className='container mx-auto flex flex-col  items-center'>
          <h1 className='text-3xl'>Nagrody</h1>
          <section className='container flex flex-row flex-wrap justify-center gap-2 lg:gap-8'>
            <RewardCard
              thumbnail='https://cdn-icons-png.freepik.com/512/5372/5372002.png'
              rewardName='Myszka'
            />
            <RewardCard
              thumbnail='https://cdn2.iconfinder.com/data/icons/keyboard-15/500/vab890_10_digital_keyboard_isometric_cartoon_woman_business_computer-512.png'
              rewardName='Klawiatura'
            />
            <RewardCard
              thumbnail='https://static.vecteezy.com/system/resources/previews/009/315/251/original/3d-winners-minimal-with-golden-cup-gold-winners-stars-on-podium-background-award-ceremony-concept-on-pedestal-with-cartoon-style-3d-render-isolated-on-background-png.png'
              rewardName='Unikatowa odznaka profilu'
            />
          </section>
          <p>
            Każdy uczestnik konkursu otrzyma unikatową odznakę uczestnictwa na
            profilu.
          </p>
          <p>
            Nagrody będą wybrane przez zwycięzców po kolei od pierwszego
            miejsca.
          </p>
        </section>

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
          <div className='container mx-auto rounded-2xl bg-gray-200 pb-8 pt-4 shadow dark:bg-gray-900'>
            <div className='px-2 sm:w-3/4 lg:w-5/12'>
              <h1
                id='popularne'
                className='flex flex-row justify-center text-center text-3xl text-amber-700'
              >
                <TerminalIcon /> Projekty na czasie
              </h1>
            </div>
            <div className='mx-auto flex flex-wrap justify-center gap-4'>
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
