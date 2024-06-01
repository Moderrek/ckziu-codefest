import { useContext } from "react";

import { GlobalStateContext } from "@/globalstate/GlobalStateProvider";

const useAuthorized = (): boolean => {
  const globalState = useContext(GlobalStateContext);
  if (!globalState) return false;
  const state = globalState.globalState;
  if (!state) return false;
  return !!state.authorizedName && !!state.token;
};

export { useAuthorized };
