import { CircleUser, LogOut, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DropdownMenuDemo() {
  const session = useSession();
  const loggedIn = session.status == "authenticated";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <CircleUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-45'>
        <DropdownMenuLabel>Moje konto {session.data?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loggedIn ? (
          <DropdownMenuItem>
            <Link href='/p/moderr'>
              <div className='flex flex-row'>
                <User className='mr-2 h-4 w-4' />
                Profil
              </div>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn()}>
            <div className='flex flex-row'>
              <User className='mr-2 h-4 w-4' />
              Zaloguj się
            </div>
          </DropdownMenuItem>
        )}
        {loggedIn ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className='mr-2 h-4 w-4' />
              <span onClick={() => signOut()}>Wyloguj się</span>
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
