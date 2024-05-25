import { Button, Tooltip } from '@material-tailwind/react';
import {
  Book,
  CalendarDays,
  Circle,
  CircleCheck,
  CircleHelp,
  Crown,
  TerminalIcon,
} from 'lucide-react';
import { NextPage } from 'next';

import { useSession } from '@/lib/auth/useSession';

import FaqSection from '@/components/FaqSection';
import ArticleSection from '@/components/fetchable/articles';
import { NewestProjects } from '@/components/fetchable/Projects';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import { RewardCard } from '@/components/RewardCard';
import Seo from '@/components/Seo';
import { CreateProjectRefButton } from '@/components/CreateProjectRefButton';
import { ParticipateButton } from '@/components/ParticipateButton';

const Index: NextPage = () => {
  const session = useSession();

  return (
    <DefaultLayout>
      <Seo />

      {/*<Homepage />*/}
      <section className='bg-gray-200 dark:bg-gray-900'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto'>
          <div className='grid items-center gap-8 mb-8 sm:mb-0 lg:gap-12 lg:grid-cols-12'>
            <div className='col-span-6 px-4 text-center sm:mb-6 lg:text-left lg:mb-0'>
              <h1 className='mb-2 text-4xl font-title leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white'>
                CKZiU CodeFest
              </h1>
              <h2 className='pb-2 text-3xl font-light text-gray-800 dark:text-gray-300 md:text-4xl'>
                Platforma konkursowa
              </h2>
              <p className='max-w-xl mx-auto mb-6 font-normal text-gray-900 lg:mx-0 xl:mb-2 md:text-lg xl:text-xl dark:text-gray-50'>
                CKZiU CodeFest to platforma konkursowa oraz miejsce do
                znajdowania jak i publikowania projektów o rozmaitych tematach
                stworzona przez Tymona Woźniaka
              </p>
              <div className='flex flex-row gap-4'>
                <ParticipateButton />

                <Tooltip content='Czytaj regulamin na stronie szkoły.'>
                  <UnstyledLink href='/regulamin' className='w-1/2'>
                    <Button
                      variant='gradient'
                      color='red'
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      className='flex flex-row flex-1 min-w-fit items-center justify-center gap-1 w-full'
                    >
                      <Book className='w-6 h-6' /> Regulamin konkursu
                    </Button>
                  </UnstyledLink>
                </Tooltip>
              </div>
            </div>
            <div className='col-span-6'>
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
          </div>
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
        <h2 className='flex flex-row items-center justify-center gap-2 text-4xl font-bold text-blue-300 tracking-tighter drop-shadow-lg'>
          <TerminalIcon className='w-10 h-10' />
          Najnowsze projekty
        </h2>
        <p className='mt-5 text-center'>
          Ostatnie projekty, które zostały zmodyfikowane na serwisie.
        </p>
        <div className='mx-auto mt-5 flex flex-wrap justify-center gap-4'>
          <NewestProjects />
        </div>
        <Button
          variant='filled'
          color='blue'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className='w-1/3 mt-5'
          onClick={() => {}}
        >
          Utwórz projekt
        </Button>
        <CreateProjectRefButton />
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
      <section className='relative px-1 pt-8 pb-4 bg-transparent lg:px-8 lg:pt-12 lg:mb-4 md:mt-12'>
        <div className='absolute inset-0'>
          <div className='bg-gray-200 dark:bg-gray-900/50 h-1/3 sm:h-2/3'></div>
        </div>
        <div className='relative px-2 mx-auto max-w-7xl'>
          <div className='text-center'>
            <h2 className='text-3xl font-black tracking-tight text-primary-500 dark:text-primary-300 sm:text-4xl'>
              Ostatnie wiadomości
            </h2>
            <p className='max-w-2xl mx-auto mt-3 text-xl text-gray-500 dark:text-gray-300 sm:mt-4'>
              Wiadomości serwisu oraz szkolne
            </p>
          </div>
          <div className='mx-auto text-gray-900 max-w-7xl dark:text-gray-50 md:px-1.5'>
            <div className='flex flex-wrap flex-row justify-center gap-4 mt-5'>
              <ArticleSection />
            </div>
          </div>
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
