import CkziuLogo from '@/components/images/CkziuLogo';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import { CodefestProject, FetchProject } from '@/utils/FetchProfile';
import { Button } from '@material-tailwind/react';
import { LogOut } from 'lucide-react';

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
              Nieznaleziono projektu <i>@{username}/{projectname}</i>
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
    <>
      <Seo templateTitle={`Projekt ${projectname}`} />
      <p>
        User: @{username} Project: {projectname} Id: {project.id}
      </p>
    </>
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
  const project: CodefestProject | null = await FetchProject(profilename, projectname);

  return {
    props: {
      username: profilename,
      projectname: projectname,
      project: project
    },
  };
};

export { getServerSideProps };
export default ProjectPage;
