import { CalendarDays, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { FetchUser, User } from '@/utils/FetchProfile';

interface ProfileHoverCardProps {
  userName: string;
  showAvatar: boolean | undefined;
}

const ProfileHoverCard = ({ userName, showAvatar }: ProfileHoverCardProps) => {
  // Tri-state => { fetched => User | null, fetching.. => undefined }
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    FetchUser(userName.toLowerCase()).then((user) => {
      setUser(user);
    });
  }, [userName]);

  if (user === null) {
    // Error
    return (
      <span className='inline-flex flex-row items-center'>
        {showAvatar ? <UserCircle className='h-8 w-8' /> : <></>}
        <span className='ml-1 text-red-400'>@Nieznany</span>
      </span>
    );
  }

  if (!user) {
    // Loading

    if (showAvatar) {
      return (
        <Link
          href={`/p/${userName}`}
          className='inline-flex flex-row items-center'
        >
          <UserCircle className='h-8 w-8' />
          <span className='ml-1'>@{userName}</span>
        </Link>
      );
    }

    return (
      <Link
        href={`/p/${userName}`}
        className='ml-1 inline-flex flex-row items-center'
      >
        @{userName}
      </Link>
    );
  }

  const profileUrl = `/p/${user.name}`;

  return (
    <HoverCard openDelay={1}>
      <HoverCardTrigger asChild>
        {showAvatar ? (
          <Link
            href={profileUrl}
            className='inline-flex flex-row items-center hover:underline'
          >
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/images/ckziu_thumbnail.png' />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <span className='ml-1'>@{user.name}</span>
          </Link>
        ) : (
          <Link
            href={profileUrl}
            className='ml-1 inline-flex flex-row items-center hover:underline'
          >
            @{user.name}
          </Link>
        )}
      </HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex justify-between space-x-4'>
          <Avatar>
            <AvatarImage src='/images/ckziu_thumbnail.png' />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <Link href={profileUrl} className='hover:underline'>
              <h4 className='text-sm font-semibold'>@{user.name}</h4>
            </Link>
            <p className='text-sm'>{user.bio}</p>
            <div className='flex items-center pt-2'>
              <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
              <span className='text-muted-foreground text-xs'>
                Dołączył kwiecień 2024
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export { ProfileHoverCard };
export type { ProfileHoverCardProps };
