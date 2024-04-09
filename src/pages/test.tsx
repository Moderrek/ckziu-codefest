import { Button } from '@material-tailwind/react';

import { useRequiredLogin } from '@/lib/auth';

import DefaultLayout from '@/components/layout/DefaultLayout';
import useToken from '@/lib/auth/useToken';

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
    <DefaultLayout>
      <Button
        variant='filled'
        color='red'
        onClick={() => {
          console.log(token);
        }}
      >
        Get Token
      </Button>
      <Button
        variant='gradient'
        color='indigo'
        onClick={() => {
          setToken('token ' + Math.random());
        }}
      >
        Set Token
      </Button>
      {/*<p>The token is = {token ? token : ''} CAUSES HYDRATION ERROR</p>*/}
      {/*  Causes hydration error because server pre-renders page when server doesnt have WINDOW.LOCALSTORAGE*/}
      {/*  TODO next day 10.04.2024 */}
    </DefaultLayout>
  );
}
