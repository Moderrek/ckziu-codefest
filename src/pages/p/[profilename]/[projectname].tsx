import { Button } from '@material-tailwind/react';
import { CalendarPlus2, LogOut, User } from 'lucide-react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';

import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import { UserMention } from '@/components/profile/UserMention';
import Seo from '@/components/Seo';

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

const ProjectPage = ({ username, projectname, project }: ProjectPageProps) => {
  if (project === null) {
    return (
      <DefaultLayout>
        <Seo templateTitle='Nie znaleziono profilu' />
        <section className='main-section'>
          <div className='flex flex-col items-center'>
            <CkziuLogo width={100} height={100} />
            <h2 className='font-title text-center text-4xl font-bold'>
              CODEFEST
            </h2>
            <h1 className='text-center text-2xl font-bold'>
              Nieznaleziono projektu{' '}
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
    <DefaultLayout>
      <Seo
        templateTitle={`Projekt ${projectname}`}
        description={
          project.description ??
          `Projekt ${project.display_name} stworzony przez ${username}`
        }
        date={new Date(project.created_at).toISOString()}
      />
      <div className='container mx-auto '>
        <div className='rounded drop-shadow-xl border-2 border-muted border-t-4 border-t-red-400 mt-0 lg:mt-10 bg-primary-foreground min-h-[80vh]'>
          <div className='flex flex-col md:flex-row min-h-[80vh]'>
            <div className='bg-primary-foreground md:min-h-[80vh] w-full h-12 md:w-52 border-b-2 md:border-b-0 md:border-r-2 light:border-gray-100'></div>
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
              <Markdown
                className='markdown'
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                rehypePlugins={[rehypeRaw, remarkImages]}
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
              <div className='flex flex-col items-center justify-center sm:mt-5 md:mt-20'>
                <NextImage
                  useSkeleton={true}
                  alt='CKZiU Logo'
                  src='/images/ckziu-cropped.svg'
                  width={150}
                  height={150}
                  className='animate-pulse'
                  fetchPriority='high'
                />
                <h2 className='font-title text-5xl animate-pulse'>P.W.T</h2>
              </div>
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
