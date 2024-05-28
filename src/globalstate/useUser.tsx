import { useEffect, useState } from 'react';

import useGlobalState from '@/globalstate/useGlobalState';
import { FetchUserAxios, User } from '@/utils/FetchProfile';

const useUser = (userName: string) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const state = useGlobalState();

  useEffect(() => {
    const name = userName.toLowerCase();
    if (state) {
      const { globalState } = state;
      if (globalState?.users.has(name)) {
        const user = globalState?.users.get(name);
        setUser(user);
        return;
      }
    }
    FetchUserAxios(userName.toLowerCase()).then((user) => {
      if (user && state) {
        state.globalState?.users.set(name, user);
      }
      setUser(user);
    });
  }, [state, userName]);

  return user;
};

export { useUser };
