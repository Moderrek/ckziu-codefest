import { Button } from '@material-tailwind/react';
import { CalendarPlus2, LogOut, User } from 'lucide-react';

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
      <Seo templateTitle={`Projekt ${projectname}`} />
      <div className='container mx-auto'>
        <div className='rounded drop-shadow-xl border-t-4 border-red-400 mt-0 lg:mt-10 bg-primary-foreground min-h-[80vh]'>
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
              <div className='mt-5 ml-1 text-justify first-letter:text-2xl text-xl'>{project.description}</div>
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
