'use client';
import useLocalStorage from '@/lib/hooks/useLocalStorage';

export default function useToken() {
  return useLocalStorage('token', null);
}
