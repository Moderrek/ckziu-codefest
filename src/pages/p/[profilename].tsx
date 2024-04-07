import { useRouter } from 'next/router';

import DefaultLayout from '@/components/layout/DefaultLayout';
import Seo from '@/components/Seo';

export default function Page() {
  const router = useRouter();

  const profileName: string = router.query.profilename as string;

  if (!profileName) {
    return (
      <>
        <Seo templateTitle='Ładowanie profilu..' />
        <p>Ładowanie...</p>
      </>
    );
  }

  return (
    <DefaultLayout>
      <Seo templateTitle={`Profil ${profileName}`} />
      <div className='m-0 min-h-full bg-amber-700'></div>
    </DefaultLayout>
  );
}
