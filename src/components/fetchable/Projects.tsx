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
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { useUser } from '@/globalstate/useUser';
import { CodefestProject } from '@/utils/FetchProfile';
import { UserCreatedDate } from '@/utils/UserCreatedDate';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProjectAuthor = ({
                         owner_name,
                         project_create
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
        <div className="mt-6 flex items-center">
          <UnstyledLink href={`/p/${user.name}`}>
            <div className="shrink-0">
              <span className="sr-only">{user.display_name}</span>
              <NextImage
                alt={`${user.display_name} Profile Picture`}
                src="/images/ckziu_thumbnail.png"
                width={40}
                height={40}
                imgClassName="w-10 h-10 rounded-full"
              />
            </div>
          </UnstyledLink>

          <div className="ml-3 pt-1">
            <UnstyledLink href={`/p/${user.name}`}>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.display_name}
              </p>
            </UnstyledLink>

            <div className="flex space-x-1 text-sm text-gray-500 dark:text-white">
              <time dateTime={createDate}>{createDate}</time>
              <span aria-hidden="true">·</span>
              <span>Projekt</span>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center">
          <UnstyledLink href={`/p/${user.name}`}>
            <div className="shrink-0">
              <span className="sr-only">{user.display_name}</span>
              <NextImage
                alt={`${user.display_name} Profile Picture`}
                src="/images/ckziu_thumbnail.png"
                width={40}
                height={40}
                imgClassName="w-10 h-10 rounded-full"
              />
            </div>
          </UnstyledLink>

          <div className="ml-3 pt-1">
            <UnstyledLink href={`/p/${user.name}`}>
              <p className="text-sm font-medium text-gray-900 hover:underline dark:text-white">
                {(user.flags & (1 << 0)) != 0 ? (
                  <span className="mr-1 font-title text-red-400 drop-shadow">
                  <Tooltip content={<b>Personel</b>}>S</Tooltip>
                </span>
                ) : (
                  <></>
                )}
                {(user.flags & (1 << 1)) != 0 ? (
                  <span className="mr-1 font-title text-amber-400 drop-shadow">
                  <Tooltip content={<b>Programista</b>}>D</Tooltip>
                </span>
                ) : (
                  <></>
                )}
                {(user.flags & (1 << 2)) != 0 ? (
                  <span className="mr-1 font-title text-indigo-400 drop-shadow">
                  <Tooltip content="Nauczyciel">N</Tooltip>
                </span>
                ) : (
                  <></>
                )}
                {(user.flags & (1 << 3)) != 0 ? (
                  <span className="mr-1 font-title text-indigo-400 drop-shadow">
                  <Tooltip content="Moderator">M</Tooltip>
                </span>
                ) : (
                  <></>
                )}
                {user.display_name}
              </p>
            </UnstyledLink>
            <p className="text-sm">
              {user.bio}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500 dark:text-white">
              <CalendarDays className="mr-2 size-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
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
    <div className="max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl">
      <Link href={`/p/${project.owner_name}/${project.name}`}>
        <Image
          src="/images/project_template.png"
          alt="ckziu_thumbnail"
          width={380}
          height={250}
          className="overflow-hidden rounded-t-lg object-fill"
        />
      </Link>
      <div className="px-6 py-4">
        <div className="flex flex-row justify-between text-2xl font-bold">
          <Link
            href={project.url}
            className="flex min-w-fit flex-row items-center gap-1 hover:text-indigo-600 hover:underline dark:hover:text-indigo-500"
          >
            {project.private ? (
              <Tooltip content="Tylko ty widzisz ten projekt">
                <LockIcon />
              </Tooltip>
            ) : (
              <></>
            )}
            {project.tournament ? (
              <Tooltip content="Kandydat CKZiU CodeFest24">
                <Trophy />
              </Tooltip>
            ) : (
              <></>
            )}
            {project.display_name}
          </Link>
        </div>
        <p className="mt-3 text-base text-gray-900 dark:text-gray-300">
          {project.description}
        </p>
        <div className="mt-3 flex flex-row flex-wrap gap-1 font-medium">
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
            'node'
          ]
            .filter((_) => Math.random() > 0.6)
            .map((tag, idx) => {
              return (
                <UnstyledLink
                  key={idx}
                  className="select-none rounded-md bg-blue-500 px-2 py-0.5 text-gray-50 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500"
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
    <div className="max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl">
      <Link href={`/p/${user.name}/${project.name}`}>
        <Image
          src="/images/ckziu_thumbnail.png"
          alt="ckziu_thumbnail"
          width={1140}
          height={760}
          className="min-w-fill rounded-b-lg shadow"
        />
      </Link>
      <div className="px-6 py-4">
        <div className="flex flex-row justify-between text-2xl font-bold">
          <Link
            href={`/p/${user.name}/${project.name}`}
            className="flex min-w-fit flex-row items-center gap-1 hover:underline"
          >
            {project.private ? (
              <Tooltip content="Tylko ty widzisz ten projekt">
                <LockIcon />
              </Tooltip>
            ) : (
              <></>
            )}
            {project.tournament ? (
              <Tooltip content="Kandydat CKZiU CodeFest24">
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
        <p className="text-base font-bold">
          <UserMention userName={user.name} showAvatar={true} />
        </p>
        <div className="mt-2">
          <p className="text-base text-gray-700 dark:text-gray-200">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

function ShadowProject() {
  return (
    <div className="max-w-sm overflow-hidden rounded-b rounded-t-lg border-b-4 border-r-4 shadow-2xl">
      <div className="min-h-[250px] min-w-[340px] animate-pulse rounded-b-lg bg-secondary shadow"></div>
      <div className="px-6 py-4">
        <div className="flex flex-row justify-between text-2xl font-bold">
          <span className="flex w-full min-w-fit animate-pulse flex-row items-center gap-1 hover:underline">
            <span className="h-5 w-1/2 rounded-3xl bg-secondary"></span>
            <span className="h-5 w-1/3 rounded-3xl bg-secondary"></span>
          </span>
        </div>
        <span className="flex w-full min-w-fit animate-pulse flex-row items-center gap-1 hover:underline">
          <span className="size-8 rounded-full bg-secondary"></span>
          <span className="h-5 w-1/4 rounded-3xl bg-secondary"></span>
        </span>
        <div className="mt-2 h-5 w-full animate-pulse rounded-3xl bg-secondary"></div>
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
