import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@material-tailwind/react';
import {
  Book,
  CalendarDays,
  Circle,
  CircleCheck,
  CircleHelp,
  Newspaper,
  Plus,
  TerminalIcon,
  Trophy,
} from 'lucide-react';
import { NextPage } from 'next';
import { CSSProperties } from 'react';

import { useCountdown } from '@/lib/useCountdown';

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
  const [days, hours, minutes, seconds] = useCountdown(
    Date.parse('01 May 2024 12:00:00 GMT+1')
  );

  return (
    <DefaultLayout>
      <Seo templateTitle='Strona główna' />

      {/*<Homepage />*/}
      <section className='container mx-auto mt-10 flex flex-col items-center'>
        <div className='flex flex-col items-center'>
          <CkziuLogo width={100} height={100} />
          <h1 className='font-title text-center text-4xl font-bold'>
            CKZiU
            <br />
            <span className='font-title text-5xl italic'>CODEFEST24</span>
          </h1>
        </div>

        <div className='mt-5'>
          <p className='text-center'>Uruchomienie serwisu za:</p>
          <div className='grid auto-cols-max grid-flow-col gap-5 text-center'>
            <div className='flex flex-col'>
              <span className='countdown font-mono text-5xl'>
                <span style={{ '--value': days } as CSSProperties}></span>
              </span>
              dni
            </div>
            <div className='flex flex-col'>
              <span className='countdown font-mono text-5xl'>
                <span style={{ '--value': hours } as CSSProperties}></span>
              </span>
              godz
            </div>
            <div className='flex flex-col'>
              <span className='countdown font-mono text-5xl'>
                <span style={{ '--value': minutes } as CSSProperties}></span>
              </span>
              min
            </div>
            <div className='flex flex-col'>
              <span className='countdown font-mono text-5xl'>
                <span style={{ '--value': seconds } as CSSProperties}></span>
              </span>
              sek
            </div>
          </div>
        </div>

        <div className='mt-5 flex flex-row flex-wrap justify-center gap-4'>
          <Tooltip content='Zgłoś swoją pracę do konkursu.'>
            <Button
              variant='gradient'
              color='green'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className='flex flex-row items-center justify-center gap-1'
              disabled={true}
            >
              <Plus /> Weź udział
            </Button>
          </Tooltip>

          <Tooltip content='Dołącz do discorda CKZiU CodeFest.'>
            <Button
              variant='gradient'
              color='indigo'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className='flex flex-row items-center justify-center gap-1'
              disabled={true}
            >
              <FontAwesomeIcon icon={faDiscord} /> Dołącz Discord
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
        <div className='md:w-1/2'>
          <p className='mt-5'>
            Konkurs polega wyłonieniu najlepszego twórcy stron internetowych w
            Centrum Kształcenia Zawodowego i Ustawicznego w Łodzi.
          </p>
          <p className='mt-5'>
            Organizowany przez CKZiU w Łodzi wraz z{' '}
            <Tooltip content='Uczeń 2TP w CKZiU'>Tymonem Woźniakiem</Tooltip> i{' '}
            <Tooltip content='Uczeń 2TP w CKZiU'>Filipem Sobczukiem</Tooltip>
          </p>
        </div>
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
            thumbnail='https://dharmamerchantservices.com/wp-content/uploads/2015/04/Question-mark-blackandwhite.png'
            rewardName='Więcej informacji niedługo'
          />
          <RewardCard
            thumbnail='https://dharmamerchantservices.com/wp-content/uploads/2015/04/Question-mark-blackandwhite.png'
            rewardName='Więcej informacji niedługo'
          />
          <RewardCard
            thumbnail='https://dharmamerchantservices.com/wp-content/uploads/2015/04/Question-mark-blackandwhite.png'
            rewardName='Więcej informacji niedługo'
          />
        </section>
        <p className='font-bold'>Więcej informacji niedługo...</p>
        <p className='mt-5'>
          Każdy uczestnik konkursu otrzyma unikatową odznakę uczestnictwa na
          profilu.
        </p>
        <p>
          Nagrody będą wybrane przez zwycięzców po kolei od pierwszego miejsca.
        </p>
      </section>

      <section className='container mx-auto mt-10 flex flex-col items-center'>
        <h2
          id='etapy'
          className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'
        >
          <CalendarDays />
          Etapy konkursu
        </h2>
        <ul className='timeline timeline-vertical'>
          <li>
            <div className='timeline-start'>
              1 kwietnia
              <br />
              <b>Ogłoszenie konkursu</b>
            </div>
            <div className='timeline-middle'>
              <CircleCheck className='text-green-600' />
            </div>
            <hr className='bg-primary' />
          </li>
          <li>
            <hr className='bg-primary' />
            <div className='timeline-middle'>
              <Circle />
            </div>
            <div className='timeline-end'>
              1 maja
              <br />
              <b>Zgłaszanie prac</b>
            </div>
            <hr className='bg-primary' />
          </li>
          <li>
            <hr className='bg-primary' />
            <div className='timeline-start'>
              1 czerwca
              <br />
              <b>Koniec zgłaszania prac</b>
            </div>
            <div className='timeline-middle'>
              <Circle />
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className='timeline-middle'>
              <Circle />
            </div>
            <div className='timeline-end'>
              2 czerwca
              <br />
              <b>Rozpoczęcie głosowania na projekty</b>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className='timeline-start'>
              7 czerwca
              <br />
              <b>Koniec głosowania i ogłoszenie wyników</b>
            </div>
            <div className='timeline-middle'>
              <Circle />
            </div>
          </li>
        </ul>
      </section>

      <section className='container mx-auto mt-10'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <CircleHelp />
          Najczęściej zadawane pytania
        </h2>
        <div className='container mx-auto flex justify-center'>
          <Accordion type='single' collapsible className='w-full lg:w-1/2'>
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
                Jeszcze nie można zgłaszać prac.
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
                Kształcenia Zawodowego i Ustawicznego w Łodzi wraz z Tymonem
                Woźniakiem (2TP) i Filipem Sobczukiem (2TP).
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
      <section className='container mx-auto mt-10'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <TerminalIcon />
          Najbardziej popularne projekty
        </h2>
        <div className='mx-auto mt-5 flex flex-wrap justify-center gap-4'>
          {/* PROJEKT */}
          <Projects />
        </div>
      </section>

      <section className='container mx-auto mb-20 mt-10 lg:mb-60'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <Newspaper />
          Ostatnie wiadomości
        </h2>
        <div className='mx-auto mt-5 flex flex-wrap justify-center gap-4'>
          <p>Nie znaleziono żadnych wiadomości.</p>
        </div>
      </section>

      {/* ARTICLES SECTION */}
      {/*<section className='bg-blue-gray-50 mt-20 py-20 lg:mt-60'>*/}
      {/*  <div className='container mx-auto'>*/}
      {/*    <div className='mx-auto px-2 sm:w-3/4 lg:w-5/12'>*/}
      {/*      <h1*/}
      {/*        id='wiadomosci'*/}
      {/*        className='mt-4 text-center text-3xl text-amber-500'*/}
      {/*      >*/}
      {/*        Najnowsze aktualności*/}
      {/*      </h1>*/}
      {/*      <p className='mt-4 text-center text-gray-600'>*/}
      {/*        Tutaj znajdziesz odpowiedzi na często zadawane pytania. Jeżeli nie*/}
      {/*        znajdziesz odpowiedzi na swój problem zadaj pytanie na naszym*/}
      {/*        Discordzie.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <div className='mx-auto mt-12 flex flex-wrap gap-4'>*/}
      {/*      <ArticleSection />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

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
