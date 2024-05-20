import { Button, Tooltip } from '@material-tailwind/react';
import {
  Book,
  CalendarDays,
  Circle,
  CircleCheck,
  CircleHelp,
  Crown,
  Newspaper,
  Plus,
  TerminalIcon,
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
              <span className='font-title text-5xl italic tracking-tight'>
                CODEFEST24
              </span>
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
        <div className='min-w-1/2'>
          <UnstyledLink href='https://cez.lodz.pl/'>
            <NextImage
              alt='CKZiU'
              src='/images/ckziu_thumbnail.png'
              width={680}
              height={400}
              className='w-full h-full'
              imgClassName='rounded-2xl drop-shadow-xl border-gradient border-2'
              useSkeleton={false}
              priority={true}
            />
          </UnstyledLink>
        </div>
      </section>
      <section className='main-section'>
        <h2
          id='nagrody'
          className='flex flex-row items-center justify-center gap-2 text-4xl font-bold tracking-tighter drop-shadow-lg'
        >
          <Crown className='text-amber-600 w-10 h-10' />
          <span className='text-amber-600'>Nagrody</span>konkursowe
        </h2>
        <p className='mt-5 text-center'>
          Każdy uczestnik konkursu otrzyma unikatową
          <br />
          <Tooltip
            content={
              <NextImage
                src='/images/cc_badge.png'
                alt='badge'
                width={64}
                height={64}
                imgClassName='rounded-full w-full h-full'
              />
            }
          >
            <b className='background-animate bg-gradient-to-r from-white via-amber-500 to-white bg-clip-text text-transparent'>
              odznakę uczestnictwa na profilu
            </b>
          </Tooltip>
          .
        </p>
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
        <p>
          Nagrody będą wybrane przez zwycięzców po kolei od pierwszego miejsca.
        </p>
      </section>

      {/* POPULARNE PROJEKTY */}
      <section className='main-section'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-4xl font-bold text-blue-300 tracking-tighter'>
          <TerminalIcon />
          Najnowsze projekty
        </h2>
        <div className='mx-auto mt-5 flex flex-wrap justify-center gap-4'>
          <NewestProjects />
        </div>
      </section>

      <section className='main-section'>
        <h2
          id='etapy'
          className='flex flex-row items-center justify-center gap-2 text-4xl font-bold tracking-tighter'
        >
          <CalendarDays className='text-purple-300' />
          <span className='text-purple-300'>Etapy</span> konkursu
        </h2>
        <ul className='timeline timeline-vertical mt-5'>
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
      <section className='main-section'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold tracking-tighter'>
          <Newspaper />
          Ostatnie <span className='text-amber-400 '>wydarzenia szkolne</span>
        </h2>
        <div className='flex flex-wrap flex-row justify-center gap-4 mt-5'>
          <ArticleSection />
        </div>
      </section>

      {/*  FAQ */}
      <section className='main-section lg:mb-60 mb-10'>
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold tracking-tighter'>
          <CircleHelp />
          Najczęściej zadawane <span className='text-green-400'>pytania</span>
        </h2>
        <div className='w-full mt-5'>
          <FaqSection />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Index;
