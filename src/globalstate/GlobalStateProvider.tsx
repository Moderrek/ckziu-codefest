import axios from 'axios';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { API_V1 } from '@/lib/api/api';
import { minutes } from '@/lib/time';

import { CodefestProject, User } from '@/utils/FetchProfile';

interface GlobalState {
  projects: Map<string, CodefestProject>;
  users: Map<string, User>;
  profiles: Map<string, User>;
  authorizedName: string | null;
  token: string | null;
  fetching: Set<string>;
}

interface GatewayContextProps {
  globalState: GlobalState | undefined;
  setGlobalState: Dispatch<SetStateAction<GlobalState | undefined>>;
}

const GlobalStateContext = createContext<GatewayContextProps | undefined>(
  undefined
);

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, setGlobalState] = useState<GlobalState | undefined>(
    undefined
  );
  const [fetching, setFetching] = useState<Set<string>>(new Set());

  useEffect(() => {
    window.globalState = globalState;
    if (globalState !== undefined) return;
    setGlobalState({
      projects: new Map<string, CodefestProject>(),
      users: new Map<string, User>(),
      profiles: new Map<string, User>(),
      authorizedName: localStorage.getItem('cachedName'),
      token: localStorage.getItem('token'),
      fetching: fetching
    });
  }, [globalState]);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
  }, []);

  // External effect
  useEffect(() => {
    const id = setInterval(() => {
      if (!localStorage.getItem('token')) {
        // No token in localstorage
        axios.defaults.headers.common['Authorization'] = null;
        if (globalState && globalState.token) {
          // Token exists in global state but not in local storage. Which means another tab had logout
          setGlobalState((prev) => {
            if (prev) return { ...prev, token: null, authorizedName: null };
          });
          console.log('Logout. Token removed externally');
        }
        return;
      }
      // Token in local storage
      if (globalState) {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if (globalState.token !== token) {
          setGlobalState((prev) => {
            if (prev) return { ...prev, token: token };
          });
          console.log('Loaded token externally');
        }
      }
    }, 1000);
    return () => clearInterval(id);
  });

  // Validate token effect
  useEffect(() => {
    const id = setInterval(async () => {
      try {
        // Update request credentials
        const token = globalState
          ? globalState.token ?? localStorage.getItem('token')
          : localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        // Cancel request. No authorized
        if (!token) return;

        // Perform request to check is token authorized
        const req = await axios.get(API_V1 + '/auth/info');
        const {
          authorized,
          name
        }: { authorized: boolean; name: string | null } = req.data;

        if (globalState) {
          if (!authorized) {
            // LogOut
            localStorage.removeItem('token');
            localStorage.removeItem('cachedName');
            axios.defaults.headers.common['Authorization'] = null;
            setGlobalState((prev) => {
              if (prev) return { ...prev, token: null, authorizedName: null };
            });
            console.log('Session expired');
            return;
          }
          // Update info
          let updated = false;
          if (name && localStorage.getItem('cachedName') !== name) {
            localStorage.setItem('cachedName', name);
            updated = true;
          }
          if (globalState.authorizedName !== name) {
            setGlobalState((prev) => {
              if (prev) return { ...prev, authorizedName: name };
            });
            updated = true;
          }
          if (updated) console.log('Updated session');
        }
        console.log('Authorized');
        return;
      } catch (err) {
        console.error('Failed to check session');
        /* ignored */
      }

      // Logout
      axios.defaults.headers.common['Authorization'] = null;
      localStorage.removeItem('token');
      localStorage.removeItem('cachedName');
      if (globalState) {
        setGlobalState((prev) => {
          if (prev) return { ...prev, token: null, authorizedName: null };
        });
      }
      console.log('Logout');
    }, minutes(5));
    return () => clearInterval(id);
  });

  return (
    <GlobalStateContext.Provider
      value={{
        globalState: globalState,
        setGlobalState: setGlobalState
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
export type { GatewayContextProps, GlobalState };
