import { Button, Tooltip } from '@material-tailwind/react';
import { Book, CircleHelp, Plus, TerminalIcon, Trophy } from 'lucide-react';
import { NextPage } from 'next';

import ArticleSection from '@/components/fetchable/articles';
import { Projects } from '@/components/fetchable/Projects';
import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import { RewardCard } from '@/components/RewardCard';
import Seo from '@/components/Seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Index: NextPage = () => {
  return (
    <DefaultLayout>
      <Seo templateTitle='Strona główna' />

      {/*<Homepage />*/}
      <section className='container mx-auto mt-10 flex flex-col items-center'>
        <div className='flex flex-col items-center'>
          <CkziuLogo width={100} height={100} />
          <h1 className='text-center text-4xl font-bold'>
            CKZiU
            <br />
            CodeFest 2024
          </h1>
        </div>

        <div className='mt-5 flex flex-row gap-4'>
          <Tooltip content='Zgłoś swoją pracę do konkursu.'>
            <Button
              variant='gradient'
              color='green'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className='flex flex-row items-center justify-center gap-1'
            >
              <Plus /> Weź udział
            </Button>
          </Tooltip>

          <Tooltip content='Czytaj regulamin na stronie szkoły.'>
            <UnstyledLink href='https://cez.lodz.pl/wp-content/uploads/2024/04/konkurs_codefest_2024_1.0.pdf'>
              <Button
                variant='gradient'
                color='red'
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className='flex flex-row items-center justify-center gap-1'
              >
                <Book /> Regulamin
              </Button>
            </UnstyledLink>
          </Tooltip>
        </div>
        <p className='mt-5'>Konkurs polega ...</p>
        <p className='mt-5'>
          Organizowany przez prof. Marka Bułę, Tymona Woźniaka i Filipa Sobczuka
        </p>
      </section>

      <section className='container mx-auto mt-10 flex flex-col items-center'>
        <h2
          id='nagrody'
          className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'
        >
          <Trophy />
          Nagrody konkursowe
        </h2>
        <section className='container mb-5 mt-5 flex flex-row flex-wrap justify-center gap-2 lg:gap-8'>
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
          Nagrody będą wybrane przez zwycięzców po kolei od pierwszego miejsca.
        </p>
      </section>

      <section className='container mx-auto mt-10'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <CircleHelp />
          Najczęściej zadawane pytania
        </h2>
        <div className='container mx-auto flex justify-center'>
          <Accordion type='single' collapsible className='w-1/2'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>
                Kto może wziąć udział w konkursie?
              </AccordionTrigger>
              <AccordionContent>
                Każdy uczeń Centrum Kształcenia Zawodowego i Ustawicznego w
                Łodzi.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>Jak zgłosić pracę?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>
                Czy jest możliwość zgłoszenia projektu grupowo?
              </AccordionTrigger>
              <AccordionContent>
                Nie, CKZiU CodeFest 2024 jest konkursem indywidualnym lecz w
                przyszłości nie jest to wykluczone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-4'>
              <AccordionTrigger>Czy konkurs jest darmowy?</AccordionTrigger>
              <AccordionContent>
                Tak, udział w konkursie jest darmowy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-5'>
              <AccordionTrigger>Kto jest organizatorem?</AccordionTrigger>
              <AccordionContent>
                Organizatorami konkursu CKZiU CodeFest 2024 jest Centrum
                Kształcenia Zawodowego i Ustawicznego w Łodzi, nauczyciel Marek
                Buła wraz z Tymonem Woźniakiem i Filipem Sobczukiem.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
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
              Tutaj znajdziesz odpowiedzi na często zadawane pytania. Jeżeli nie
              znajdziesz odpowiedzi na swój problem zadaj pytanie na naszym
              Discordzie.
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
  );
};

export default Index;
