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
import ArticleSection from '@/components/fetchable/articles';

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
      <section className='main-section lg:mb-60 relative'>
      {/* <svg className='invisible lg:visible absolute -scale-50' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="#8A3FFC" d="M28.8,-39.3C38.3,-32.7,47.6,-25.6,48.8,-17C50,-8.4,43,1.6,40.4,14.2C37.8,26.7,39.5,41.7,33.5,49.2C27.4,56.7,13.7,56.7,0,56.8C-13.8,56.8,-27.6,56.9,-33.6,49.4C-39.6,41.9,-37.7,26.8,-39.6,14.4C-41.6,2,-47.2,-7.6,-49.1,-20.3C-51,-33.1,-49.1,-49.1,-40.3,-55.9C-31.5,-62.8,-15.7,-60.7,-3.1,-56.5C9.6,-52.3,19.3,-46,28.8,-39.3Z" transform="translate(100 100)" />
</svg>
<svg className='invisible lg:visible absolute translate-x-[-20%] translate-y-[-20%] -scale-50' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="#0F62FE" d="M60.7,-53.7C77,-44.3,87.6,-22.2,84.7,-2.9C81.8,16.4,65.5,32.8,49.1,46.9C32.8,61.1,16.4,73.1,1.9,71.2C-12.5,69.2,-25.1,53.4,-32.1,39.3C-39.2,25.1,-40.7,12.5,-38.7,2C-36.7,-8.5,-31,-16.9,-24,-26.3C-16.9,-35.7,-8.5,-46,6.8,-52.8C22.2,-59.7,44.3,-63.1,60.7,-53.7Z" transform="translate(100 100)" />
</svg> */}
      {/* <svg className='absolute translate-y-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,96L17.1,106.7C34.3,117,69,139,103,154.7C137.1,171,171,181,206,160C240,139,274,85,309,69.3C342.9,53,377,75,411,96C445.7,117,480,139,514,176C548.6,213,583,267,617,277.3C651.4,288,686,256,720,208C754.3,160,789,96,823,96C857.1,96,891,160,926,186.7C960,213,994,203,1029,197.3C1062.9,192,1097,192,1131,186.7C1165.7,181,1200,171,1234,165.3C1268.6,160,1303,160,1337,181.3C1371.4,203,1406,245,1423,266.7L1440,288L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"></path></svg> */}
        <h2 className='flex flex-row items-center justify-center gap-2 text-3xl font-bold'>
          <Newspaper />
          Ostatnie wydarzenia szkolne
        </h2>
        <div className='mx-auto mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap justify-center gap-4'>
          <ArticleSection/>
        </div>
      </section>

    </DefaultLayout>
  );
};

export default Index;
