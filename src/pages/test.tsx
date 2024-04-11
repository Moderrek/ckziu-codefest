import { Button } from '@material-tailwind/react';

import { useRequiredLogin } from '@/lib/auth';

import DefaultLayout from '@/components/layout/DefaultLayout';
import useToken from '@/lib/auth/useToken';
import MyComponent from '@/components/test';

export default function TestPage() {
  const [token, setToken] = useToken();
  const isLoggedIn = true; // enjoy

  // Automatically redirects user to login page if not logged.
  useRequiredLogin(isLoggedIn);
  if (!isLoggedIn) {
    // Shows redirecting page
    return <>Przekierowywanie...</>;
  }

  // Authorized user page
  return (
  <MyComponent></MyComponent>
  );
}
