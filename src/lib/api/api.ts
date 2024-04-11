import axios from 'axios';

import { isDev } from '@/lib/utils';

export const API_URL = isDev
  ? 'http://127.0.0.1:8080'
  : 'https://ckziucodefest.pl:8080';

export async function authentication(email: string) {
  try {
    const res = await axios.post(API_URL + '/auth/otp', { email: email });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
