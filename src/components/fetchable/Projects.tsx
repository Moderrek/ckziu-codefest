import { Tooltip } from '@material-tailwind/react';
import { LockIcon, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import useSWR from 'swr';

import { API_V1 } from '@/lib/api/api';

import ProfileContext from '@/components/profile/ProfileContext';
import { UserMention } from '@/components/profile/UserMention';

import { CodefestProject } from '@/utils/FetchProfile';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Project = ({ project }: { project: CodefestProject }) => {
  return (
    <div className='max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl'>
      <Link href={project.url}>
        <Image
          src='/images/ckziu_thumbnail.png'
          alt='ckziu_thumbnail'
          width={380}
          height={250}
          className='min-w-fill rounded-b-lg shadow'
        />
      </Link>
      <div className='px-6 py-4'>
        <div className='flex flex-row justify-between text-2xl font-bold'>
          <Link
            href={project.url}
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
        </div>
        <p className='text-base font-bold'>
          <UserMention userName={project.owner_name} showAvatar={true} />
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

const NewestProjects = () => {
  const { data, error, isLoading } = useSWR<CodefestProject[]>(
    `${API_V1}/projects`,
    fetcher
  );

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
