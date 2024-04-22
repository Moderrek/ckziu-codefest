import { API_V1 } from '@/lib/api/api';

const API_URL_GET_USER = (name: string) => `${API_V1}/users/${name}`;

interface User {
  name: string;
  display_name: string;
  id: string;

  bio: string | null;

  created_at: number;
  updated_at: number;

  flags: number;
}

const FetchUser = async (name: string) => {
  try {
    const res = await fetch(API_URL_GET_USER(name));
    const user: User = await res.json();
    if (!user.created_at) {
      return null;
    }
    return user;
  } catch (_) {
    /* ignored */
  }
  // The default response
  return null;
};

export type { User };
export { API_URL_GET_USER, FetchUser };
