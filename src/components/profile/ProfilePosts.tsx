import { useContext } from 'react';

import { PostsOnProfile } from '@/components/Posts';
import ProfileContext from '@/components/profile/ProfileContext';

import { useName } from '@/globalstate/useName';
import { User } from '@/utils/FetchProfile';

const ProfilePosts = () => {
  const user: User = useContext(ProfileContext);
  const name: string | null = useName();
  const isOwner: boolean = name !== null && name === user.name;

  return <>
    {/*<ProfilePostCreate />*/}
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <PostsOnProfile />
      </div>
    </div>
  </>;
};

export { ProfilePosts };