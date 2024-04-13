import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import { useRequiredLogin } from '@/lib/auth';
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
    <div className='flex min-h-full w-full items-center justify-center'>
      <Parallax pages={4}>
        <ParallaxLayer speed={1}>
          <h2>Paralaxa</h2>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          <h2>Śmierdzi!!!</h2>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
