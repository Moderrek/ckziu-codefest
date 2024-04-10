import { NextPage } from 'next';

import DefaultLayout from '@/components/layout/DefaultLayout';
import Seo from '@/components/Seo';
import { Button, Tooltip } from '@material-tailwind/react';
import { ApiProjectData } from '@/lib/api/api_responses';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, Check, Star, Vote } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Project = {
  name: string;
  displayName: string;
  thumbnailUrl?: string;
  ownerName: string;
  totalVotes: number;
};

const Project = (props: { project: Project }) => {
  const project: Project = props.project;

  const [liked, setLiked] = useState(false);
  const [select, setSelect] = useState(false);
  const [likes, setLikes] = useState(project.totalVotes);

  return (
    <div className='relative inline-flex w-fit'>
      {select ? (
        <div className='relative inline-flex'>
          <div className='absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-1/4  whitespace-nowrap rounded-full bg-indigo-500 p-1 text-center align-baseline text-xs font-bold leading-none text-white'>
            <Check />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        className='max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl'
        onClick={() => setSelect(!select)}
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
          <p className='text-base font-bold'>
            <div className='flex flex-row items-center '>
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
          </p>
          <div className='mt-2'>
            <p className='text-base text-gray-700 dark:text-gray-200'>
              {project.name}
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
  ];

  return (
    <DefaultLayout>
      <Seo
        templateTitle='Głosowanie CKZiU CodeFest 2024'
        description='Głosowanie na projekty w konkursie CKZiU CodeFest 2024'
      />

      <section className='mt-4 flex items-center justify-center lg:mt-10'>
        {/*STATS*/}
        <div className='stats stats-horizontal left-0 select-none  bg-indigo-500 text-white shadow'>
          <div className='stat rounded-t-none rounded-bl-none text-black dark:text-white'>
            <div className='stat-title'>Downloads</div>
            <div className='stat-value'>31K</div>
            <div className='stat-desc'>Jan 1st - Feb 1st</div>
          </div>

          <div className='stat text-black dark:text-white'>
            <div className='stat-title'>New Users</div>
            <div className='stat-value'>4,200</div>
            <div className='stat-desc'>↗︎ 400 (22%)</div>
          </div>

          <div className='stat text-black dark:text-white'>
            <div className='stat-title'>New Registers</div>
            <div className='stat-value'>1,200</div>
            <div className='stat-desc'>↘︎ 90 (14%)</div>
          </div>
        </div>
      </section>
      <section className='mt-4 flex items-center justify-center lg:mt-10'>
        {/* VOTING */}
        <Button
          variant='gradient'
          color='indigo'
          className='mb-5'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className='flex flex-row items-center justify-center'>
            <Vote /> Zagłosuj
          </div>
        </Button>
      </section>
      <section className='container mx-auto flex flex-row flex-wrap justify-center gap-8'>
        {/*  PROJECTS */}
        {projects.map((project, idx) => {
          return <Project key={idx} project={project} />;
        })}
      </section>
    </DefaultLayout>
  );
};

export default VotingPage;
