import { isDev } from '@/lib/utils';

export const API_URL = isDev
  ? 'http://127.0.0.1:8080'
  : 'https://api.ckziucodefest.pl';
