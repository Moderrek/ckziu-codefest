import { Tooltip } from '@material-tailwind/react';
import { CalendarDays, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import useSWR from 'swr';

import { API_URL } from '@/lib/api';
import { ApiProjectData, ApiProjectsData } from '@/lib/api_responses';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';

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
            <HoverCard openDelay={1}>
              <HoverCardTrigger asChild>
                <Link
                  href={`/p/${project.author}`}
                  className='flex flex-row items-center hover:underline'
                >
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={project.thumbnail_url} />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <span className='ml-1'>@{project.author}</span>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='flex justify-between space-x-4'>
                  <Avatar>
                    <AvatarImage src={project.thumbnail_url} />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold'>@{project.author}</h4>
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
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { data, error } = useSWR<ApiProjectsData, Error>(
    API_URL + '/trending/projects',
    fetcher
  );

  // Show empty skeleton articles while loading or error.
  if (!data || error) return <></>;

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
