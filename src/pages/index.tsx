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

import { useSession } from '@/lib/auth/useSession';

import FaqSection from '@/components/FaqSection';
import { Projects } from '@/components/fetchable/Projects';
import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import { RewardCard } from '@/components/RewardCard';
import Seo from '@/components/Seo';

const Index: NextPage = () => {
  const session = useSession();

  return (
    <DefaultLayout>
      <Seo />

      {/*<Homepage />*/}
      <section className='main-section'>
        <div className='flex flex-col items-center'>
          <CkziuLogo width={150} height={150} />
          <h1 className='font-title text-center text-4xl font-bold'>
            CKZiU
            <br />
            <span className='font-title text-5xl italic'>CODEFEST24</span>
          </h1>
        </div>

        <div className='mt-5 flex flex-row flex-wrap justify-center gap-4'>
          <Tooltip content='Zgłoś swoją pracę do konkursu.'>
            <UnstyledLink href={ session?.isAuthorized ? `/p/${session.name}` : '/zaloguj'}>
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
            </UnstyledLink>

          </Tooltip>

          <Tooltip content='Czytaj regulamin na stronie szkoły.'>
            <UnstyledLink href='/regulamin'>
              <Button
                variant='gradient'
                color='red'
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className='flex flex-row items-center justify-center gap-1'
              >
                <Book /> Regulamin konkursu
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
            Organizowany przez <b>CKZiU w Łodzi</b> wraz z twórcą serwisu 
            <UnstyledLink href='https://github.com/Moderrek'>
            <Tooltip content='Kliknij aby zobaczyć profil GitHub'><b>Tymonem Woźniakiem</b></Tooltip>
              </UnstyledLink>
          </p>
        </div>
      </section>

      <section className='main-section'>
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

      <section className='main-section'>
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
              7 maja
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
            <hr className='bg-primary' />
          </li>
          <li>
            <hr className='bg-primary' />
            <div className='timeline-middle'>
              <Circle />
            </div>
            <div className='timeline-end'>
              2 czerwca
              <br />
              <b>Rozpoczęcie głosowania na projekty</b>
            </div>
            <hr className='bg-primary' />
          </li>
          <li>
            <hr className='bg-primary' />
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

      {/*  FAQ */}
      <section className='main-section'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <CircleHelp />
          Najczęściej zadawane pytania
        </h2>
        <FaqSection />
      </section>

      {/* POPULARNE PROJEKTY */}
      <section className='main-section'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <TerminalIcon />
          Najbardziej popularne projekty
        </h2>
        <div className='mx-auto mt-5 flex flex-wrap justify-center gap-4'>
          {/* PROJEKT */}
          <Projects />
        </div>
      </section>

      {/* WIADOMOŚCI */}
      <section className='main-section lg:mb-60'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <Newspaper />
          Ostatnie wiadomości
        </h2>
        <div className='mx-auto mt-5 flex flex-wrap justify-center gap-4'>
          <p>Nie znaleziono żadnych wiadomości.</p>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Index;
