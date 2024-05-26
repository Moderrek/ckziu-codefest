import { useContext } from 'react';

import { Posts } from '@/components/Posts';
import ProfileContext from '@/components/profile/ProfileContext';
import { ProfilePostCreate } from '@/components/profile/ProfilePostCreate';

import { useName } from '@/globalstate/useName';
import { User } from '@/utils/FetchProfile';

const ProfilePosts = () => {
  const user: User = useContext(ProfileContext);
  const name: string | null = useName();
  const isOwner: boolean = name !== null && name === user.name;

  return <>
    <ProfilePostCreate />
    <div className="flex flex-col gap-4">
      <Posts />
    </div>
  </>;
};

export { ProfilePosts };