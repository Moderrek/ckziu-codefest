import axios from 'axios';

import { API_V1 } from '@/lib/api/api';

export interface Post {
  id: string,
  owner: {
    id: string
    name: string
    displayName: string
    flags: number
  }
  content: string,
  created_at: number
}

export const fetchPosts = async (): Promise<Post[] | null> => {
  try {
    const res = await axios.get(`${API_V1}/posts`);
    return res.data;
  } catch (_) {
    //   ignored
  }
  return null;
};
