import { useState } from 'react';

import DefaultLayout from '@/components/layout/DefaultLayout';
import NextImage from '@/components/NextImage';
import ProfileContext from '@/components/profile/ProfileContext';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import Seo from '@/components/Seo';

import { Badge, FetchUser, User } from '@/utils/FetchProfile';

interface ProfilePageProps {
  user: User | null;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [selectedbadge, setselectedbadge] = useState<Badge | undefined>(
    undefined
  );
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
      <dialog id='modal' className='modal'>
        <div className='modal-box border border-2 bg-white/30 backdrop-blur-2xl'>
          <div className='center flex-col'>
            <NextImage
              alt='badgeImage'
              src={selectedbadge!.image}
              width={128}
              height={128}
              imgClassName='rounded-full'
            />
            {selectedbadge?.name}
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button></button>
        </form>
      </dialog>
      <Seo templateTitle={`Profil ${user.display_name}`} />
      <div className='flex min-h-full flex-col md:flex-row lg:flex-row'>
        <ProfileContext.Provider value={user}>
          {/* SIDEBAR */}
          <ProfileSidebar setCurrentBadge={setselectedbadge} />
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
