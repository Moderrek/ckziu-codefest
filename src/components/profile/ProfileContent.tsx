import { useState } from 'react';

import DefaultLayout from '@/components/layout/DefaultLayout';
import ProfileContext from '@/components/profile/ProfileContext';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import Seo from '@/components/Seo';

import { profileUrl } from '@/config/constants';
import { Badge, User } from '@/utils/FetchProfile';

export function ProfileContent({ user }: { user: User }) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | undefined>(undefined);

  return (
    <DefaultLayout
      breadcrumbs={[
        {
          name: user.name,
          url: profileUrl(user.name)
        }
      ]}
    >
      <Seo templateTitle={`Profil ${user.display_name}`} />
      <ProfileContext.Provider value={user}>
        <div className="flex min-h-screen flex-1 grow flex-col md:flex-row lg:flex-row">
          {/* SIDEBAR */}
          <ProfileSidebar setCurrentBadge={setSelectedBadge} />
          {/* MAIN CONTENT */}
          <main className="flex size-full flex-col items-center justify-center overflow-auto p-10">
            <ProfileTabs />
          </main>
        </div>
      </ProfileContext.Provider>
    </DefaultLayout>
  );
}
