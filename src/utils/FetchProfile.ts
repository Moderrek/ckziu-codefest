import { API_V1 } from '@/lib/api/api';

const API_URL_GET_USER = (name: string) => `${API_V1}/profile/${name}`;

export interface Badge {
  name: string;
  image: string;
  description: string;
  id: string;
}

export interface CodefestProject {
  id: string;
  name: string;
  display_name: string;

  owner_id: string;

  private: boolean;
  description: string | null;

  likes: number;
  created_at: number;
  updated_at: number;
}

interface User {
  name: string;
  display_name: string;
  id: string;

  bio: string | null;

  created_at: number;
  updated_at: number;

  projects: CodefestProject[];
  badges: Badge[];

  flags: number;
}

const FetchUser = async (name: string) => {
  try {
    const res = await fetch(API_URL_GET_USER(name));
    const user: User = await res.json();
    if (!user.created_at) {
      return null;
    }
    user.badges = [
      {
        image: '/images/badges/cc.png',
        name: 'Uczestnik konkursu CC 2024',
        description: 'tsfdsfsf',
        id: '1',
      },
      {
        image: '/images/badges/admin_badge.png',
        name: 'Administrator serwisu',
        description: 'dsfsdfsdf',
        id: '2',
      },
    ];
    return user;
  } catch (_) {
    /* ignored */
  }
  // The default response
  return null;
};

export type { User };
export { API_URL_GET_USER, FetchUser };
