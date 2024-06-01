import { useContext } from "react";

import { GlobalStateContext } from "@/globalstate/GlobalStateProvider";

const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

export default useGlobalState;
