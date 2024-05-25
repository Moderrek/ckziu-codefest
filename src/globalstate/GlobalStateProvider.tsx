import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { API_V1 } from '@/lib/api/api';

import { CodefestProject, User } from '@/utils/FetchProfile';

interface GlobalState {
  projects: Map<string, CodefestProject>;
  users: Map<string, User>;
  profiles: Map<string, User>;
  authorizedName: string | null;
  token: string | null;
}

interface GatewayContextProps {
  globalState: GlobalState | undefined;
  setGlobalState: ((globalState: GlobalState) => void) | undefined;
}

const GlobalStateContext = createContext<GatewayContextProps | undefined>(
  undefined
);

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, setGlobalState] = useState<GlobalState | undefined>(
    undefined
  );

  useEffect(() => {
    window.globalState = globalState;
    if (globalState !== undefined) return;
    setGlobalState({
      projects: new Map<string, CodefestProject>(),
      users: new Map<string, User>(),
      profiles: new Map<string, User>(),
      authorizedName: localStorage.getItem('cachedName'),
      token: localStorage.getItem('token'),
    });
  }, [globalState]);

  useEffect(() => {
    const id = setInterval(async () => {
      if (!localStorage.getItem('token')) {
        if (globalState) {
          setGlobalState((prev) => {
            if (prev) return { ...prev, token: null, authorizedName: null };
          });
        }
        return;
      } else {
        if (globalState) {
          setGlobalState((prev) => {
            if (prev) return { ...prev, token: localStorage.getItem('token') };
          });
        }
      }
      try {
        const req = await axios.get(API_V1 + '/auth/info');
        if (globalState) {
          globalState.authorizedName = req.data.name;
          console.log('Set globalState name', req.data.name);
        }
        localStorage.setItem('cachedName', req.data.name);
        console.log('AUTH', req.data.name);
        return;
      } catch (err) {
        /* ignored */
      }
      if (globalState) {
        globalState.authorizedName = null;
      }
      console.log('UNAUTH');
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        globalState: globalState,
        setGlobalState: setGlobalState,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
export type { GatewayContextProps, GlobalState };
