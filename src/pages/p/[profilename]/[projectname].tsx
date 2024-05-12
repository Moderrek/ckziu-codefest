import { Button } from '@material-tailwind/react';
import {
  CalendarPlus2,
  Flag,
  Github,
  Home,
  Link,
  LogOut,
  Settings,
  Trash,
  User,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';

import { useOwner, useSession } from '@/lib/auth/useSession';

import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import { UserMention } from '@/components/profile/UserMention';
import Seo from '@/components/Seo';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { CodefestProject, FetchProject } from '@/utils/FetchProfile';

interface ProjectPageProps {
  username: string;
  projectname: string;
  project: CodefestProject | null;
}

const markdown = String.raw`
<div align="center">
    <h1>⚔️ HegeWorld</h1>

[![CodeFactor](https://www.codefactor.io/repository/github/hegemonstudio/hegeworld/badge)](https://www.codefactor.io/repository/github/hegemonstudio/hegeworld)
[![build](https://github.com/HegemonStudio/HegeWorld/actions/workflows/gradle.yml/badge.svg)](https://github.com/HegemonStudio/HegeWorld/actions/workflows/gradle.yml)
![GitHub License](https://img.shields.io/github/license/HegemonStudio/HegeWorld)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/HegemonStudio/HegeWorld/total)
    
</div>

**HegeWorld** is an innovative custom Minecraft hard-survival mode with build and gunplay.

<h1 align="center">🔎 Overview</h1>

<div align="center">

<img src="https://raw.githubusercontent.com/HegemonStudio/HegeWorld/main/imgs/ground.gif" width="250px" height="250px">

<img src="https://raw.githubusercontent.com/HegemonStudio/HegeWorld/main/imgs/ore.gif" width="250px" height="250px">

<img src="https://raw.githubusercontent.com/HegemonStudio/HegeWorld/main/imgs/ak.gif" width="250px" height="250px">

</div>

## About The Project

### Collecting Resources

### Building Structures

### Raiding

### Game Events and Gun play

<h1 align="center">📥 How to install</h1>

1. Go to [Github HegeWorld releases](https://github.com/HegemonStudio/HegeWorld/releases).
2. Download latest jar file.
3. Upload ~~HegeWorld.jar~~ into ~~plugins/~~ on your server.
4. Install dependencies of HegeWorld. ([Download ImpactLib](https://github.com/Moderrek/ImpactMC/releases), [Download WorldEdit](https://dev.bukkit.org/projects/worldedit/files))
5. Restart server.
6. Enjoy **HegeWorld**!

<h1 align="center">💻 Developers</h1>

## Building

1. Clone repository
    ~~~shell
    git clone https://github.com/HegemonStudio/HegeWorld.git
    cd HegeWorld
    ~~~

2. Build gradle
   ~~~shell
   gradle build
   ~~~

3. Build jar file
    ~~~shell
    gradle jar
    ~~~
    The jar file will be located in ~~/build/libs/HegeWorld...jar~~

    A paragraph with *emphasis* and **strong importance**.

    > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
    
    * Lists
    * [ ] todo
    * [x] done
    
    A table:
    
    | a | b |
    | - | - |
    | Literka a | a tutaj B |
    | Literka a | a tutaj B |
    | Literka a | a tutaj B |

`;

const ProjectEdit = ({
  username,
  projectname,
  project,
}: {
  username: string;
  projectname: string;
  project: CodefestProject;
}) => {
  const [content, setContent] = useState<string>(markdown);
  const [projectName, setProjectName] = useState<string>(project.display_name);
  const [description, setDescription] = useState<string>(
    project.description ?? ''
  );
  const [madeAnyChanges, setMadeAnyChanges] = useState(false);
  const [uploadingChanges, setUploadingChanges] = useState(false);

  useEffect(() => {
    if (
      content != markdown ||
      projectName != project.display_name ||
      description != project.description
    ) {
      setMadeAnyChanges(true);
      return;
    }
    setMadeAnyChanges(false);
  }, [
    content,
    description,
    project.description,
    project.display_name,
    projectName,
  ]);

  const uploadChanges = async () => {
    setUploadingChanges(true);
  };

  return (
    <div className='p-5 w-full'>
      <NextImage
        src='/images/park.jpg'
        width={3000}
        height={2250}
        alt={project.display_name + ' tło'}
        imgClassName='rounded-xl'
        useSkeleton={true}
        className='w-full md:w-1/2 mb-2'
      />
      <Input
        className='font-title text-4xl'
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        disabled={uploadingChanges}
      />
      <div className='text-muted-foreground flex flex-row items-center'>
        <User /> Autorstwa{' '}
        <UserMention userName={username} showAvatar={false} />
      </div>
      <div className='text-muted-foreground flex flex-row items-center'>
        <CalendarPlus2 /> Utworzono{' '}
        {new Date(project.created_at).toLocaleDateString()}
      </div>
      <Textarea
        className='resize-none mt-5 ml-1 text-justify first-letter:text-2xl text-xl'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={uploadingChanges}
      />

      {/* Owner buttons */}
      <div className='mt-4 mb-4 flex flex-row gap-2'>
        <Button
          color='green'
          variant='gradient'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className='flex flex-row justify-center items-center min-w-fit mt-4 mb-4 p-2'
          disabled={!madeAnyChanges || uploadingChanges}
          loading={uploadingChanges}
          onClick={async () => await uploadChanges()}
        >
          Zapisz zmiany
        </Button>
        <Button
          color='red'
          variant='gradient'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className='flex flex-row justify-center items-center min-w-fit mt-4 mb-4 p-2'
        >
          <Trash className='w-4 h-4' />
          Usuń projekt
        </Button>
      </div>

      <div className='bg-accent rounded-xl p-4 border-2 border-gradient flex flex-row justify-between w-full gap-2'>
        <div className='w-1/2 min-h-full min-w-1/2 rounded-2xl'>
          <Textarea
            className='resize-none min-h-full'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={uploadingChanges}
          />
        </div>
        <Markdown
          className='markdown w-1/2 rounded-2xl'
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          rehypePlugins={[rehypeRaw, remarkImages, rehypeSanitize]}
          components={{
            code(props: any) {
              const { children, className, _, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag='div'
                  language={match[1]}
                  lineNumberContainerStyle={true}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};

const ProjectView = ({
  username,
  projectname,
  project,
}: {
  username: string;
  projectname: string;
  project: CodefestProject;
}) => {
  return (
    <div className='p-5 w-full'>
      <NextImage
        src='/images/park.jpg'
        width={3000}
        height={2250}
        alt={project.display_name + ' tło'}
        imgClassName='rounded-xl'
        useSkeleton={true}
        className='w-full md:w-1/2'
      />
      <div className='overflow-hidden'>
        <h1 className='font-title text-6xl animate-uptitle'>
          {project.display_name}
        </h1>
      </div>
      <div className='text-muted-foreground flex flex-row items-center'>
        <User /> Autorstwa{' '}
        <UserMention userName={username} showAvatar={false} />
      </div>
      <div className='text-muted-foreground flex flex-row items-center'>
        <CalendarPlus2 /> Utworzono{' '}
        {new Date(project.created_at).toLocaleDateString()}
      </div>
      <div className='mt-5 ml-1 text-justify first-letter:text-2xl text-xl'>
        {project.description}
      </div>
      <div className='mt-5 mb-5 flex flex-wrap flex-row gap-4 justify-center '>
        <UnstyledLink
          className='flex flex-row min-w-fit items-center gap-1 font-bold'
          href='/p/moderr'
        >
          <User className='w-8 h-8' />{' '}
          <UserMention userName={username} showAvatar={false} />
        </UnstyledLink>
        <UnstyledLink
          className='flex flex-row min-w-fit items-center gap-1 font-bold'
          href='/p/moderr'
        >
          <Github className='w-8 h-8' />
          Moderrek
        </UnstyledLink>
        <UnstyledLink
          className='flex flex-row min-w-fit items-center font-bold gap-1 break-words'
          href='/p/moderr'
        >
          <Link className='w-6 h-8' />
          <span className='underline text-blue-500'>
            https://ckziucodefest.pl
          </span>
        </UnstyledLink>
      </div>
      <Markdown
        className='markdown'
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw, remarkImages, rehypeSanitize]}
        components={{
          code(props: any) {
            const { children, className, _, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag='div'
                language={match[1]}
                lineNumberContainerStyle={true}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
};

const ProjectPage = ({ username, projectname, project }: ProjectPageProps) => {
  const session = useSession();
  const isOwner = useOwner(session, username);
  const [editMode, setEditMode] = useState(false);

  if (project === null) {
    return (
      <DefaultLayout
        breadcrumbs={[
          {
            name: username,
            url: `/p/${username}`,
          },
        ]}
      >
        <Seo templateTitle='Nie znaleziono projektu' />
        <section className='main-section'>
          <div className='flex flex-col items-center'>
            <CkziuLogo width={100} height={100} />
            <h2 className='font-title text-center text-4xl font-bold'>
              CODEFEST
            </h2>
            <h1 className='text-center text-2xl font-bold'>
              Nie znaleziono projektu{' '}
              <i>
                @{username}/{projectname}
              </i>
            </h1>
            <UnstyledLink href='/'>
              <Button
                color='red'
                className='center mt-5 flex-row gap-1'
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <LogOut /> Wróć na stronę główną
              </Button>
            </UnstyledLink>
          </div>
        </section>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout
      breadcrumbs={[
        {
          name: username,
          url: `/p/${username}`,
        },
        {
          name: project.name,
          url: `/p/${username}/${project.name}`,
        },
      ]}
    >
      <Seo
        templateTitle={`@${username}: ${project.display_name}`}
        description={
          `@${username}/${project.name}: ` + (project.description ?? ``)
        }
        date={new Date(project.created_at).toISOString()}
      />
      <div className='container mx-auto mb-5 md:mb-10'>
        <div className='rounded-2xl drop-shadow-xl border-4 border-gradient mt-0 lg:mt-10 bg-primary-foreground min-h-[80vh]'>
          <div className='flex flex-col md:flex-row min-h-[80vh]'>
            {isOwner ? (
              <div className='md:min-h-[80vh] w-full h-12 md:w-52 border-b-4 md:border-b-0 md:border-r-4 border-gradient flex flex-row md:flex-col items-center p-4 gap-2'>
                <Button
                  className='flex flex-row min-w-fit justify-between items-center p-2 w-full'
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={() => setEditMode(false)}
                >
                  <Home className='w-6 h-6' />
                  <span className='flex-1'>Widok</span>
                </Button>
                <Button
                  className='flex flex-row min-w-fit justify-between items-center p-2 w-full'
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={() => setEditMode(true)}
                >
                  <Settings className='w-6 h-6' />
                  <span className='flex-1'>Właściwości</span>
                </Button>
              </div>
            ) : (
              <></>
            )}
            {editMode ? (
              <ProjectEdit
                username={username}
                projectname={projectname}
                project={project}
              />
            ) : (
              <ProjectView
                username={username}
                projectname={projectname}
                project={project}
              />
            )}
            <div className='md:min-h-[80vh] w-full h-12 md:w-60 border-t-4 md:border-t-0 md:border-l-4 border-gradient flex flex-row md:flex-col items-center pt-4 gap-2'>
              <p>
                Licencja <b>MIT</b>
              </p>
              <div className='flex flex-wrap gap-2 justify-center text-sm text-white'>
                {[
                  'octocat',
                  'atom',
                  'electron',
                  'api',
                  'rust',
                  'nextjs',
                  'javascript',
                ].map((tag, idx) => {
                  return (
                    <span
                      key={idx}
                      className='bg-blue-500 border-blue-600 border-[1px] drop-shadow hover:bg-blue-600 select-none rounded-full p-1 pl-2 pr-2'
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              {!isOwner && session?.token ? (
                <div className='px-2'>
                  <Button
                    variant='gradient'
                    color='red'
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className='flex flex-row items-center justify-between min-w-fit py-2 px-4 w-full'
                  >
                    <Flag className='w-4 h-4' />
                    <span className='break-words flex-1'>Zgłoś projekt</span>
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const getServerSideProps = async ({
  query,
}: {
  query: { profilename: string; projectname: string };
}) => {
  // Extract profile name and project name from query
  // https://ckziucodefest.pl/p/PROFILE_NAME/PROJECT_NAME
  let { profilename, projectname } = query;
  profilename = profilename
    .trimEnd()
    .trimStart()
    .replace(' ', '-')
    .trim()
    .toLowerCase();

  projectname = projectname
    .trimEnd()
    .trimStart()
    .replace(' ', '-')
    .trim()
    .toLowerCase();

  // Fetched user from API can be User or null.
  // Null means Not Found.
  const project: CodefestProject | null = await FetchProject(
    profilename,
    projectname
  );

  return {
    props: {
      username: profilename,
      projectname: projectname,
      project: project,
    },
  };
};

export { getServerSideProps };
export default ProjectPage;
