import { useEffect, useState } from "react";

import useGlobalState from "@/globalstate/useGlobalState";
import { FetchUserAxios, User } from "@/utils/FetchProfile";

const useUser = (userName: string) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const state = useGlobalState();

  useEffect(() => {
    if (!userName) {
      setUser(undefined);
      return;
    }
    const name = userName.toLowerCase();
    // Check global cache
    if (state) {
      const { globalState } = state;
      // First load from global cache and then start fetching...
      if (globalState?.users.has(name)) {
        const user = globalState?.users.get(name);
        setUser(user);
        return;
      }
    }
    if (state?.globalState?.fetching.has(userName)) {
      // Wait for fetch
      return;
    }
    // Fetch user from API
    (async () => {
      if (state) {
        state.globalState?.fetching.add(userName);
        state.setGlobalState(prev => {
          if (prev && state.globalState && prev.fetching) return {
            ...prev,
            fetching: state.globalState.fetching.add(userName)
          };
        });
      }
      const user = await FetchUserAxios(userName);
      if (user && state) {
        state.globalState?.users.set(name, user);
        setUser(user);
      }
      if (state) {
        state.globalState?.fetching.delete(userName);
        state.setGlobalState((prev) => {
          if (prev && state.globalState && prev.fetching) return { ...prev, fetching: state.globalState.fetching };
        });
      }
    })();
  }, [state, state?.globalState?.fetching, userName]);

  return user;
};

export { useUser };
