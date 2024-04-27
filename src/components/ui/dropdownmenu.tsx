import { CircleUser, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Authorization, isAuthorized } from '@/lib/auth/isAuthorized';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DropdownMenuDemo() {
  const router = useRouter();
  const [auth, setAuth] = useState<Authorization>({
    isAuthorized: false,
    cachedName: false,
    name: undefined,
    token: undefined,
  });

  useEffect(() => {
    const auth = isAuthorized();
    setAuth(auth);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <CircleUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-45'>
        <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {auth.isAuthorized ? (
          <DropdownMenuItem>
            <Link href={`/p/${auth.name}`}>
              <div className='flex flex-row'>
                <User className='mr-2 h-4 w-4' />
                Profil
              </div>
            </Link>
          </DropdownMenuItem>
        ) : (
          <Link href='/zaloguj'>
            <DropdownMenuItem>
              <div className='flex flex-row'>
                <User className='mr-2 h-4 w-4' />
                Zaloguj się
              </div>
            </DropdownMenuItem>
          </Link>
        )}
        {auth.isAuthorized ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                {
                  setAuth((state) => {
                    state.isAuthorized = false;
                    return state;
                  });
                }
                localStorage.removeItem('token');
                localStorage.removeItem('cachedName');
                router.push('/zaloguj');
              }}
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Wyloguj się</span>
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
