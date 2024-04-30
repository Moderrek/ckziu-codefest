import { useState } from 'react';

import { useOwner, useSession } from '@/lib/auth/useSession';

import DefaultLayout from '@/components/layout/DefaultLayout';
import NextImage from '@/components/NextImage';
import ProfileContext from '@/components/profile/ProfileContext';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import Seo from '@/components/Seo';

import { Badge, User } from '@/utils/FetchProfile';

export function ProfileContent({ user }: { user: User }) {
  const [selectedbadge, setselectedbadge] = useState<Badge | undefined>(
    undefined
  );
  const session = useSession();
  const owner = useOwner(session, user.name);
  return (
    <DefaultLayout>
      {selectedbadge !== undefined ? (
        <dialog id='modal' className='modal'>
          <div className='modal-box border-2 bg-white/30 backdrop-blur-2xl'>
            <div className='center flex-col'>
              <NextImage
                alt='badgeImage'
                src={selectedbadge.image}
                width={128}
                height={128}
                imgClassName='rounded-full'
              />
              {selectedbadge.name}
            </div>
          </div>
          <form method='dialog' className='modal-backdrop'>
            <button></button>
          </form>
        </dialog>
      ) : (
        <></>
      )}

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
}
