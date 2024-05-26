import { Tooltip } from '@material-tailwind/react';
import { CalendarDays, LockIcon, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import useSWR from 'swr';

import { API_V1 } from '@/lib/api/api';
import { getRelativeTimeString } from '@/lib/utils';

import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import ProfileContext from '@/components/profile/ProfileContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { useUser } from '@/globalstate/useUser';
import { CodefestProject, User } from '@/utils/FetchProfile';
import { UserCreatedDate } from '@/utils/UserCreatedDate';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function UserDisplayName(props: { user: User }) {
  const { user } = props;
  return <>{(user.flags & (1 << 0)) != 0 ? (
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
    {user.display_name}</>;
}

export const ProjectAuthor = ({
                                owner_name,
                                create,
                                type
                              }: {
  owner_name: string;
  create: number;
  type: string;
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

  const createDate = new Date(create).toISOString().slice(0, 10);

  return (
    <HoverCard openDelay={1}>
      <HoverCardTrigger asChild>
        <div className="flex items-center">
          <UnstyledLink href={`/p/${user.name}`}>
            <div className="shrink-0">
              <span className="sr-only">{user.display_name}</span>
              <div className="relative">
                <NextImage
                  alt={`${user.display_name} Profile Picture`}
                  src="/images/ckziu_thumbnail.png"
                  width={40}
                  height={40}
                  imgClassName="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 block size-3 rounded-full bg-green-400 content-['']" />
              </div>

            </div>
          </UnstyledLink>

          <div className="ml-3 pt-1">
            <UnstyledLink href={`/p/${user.name}`}>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                <UserDisplayName user={user} />
              </p>
            </UnstyledLink>

            <div className="flex space-x-1 text-sm text-gray-500 dark:text-white">
              <time dateTime={createDate}>{getRelativeTimeString(new Date(create))}</time>
              <span aria-hidden="true">·</span>
              <span>{type}</span>
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
                <UserDisplayName user={user} />
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

const Project = ({ project, showAuthor = false }: { project: CodefestProject, showAuthor: boolean }) => {
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
            href={`/p/${project.owner_name}/${project.name}`}
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
            // .filter((_) => Math.random() > 0.6)
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
        {
          showAuthor ? <div className="mt-6 ">
            <ProjectAuthor
              owner_name={project.owner_name}
              create={project.created_at}
              type="Projekt"
            />
          </div> : <></>
        }
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
        return <Project key={project.id} project={project} showAuthor />;
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

  // Render projects
  return (
    <>
      {projects.map((project) => {
        return <Project project={project} key={project.id} showAuthor={false} />;
      })}
    </>
  );
};

export { NewestProjects, Project, Projects };
