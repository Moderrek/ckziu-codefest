import { CircleUser, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSession } from '@/lib/auth/useSession';

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
  const session = useSession();

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
        {session?.isAuthorized ? (
          <DropdownMenuItem>
            <Link href={`/p/${session?.name}`}>
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
        {session?.isAuthorized ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
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
