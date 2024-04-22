import DefaultLayout from '@/components/layout/DefaultLayout';
import ProfileContext from '@/components/profile/ProfileContext';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import Seo from '@/components/Seo';

import { FetchUser, User } from '@/utils/FetchProfile';

interface ProfilePageProps {
  user: User | null;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  if (user === null) {
    return (
      <DefaultLayout>
        <Seo templateTitle='Nie znaleziono profilu' />
        <p>Nie znaleziono profilu</p>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <Seo templateTitle={`Profil ${user.display_name}`} />
      <div className='flex min-h-full flex-col md:flex-row lg:flex-row'>
        <ProfileContext.Provider value={user}>
          {/* SIDEBAR */}
          <ProfileSidebar />
          {/* MAIN CONTENT */}
          <main className='flex h-full w-full flex-col items-center justify-center p-10'>
            <ProfileTabs />
          </main>
        </ProfileContext.Provider>
      </div>
    </DefaultLayout>
  );
};

export async function getServerSideProps({
  query,
}: {
  query: { profilename: string };
}) {
  const { profilename } = query;

  const user: User | null = await FetchUser(profilename);

  return {
    props: {
      user: user,
    },
  };
}

export default ProfilePage;
