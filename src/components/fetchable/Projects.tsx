import { Tooltip } from '@material-tailwind/react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { API_V1 } from '@/lib/api/api';
import { ApiProjectData, ApiProjectsData } from '@/lib/api/api_responses';

import { UserMention } from '@/components/profile/UserMention';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Project = (props: { project: ApiProjectData }) => {
  const project: ApiProjectData = props.project;

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(project.likes);

  return (
    <div className='max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl'>
      <Link href={`/p/${project.author}/${project.display_name}`}>
        <Image
          src={project.thumbnail_url}
          alt='ckziu_thumbnail'
          width={1140}
          height={760}
          className='min-w-fill rounded-b-lg shadow'
        />
      </Link>
      <div className='px-6 py-4'>
        <div className='flex flex-row justify-between text-2xl font-bold'>
          <Link
            href={`/p/${project.author}/${project.display_name}`}
            className='hover:underline'
          >
            {project.display_name}
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
            <UserMention userName={project.author} showAvatar={true} />
          </div>
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

const Projects = () => {
  const { data, error } = useSWRImmutable<ApiProjectsData, Error>(
    API_V1 + '/trending/projects',
    fetcher
  );

  // Show empty skeleton articles while loading or error.
  if (!data || error)
    return (
      <>
        <p>Nie znaleziono żadnych projektów.</p>
      </>
    );

  // Render articles
  return (
    <>
      {data.map((project, idx) => {
        return <Project key={idx} project={project} />;
      })}
    </>
  );
};

export { Project, Projects };
