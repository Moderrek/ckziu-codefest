import { useRouter } from 'next/router';

import Seo from '@/components/Seo';

export default function Page() {
  const router = useRouter();

  const profileName: string = router.query.profilename as string;
  const projectName: string = router.query.projectname as string;

  if (!projectName || !projectName) {
    return (
      <>
        <Seo templateTitle='Ładowanie projektu..' />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <Seo templateTitle={`Projekt ${projectName}`} />
      <p>
        Profile: {profileName} Project: {projectName}
      </p>
    </>
  );
}
