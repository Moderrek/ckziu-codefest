import axios from 'axios';

import { API_V1 } from '@/lib/api/api';

export type Authorization = {
  isAuthorized: boolean;
  cachedName: boolean;
  name: string | undefined;
  token: string | undefined;
};

export function isAuthorized(): Authorization {
  'use client';
  const token = localStorage.getItem('token');
  if (token === null)
    return {
      isAuthorized: false,
      cachedName: false,
      name: undefined,
      token: undefined,
    };
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  if (localStorage.getItem('cachedName') !== null) {
    return {
      isAuthorized: true,
      cachedName: true,
      name: localStorage.getItem('cachedName')!,
      token: localStorage.getItem('token')!,
    };
  }
  try {
    axios.get(API_V1 + '/auth/info').then((response) => {
      localStorage.setItem('cachedName', response.data.name);
    });
  } catch (err) {
    /* ignored */
  }
  return {
    isAuthorized: true,
    cachedName: false,
    name: localStorage.getItem('cachedName')!,
    token: localStorage.getItem('token')!,
  };
}
