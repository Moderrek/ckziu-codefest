import { useContext } from 'react';

import ProfileContext from '@/components/profile/ProfileContext';

import { useName } from '@/globalstate/useName';
import { User } from '@/utils/FetchProfile';

const ProfilePostCreate = () => {
  const user: User = useContext(ProfileContext);
  const name: string | null = useName();
  const isOwner: boolean = name !== null && name === user.name;
  if (!isOwner) return <></>;
  return 'Creator';
};

export { ProfilePostCreate };