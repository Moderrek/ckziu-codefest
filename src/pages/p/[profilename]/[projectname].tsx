import Seo from '@/components/Seo';

interface ProjectPageProps {
  username: string;
  projectname: string;
}

const ProjectPage = ({ username, projectname }: ProjectPageProps) => {
  return (
    <>
      <Seo templateTitle={`Projekt ${projectname}`} />
      <p>
        User: @{username} Project: {projectname}
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

  return {
    props: {
      username: profilename,
      projectname: projectname,
    },
  };
};

export { getServerSideProps };
export default ProjectPage;
