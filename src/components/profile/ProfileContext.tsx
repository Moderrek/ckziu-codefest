import { createContext } from 'react';

import { User } from '@/utils/FetchProfile';

const ProfileContext = createContext<User>({
  name: '',
  display_name: '',
  id: '',
  bio: null,
  created_at: 0,
  updated_at: 0,
  flags: 0,
});

export default ProfileContext;
