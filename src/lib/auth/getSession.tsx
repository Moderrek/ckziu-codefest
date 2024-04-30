import axios from 'axios';

import { API_V1 } from '@/lib/api/api';

export type AuthSession = {
  isAuthorized: boolean;
  cachedName: boolean;
  name: string | undefined;
  token: string | undefined;
};

export async function getName(): Promise<string | null> {
  const cachedName = localStorage.getItem('cachedName');
  if (cachedName != null) return cachedName;
  try {
    const req = await axios.get(API_V1 + '/auth/info');
    return req.data.name;
  } catch (err) {
    console.error(err);
  }
  return null;
}

export async function getSession(): Promise<AuthSession> {
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
  let name = localStorage.getItem('cachedName');
  try {
    const req = await axios.get(API_V1 + '/auth/info');
    if (req.data.name) {
      name = req.data.name;
    }
  } catch (err) {
    /* ignored */
  }
  if (name === null) {
    return {
      isAuthorized: false,
      cachedName: false,
      name: undefined,
      token: undefined,
    };
  }
  return {
    isAuthorized: true,
    cachedName: false,
    name: name,
    token: localStorage.getItem('token')!,
  };
}

export async function isOwner(otherName: string): Promise<boolean> {
  const name = await getName();
  if (name === null) return false;
  return name.toLowerCase().trim() === otherName.toLowerCase().trim();
}
