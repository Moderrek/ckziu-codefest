import { useContext } from 'react';

import { GatewayContext } from '@/gateway/GatewayProvider';

const useGateway = () => {
  return useContext(GatewayContext);
};

export default useGateway;
