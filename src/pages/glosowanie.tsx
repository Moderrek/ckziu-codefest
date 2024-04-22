import { Button, Tooltip } from '@material-tailwind/react';
import { CalendarDays, Check, Star, Vote } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import Seo from '@/components/Seo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

type Project = {
  name: string;
  displayName: string;
  thumbnailUrl?: string;
  ownerName: string;
  totalVotes: number;
};

const Project = (props: { project: Project; canVote: boolean }) => {
  const { project, canVote } = props;

  const [liked, setLiked] = useState(false);
  const [select, setSelect] = useState(false);
  const [likes, setLikes] = useState(project.totalVotes);

  return (
    <div className='hover:animate-select relative inline-flex w-fit'>
      {canVote ? (
        <div className='relative inline-flex'>
          {select ? (
            <div className='absolute -right-5 -top-5 z-10 rounded-full border-2 border-green-400 bg-green-500 p-1 text-white'>
              <Check />
            </div>
          ) : (
            <div className='absolute -right-5 -top-5 z-10 rounded-full border-2 border-indigo-500 bg-none p-1 text-white'>
              <Check className='invisible' />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      <div
        className='max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl'
        onClick={() => {
          if (canVote) setSelect(!select);
        }}
      >
        <Link href={`/p/${project.ownerName}/${project.name}`}>
          <Image
            src={project.thumbnailUrl ?? '/images/ckziu_thumbnail.png'}
            alt='ckziu_thumbnail'
            width={1140}
            height={760}
            className='min-w-fill rounded-b-lg shadow'
          />
        </Link>
        <div className='px-6 py-4'>
          <div className='flex flex-row justify-between text-2xl font-bold'>
            <Link
              href={`/p/${project.ownerName}/${project.name}`}
              className='hover:underline'
            >
              {project.displayName}
            </Link>
            <div
              className='ml-5 flex cursor-pointer select-none flex-row justify-between text-right'
              onClick={() => {
                setLiked(!liked);
                if (!liked) setLikes(likes + 1);
                else setLikes(likes - 1);
              }}
            >
              <Tooltip content='Kliknij aby polubić'>
                <Star
                  stroke={liked ? '#FDE047' : 'black'}
                  fill={liked ? '#FDE047' : 'none'}
                  className='drop-shadow'
                />
              </Tooltip>
              {likes}
            </div>
          </div>
          <div className='flex flex-row items-center text-base font-bold '>
            <HoverCard openDelay={1}>
              <HoverCardTrigger asChild>
                <Link
                  href={`/p/${project.ownerName}`}
                  className='flex flex-row items-center hover:underline'
                >
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={project.thumbnailUrl} />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <span className='ml-1'>@{project.ownerName}</span>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='flex justify-between space-x-4'>
                  <Avatar>
                    <AvatarImage src={project.thumbnailUrl} />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold'>
                      @{project.ownerName}
                    </h4>
                    <p className='text-sm'>Autor serwisu CKZiU CodeFest</p>
                    <div className='flex items-center pt-2'>
                      <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
                      <span className='text-muted-foreground text-xs'>
                        Dołączył kwiecień 2024
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className='mt-2'>
            <p className='text-base text-gray-700 dark:text-gray-200'>
              {project.name} {canVote ? 'GŁOSOWANIE' : 'Kliknij zagłosuj'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VotingPage: NextPage = (): JSX.Element => {
  const projects: Project[] = [
    {
      name: 'kittycode',
      displayName: 'KittyCode',
      ownerName: 'drakvlaa',
      totalVotes: 69,
    },
    {
      name: 'cedit',
      displayName: 'C-Edit',
      ownerName: 'drakvlaa',
      totalVotes: 123,
    },
    {
      name: 'liczbapi',
      displayName: 'Szacowanie liczby PI',
      thumbnailUrl:
        'https://naukatolubie.pl/app/uploads/2022/03/dzien-liczby-Pi-1.jpg',
      ownerName: 'bulkas',
      totalVotes: 3141,
    },
    {
      name: 'nodeinstall',
      displayName: 'Node Installer [NO-ADMIN] H.I.T',
      ownerName: 'moderr',
      totalVotes: 40,
    },
    {
      name: 'liczbapi',
      displayName: 'Szacowanie liczby PI',
      thumbnailUrl:
        'https://naukatolubie.pl/app/uploads/2022/03/dzien-liczby-Pi-1.jpg',
      ownerName: 'bulkas',
      totalVotes: 3141,
    },
    {
      name: 'nodeinstall',
      displayName: 'Node Installer [NO-ADMIN] H.I.T',
      ownerName: 'moderr',
      totalVotes: 40,
    },
    {
      name: 'liczbapi',
      displayName: 'Szacowanie liczby PI',
      thumbnailUrl:
        'https://naukatolubie.pl/app/uploads/2022/03/dzien-liczby-Pi-1.jpg',
      ownerName: 'bulkas',
      totalVotes: 3141,
    },
    {
      name: 'nodeinstall',
      displayName: 'Node Installer [NO-ADMIN] H.I.T',
      ownerName: 'moderr',
      totalVotes: 40,
    },
    {
      name: 'lawkalocalizator',
      displayName: 'Lokalizator Ławek',
      ownerName: 'CKZiU',
      thumbnailUrl: '/images/park.jpg',
      totalVotes: 420,
    },
  ];

  const [voteing, setVoteing] = useState(false);

  return (
    <DefaultLayout>
      <Seo
        templateTitle='Głosowanie CKZiU CodeFest 2024'
        description='Głosowanie na projekty w konkursie CKZiU CodeFest 2024'
      />

      <section className='container mx-auto mt-10 flex flex-col items-center'>
        <CkziuLogo width={100} height={100} />
        <h1 className='text-center text-4xl font-semibold hover:underline'>
          CKZiU
          <br />
          CodeFest 2024
        </h1>
      </section>
      <section className='mt-4 flex items-center justify-center lg:mt-10'>
        {/*STATS*/}
        <div className='stats stats-horizontal left-0 select-none  bg-indigo-500 text-white shadow'>
          <div className='stat rounded-t-none rounded-bl-none text-white'>
            <div className='stat-title'>Projektów</div>
            <div className='stat-value'>16</div>
            <div className='stat-desc'>Kwiecień 1st - Czerwiec 1st</div>
          </div>

          <div className='stat text-white'>
            <div className='stat-title'>Oddanych głosów</div>
            <div className='stat-value'>4,200</div>
            <div className='stat-desc text-green-400'>↗︎ 400 (22%)</div>
          </div>

          <div className='stat text-white'>
            <div className='stat-title'>New Registers</div>
            <div className='stat-value'>1,200</div>
            <div className='stat-desc text-red-400'>↘︎ 90 (14%)</div>
          </div>
        </div>
      </section>
      <section className='mt-4 flex flex-col items-center justify-center lg:mt-10'>
        {/* VOTING */}
        <Button
          variant='gradient'
          color='indigo'
          className='mb-5'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() => {
            setVoteing(!voteing);
          }}
        >
          <div className='flex flex-row items-center justify-center'>
            <Vote /> {voteing ? 'Głosowanie..' : 'Zagłosuj'}
          </div>
        </Button>
        <p>Kliknij zagłosuj aby zaznaczyć prace na, które chcesz zagłosować.</p>
      </section>
      <section className='container mx-auto mb-10 mt-10 flex flex-row flex-wrap justify-center gap-8'>
        {/*  PROJECTS */}
        {projects.map((project, idx) => {
          return <Project key={idx} project={project} canVote={voteing} />;
        })}
      </section>
    </DefaultLayout>
  );
};

export default VotingPage;
