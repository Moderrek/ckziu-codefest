import { useContext } from 'react';

import { GlobalStateContext } from '@/globalstate/GlobalStateProvider';

const useName = (): string | null => {
  const globalState = useContext(GlobalStateContext);
  if (!globalState) return null;
  const state = globalState.globalState;
  if (state?.authorizedName) return state.authorizedName;
  return null;
};

export { useName };
