import { API_V1 } from '@/lib/api/api';
import { ApiStatus } from '@/lib/api/api_responses';

const API_URL_STATUS = API_V1 + '/status';

/**
 * Fetches {@link ApiStatus} from API.
 */
const GetAPIStatus = async () => {
  try {
    const res = await fetch(API_V1 + '/status');
    const status: ApiStatus = await res.json();
    return status;
  } catch (_) {
    /* ignored */
  }
  // The default response
  const unavailable: ApiStatus = {
    name: 'Unknown',
    author: 'Unknown',
    version: 'Unknown',
    services: {
      login_service: false,
      cez_website: false,
    },
  };
  return unavailable;
};

export { API_URL_STATUS, GetAPIStatus };
