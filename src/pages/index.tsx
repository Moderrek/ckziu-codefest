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
import ArticleSection from '@/components/fetchable/articles';
import { NewestProjects } from '@/components/fetchable/Projects';
import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import { RewardCard } from '@/components/RewardCard';
import Seo from '@/components/Seo';

const Index: NextPage = () => {
  const session = useSession();

  return (
    <DefaultLayout>
      <Seo />

      {/*<Homepage />*/}
      <section className='main-section flex-col md:flex-row gap-8'>
        <div className='min-w-1/2'>
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
              <UnstyledLink
                href={session?.isAuthorized ? `/p/${session.name}` : '/zaloguj'}
              >
                <Button
                  variant='gradient'
                  color='green'
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className='flex flex-row flex-1 min-w-fit items-center justify-center gap-1'
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
                  className='flex flex-row flex-1 min-w-fit items-center justify-center gap-1'
                >
                  <Book /> Regulamin konkursu
                </Button>
              </UnstyledLink>
            </Tooltip>
          </div>
          <p className='mt-5'>
            Konkurs polega wyłonieniu najlepszego twórcy stron internetowych w
            Centrum Kształcenia Zawodowego i Ustawicznego w Łodzi.
          </p>
          <p className='mt-5'>
            Organizowany przez <b>CKZiU w Łodzi</b> wraz z twórcą serwisu
            <UnstyledLink href='https://github.com/Moderrek'>
              <Tooltip content='Kliknij aby zobaczyć profil GitHub'>
                <b>Tymonem Woźniakiem</b>
              </Tooltip>
            </UnstyledLink>
          </p>
        </div>
        <div>
          <UnstyledLink href='https://cez.lodz.pl/'>
            <NextImage
              alt='CKZiU'
              src='/images/ckziu_thumbnail.png'
              width={1000}
              height={1000}
              useSkeleton={true}
              className='w-full h-full'
              imgClassName='rounded-2xl drop-shadow-xl border-gradient border-2'
            />
          </UnstyledLink>
        </div>
      </section>

      <section className='main-section'>
        <h2
          id='nagrody'
          className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'
        >
          <Trophy className='text-amber-600' />
          <span className='text-amber-600'>Nagrody</span> konkursowe
        </h2>
        <section className='container mb-5 mt-5 center'>
          {/*<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8'>*/}
          <div className='flex flex-wrap justify-center gap-2 lg:gap-8'>
            <RewardCard
              thumbnail='/images/rewards/headphones.png'
              rewardName='Słuchawki'
            />
            <RewardCard
              thumbnail='/images/rewards/headphones.png'
              rewardName='Słuchawki'
            />

            <RewardCard
              thumbnail='/images/rewards/camera.png'
              rewardName='Kamerka'
            />

            <RewardCard
              thumbnail='/images/rewards/powerbank.png'
              rewardName='PowerBank 20000mAh'
            />
            <RewardCard
              thumbnail='/images/rewards/powerbank.png'
              rewardName='PowerBank 20000mAh'
            />

            <RewardCard
              thumbnail='/images/rewards/cable.png'
              rewardName='Łączówka'
            />
            <RewardCard
              thumbnail='/images/rewards/cable.png'
              rewardName='Łączówka'
            />
          </div>
        </section>
        <p className='font-bold'>Nagród może przybywać</p>
        <p className='mt-5'>
          Każdy uczestnik konkursu otrzyma unikatową odznakę uczestnictwa na
          profilu.
        </p>
        <p>
          Nagrody będą wybrane przez zwycięzców po kolei od pierwszego miejsca.
        </p>
      </section>

      {/* POPULARNE PROJEKTY */}
      <section className='main-section'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold text-blue-300'>
          <TerminalIcon />
          Najnowsze projekty
        </h2>
        <div className='mx-auto mt-5 flex flex-wrap justify-center gap-4'>
          {/* PROJEKT */}
          <NewestProjects />
        </div>
      </section>

      <section className='main-section'>
        <h2
          id='etapy'
          className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'
        >
          <CalendarDays className='text-purple-300' />
          <span className='text-purple-300'>Etapy</span> konkursu
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
            <hr className='bg-green-500' />
          </li>
          <li>
            <hr className='bg-green-500' />
            <div className='timeline-middle'>
              <CircleCheck className='text-green-600' />
            </div>
            <div className='timeline-end'>
              14 maja
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

      {/* WIADOMOŚCI */}
      <section className='main-section relative'>
        <svg
          className='invisible hidden md:visible md:block lg:visible absolute -scale-50 opacity-50'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='#8A3FFC'
            d='M28.8,-39.3C38.3,-32.7,47.6,-25.6,48.8,-17C50,-8.4,43,1.6,40.4,14.2C37.8,26.7,39.5,41.7,33.5,49.2C27.4,56.7,13.7,56.7,0,56.8C-13.8,56.8,-27.6,56.9,-33.6,49.4C-39.6,41.9,-37.7,26.8,-39.6,14.4C-41.6,2,-47.2,-7.6,-49.1,-20.3C-51,-33.1,-49.1,-49.1,-40.3,-55.9C-31.5,-62.8,-15.7,-60.7,-3.1,-56.5C9.6,-52.3,19.3,-46,28.8,-39.3Z'
            transform='translate(100 100)'
          />
        </svg>
        <svg
          className='invisible hidden md:visible md:block absolute translate-x-[-20%] translate-y-[-20%] -scale-50  opacity-50'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='#0F62FE'
            d='M60.7,-53.7C77,-44.3,87.6,-22.2,84.7,-2.9C81.8,16.4,65.5,32.8,49.1,46.9C32.8,61.1,16.4,73.1,1.9,71.2C-12.5,69.2,-25.1,53.4,-32.1,39.3C-39.2,25.1,-40.7,12.5,-38.7,2C-36.7,-8.5,-31,-16.9,-24,-26.3C-16.9,-35.7,-8.5,-46,6.8,-52.8C22.2,-59.7,44.3,-63.1,60.7,-53.7Z'
            transform='translate(100 100)'
          />
        </svg>
        <svg
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'
          className='invisible hidden md:visible md:block absolute translate-x-[20%] translate-y-[-28%] -scale-75  opacity-50'
        >
          <path
            fill='#F1C21B'
            d='M11.5,-26.4C15.8,-12.7,20.7,-10.5,34.2,-3.1C47.7,4.4,69.9,17.2,67.1,20.6C64.4,24.1,36.8,18.3,21.4,16.6C6.1,14.8,3,16.9,-1.3,18.8C-5.7,20.6,-11.4,22.1,-18.3,21.1C-25.2,20.2,-33.3,16.8,-33.4,12C-33.4,7.1,-25.3,0.7,-24.9,-10.4C-24.5,-21.6,-31.6,-37.5,-28.8,-51.6C-25.9,-65.7,-12.9,-77.9,-4.7,-71.5C3.6,-65.1,7.2,-40,11.5,-26.4Z'
            transform='translate(100 100)'
          />
        </svg>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <Newspaper />
          Ostatnie <span className='text-amber-400'>wydarzenia szkolne</span>
        </h2>
        <div className='mx-auto mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap justify-center gap-4'>
          <ArticleSection />
        </div>
      </section>

      {/*  FAQ */}
      <section className='main-section lg:mb-60 mb-10'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <CircleHelp />
          Najczęściej zadawane <span className='text-green-400'>pytania</span>
        </h2>
        <FaqSection />
      </section>
    </DefaultLayout>
  );
};

export default Index;
