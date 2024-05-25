import { useState } from 'react';

import DefaultLayout from '@/components/layout/DefaultLayout';
import NextImage from '@/components/NextImage';
import ProfileContext from '@/components/profile/ProfileContext';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import Seo from '@/components/Seo';

import { Badge, User } from '@/utils/FetchProfile';

export function ProfileContent({ user }: { user: User }) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | undefined>(
    undefined
  );

  return (
    <DefaultLayout
      breadcrumbs={[
        {
          name: user.name,
          url: `/p/${user.name}`
        }
      ]}
    >
      {selectedBadge !== undefined ? (
        <dialog id="modal" className="modal">
          <div className="modal-box border-2 bg-white/30 backdrop-blur-2xl">
            <div className="center flex-col">
              <NextImage
                alt="badgeImage"
                src={selectedBadge.image}
                width={128}
                height={128}
                imgClassName="rounded-full"
              />
              {selectedBadge.name}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button></button>
          </form>
        </dialog>
      ) : (
        <></>
      )}

      <Seo templateTitle={`Profil ${user.display_name}`} />
      <div className="flex min-h-full flex-col md:flex-row lg:flex-row">
        <ProfileContext.Provider value={user}>
          {/* SIDEBAR */}
          <ProfileSidebar setCurrentBadge={setSelectedBadge} />
          {/* MAIN CONTENT */}
          <main className="flex size-full flex-col items-center justify-center p-10">
            <ProfileTabs />
          </main>
        </ProfileContext.Provider>
      </div>
    </DefaultLayout>
  );
}
