import { Tooltip } from '@material-tailwind/react';
import { CalendarDays, LockIcon, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import useSWR from 'swr';

import { API_V1 } from '@/lib/api/api';

import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import ProfileContext from '@/components/profile/ProfileContext';
import { UserMention } from '@/components/profile/UserMention';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { useUser } from '@/globalstate/useUser';
import { CodefestProject } from '@/utils/FetchProfile';
import { UserCreatedDate } from '@/utils/UserCreatedDate';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProjectAuthor = ({
  owner_name,
  project_create,
}: {
  owner_name: string;
  project_create: number;
}) => {
  const user = useUser(owner_name);

  // Undefined => loading
  if (user == undefined) {
    return <></>;
  }

  // Null => not found
  if (user == null) {
    return <></>;
  }

  const createDate = new Date(project_create).toISOString().slice(0, 10);

  return (
    <HoverCard openDelay={1}>
      <HoverCardTrigger asChild>
        <div className='mt-6 flex items-center'>
          <UnstyledLink href={`/p/${user.name}`}>
            <div className='flex-shrink-0'>
              <span className='sr-only'>{user.display_name}</span>
              <NextImage
                alt={`${user.display_name} Profile Picture`}
                src='/images/ckziu_thumbnail.png'
                width={40}
                height={40}
                imgClassName='w-10 h-10 rounded-full'
              />
            </div>
          </UnstyledLink>

          <div className='pt-1 ml-3'>
            <UnstyledLink href={`/p/${user.name}`}>
              <p className='text-sm font-medium text-gray-900 dark:text-white'>
                {user.display_name}
              </p>
            </UnstyledLink>

            <div className='flex space-x-1 text-sm text-gray-500 dark:text-white'>
              <time dateTime={createDate}>{createDate}</time>
              <span aria-hidden='true'>·</span>
              <span>Projekt</span>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className='w-72'>
        <div className='flex justify-between'>
          <NextImage
            alt={`Profilowe @${user.name}`}
            src='/images/ckziu-cropped.svg'
            width={64}
            height={64}
            className='mr-2'
          />
          <div className='-space-y-1'>
            <Link href={`/p/${user.name}`} className='hover:underline'>
              <h4 className='text-sm font-semibold'>@{user.name}</h4>
            </Link>
            <p className='text-sm'>{user.bio}</p>
            <div className='flex items-center pt-2'>
              <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
              <span className='text-muted-foreground text-xs'>
                Dołączył {UserCreatedDate(user)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Project = ({ project }: { project: CodefestProject }) => {
  return (
    <div className='max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl'>
      <Link href={`/p/${project.owner_name}/${project.name}`}>
        <Image
          src='/images/ckziu_thumbnail.png'
          alt='ckziu_thumbnail'
          width={380}
          height={250}
          className='object-fill overflow-hidden rounded-t-lg'
        />
      </Link>
      <div className='px-6 py-4'>
        <div className='flex flex-row justify-between text-2xl font-bold'>
          <Link
            href={project.url}
            className='flex flex-row items-center min-w-fit gap-1 hover:underline hover:text-indigo-600 dark:hover:text-indigo-500'
          >
            {project.private ? (
              <Tooltip content='Tylko ty widzisz ten projekt'>
                <LockIcon />
              </Tooltip>
            ) : (
              <></>
            )}
            {project.tournament ? (
              <Tooltip content='Kandydat CKZiU CodeFest24'>
                <Trophy />
              </Tooltip>
            ) : (
              <></>
            )}
            {project.display_name}
          </Link>
        </div>
        <p className='mt-3 text-base text-gray-900 dark:text-gray-300'>
          {project.description}
        </p>
        <div className='mt-3 flex flex-wrap flex-row gap-1 font-medium'>
          {[
            'rust',
            'api',
            'vite',
            'sql',
            'python',
            'js',
            'gry',
            'strona',
            'discord',
            'node',
          ]
            .filter((_) => Math.random() > 0.6)
            .map((tag, idx) => {
              return (
                <UnstyledLink
                  key={idx}
                  className='py-0.5 px-2 rounded-md text-gray-50 dark:hover:bg-blue-500 bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 select-none'
                  href={`/tag/${tag}`}
                >
                  {tag}
                </UnstyledLink>
              );
            })}
        </div>
        <ProjectAuthor
          owner_name={project.owner_name}
          project_create={project.created_at}
        />
      </div>
    </div>
  );
};

const UserProject = (props: { project: CodefestProject }) => {
  const user = useContext(ProfileContext);
  const project: CodefestProject = props.project;

  return (
    <div className='max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl'>
      <Link href={`/p/${user.name}/${project.name}`}>
        <Image
          src='/images/ckziu_thumbnail.png'
          alt='ckziu_thumbnail'
          width={1140}
          height={760}
          className='min-w-fill rounded-b-lg shadow'
        />
      </Link>
      <div className='px-6 py-4'>
        <div className='flex flex-row justify-between text-2xl font-bold'>
          <Link
            href={`/p/${user.name}/${project.name}`}
            className='flex flex-row items-center min-w-fit gap-1 hover:underline'
          >
            {project.private ? (
              <Tooltip content='Tylko ty widzisz ten projekt'>
                <LockIcon />
              </Tooltip>
            ) : (
              <></>
            )}
            {project.tournament ? (
              <Tooltip content='Kandydat CKZiU CodeFest24'>
                <Trophy />
              </Tooltip>
            ) : (
              <></>
            )}
            {project.display_name}
          </Link>
          {/* <div
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
          </div> */}
        </div>
        <p className='text-base font-bold'>
          <UserMention userName={user.name} showAvatar={true} />
        </p>
        <div className='mt-2'>
          <p className='text-base text-gray-700 dark:text-gray-200'>
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

function ShadowProject() {
  return (
    <div className='max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl'>
      <div className='min-w-[340px] min-h-[250px] rounded-b-lg shadow bg-secondary animate-pulse'></div>
      <div className='px-6 py-4'>
        <div className='flex flex-row justify-between text-2xl font-bold'>
          <span className='flex flex-row items-center min-w-fit gap-1 hover:underline animate-pulse w-full'>
            <span className='bg-secondary rounded-3xl h-5 w-1/2'></span>
            <span className='bg-secondary rounded-3xl h-5 w-1/3'></span>
          </span>
        </div>
        <span className='flex flex-row items-center min-w-fit gap-1 hover:underline animate-pulse w-full'>
          <span className='bg-secondary rounded-full h-8 w-8'></span>
          <span className='bg-secondary rounded-3xl h-5 w-1/4'></span>
        </span>
        <div className='mt-2 w-full h-5 animate-pulse bg-secondary rounded-3xl'></div>
      </div>
    </div>
  );
}

const NewestProjects = () => {
  const { data, error, isLoading } = useSWR<CodefestProject[]>(
    `${API_V1}/projects`,
    fetcher
  );

  if (error || isLoading) {
    return (
      <>
        <ShadowProject />
        <ShadowProject />
        <ShadowProject />
        <ShadowProject />
      </>
    );
  }

  if (error || isLoading || !data)
    return (
      <>
        <p>Nie znaleziono żadnych projektów.</p>
      </>
    );

  // Render articles
  return (
    <>
      {data.map((project) => {
        return <Project key={project.id} project={project} />;
      })}
    </>
  );
};

const Projects = () => {
  const user = useContext(ProfileContext);
  const projects = user.projects;

  // Show empty skeleton articles while loading or error.
  if (!user || !projects || !projects.length)
    return (
      <>
        <p>Nie znaleziono żadnych projektów.</p>
      </>
    );

  // Render articles
  return (
    <>
      {projects.map((project) => {
        return <UserProject key={project.id} project={project} />;
      })}
    </>
  );
};

export { NewestProjects, Project, Projects };
