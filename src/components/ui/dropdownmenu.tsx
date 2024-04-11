import { CircleUser, LogOut, User } from 'lucide-react';
import Link from 'next/link';

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
  const loggedIn = false;
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
          <Link href='/zaloguj'>
            <DropdownMenuItem>
              <div className='flex flex-row'>
                <User className='mr-2 h-4 w-4' />
                Zaloguj się
              </div>
            </DropdownMenuItem>
          </Link>
        )}
        {loggedIn ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
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
