import { CalendarDays, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import NextImage from '@/components/NextImage';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import useGlobalState from '@/globalstate/useGlobalState';
import { FetchUserAxios, User } from '@/utils/FetchProfile';
import { UserCreatedDate } from '@/utils/UserCreatedDate';

interface ProfileHoverCardProps {
  userName: string;
  showAvatar: boolean | undefined;
}

const UserMention = ({ userName, showAvatar }: ProfileHoverCardProps) => {
  // Tri-state => { fetched => User | null, fetching.. => undefined }
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const state = useGlobalState();

  useEffect(() => {
    const name = userName.toLowerCase();
    if (state) {
      const { globalState } = state;
      if (globalState?.users.has(name)) {
        const user = globalState?.users.get(name);
        setUser(user);
        return;
      }
    }
    FetchUserAxios(userName.toLowerCase()).then((user) => {
      if (user && state) {
        state.globalState?.users.set(name, user);
      }
      setUser(user);
    });
  }, [state, userName]);

  if (user === null) {
    // Error
    return (
      <span className="inline-flex flex-row items-center">
        {showAvatar ? <UserCircle className="size-8" /> : <></>}
        <span className="ml-1 text-red-400">@Nieznany</span>
      </span>
    );
  }

  if (!user) {
    // Loading

    if (showAvatar) {
      return (
        <Link
          href={`/p/${userName}`}
          className="inline-flex flex-row items-center"
        >
          <UserCircle className="size-8" />
          <span className="ml-1">@{userName}</span>
        </Link>
      );
    }

    return (
      <Link
        href={`/p/${userName}`}
        className="ml-1 inline-flex flex-row items-center"
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
            className="inline-flex flex-row items-center hover:underline"
          >
            <NextImage
              alt={`Profilowe ${user.name}`}
              src="/images/ckziu_thumbnail.png"
              width={32}
              height={32}
              className="size-8"
              imgClassName="aspect-square h-full w-full rounded-full"
            />
            <span className="ml-1">@{user.name}</span>
          </Link>
        ) : (
          <Link
            href={profileUrl}
            className="ml-1 inline-flex flex-row items-center hover:underline"
          >
            @{user.name}
          </Link>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex justify-between">
          <NextImage
            alt={`Profilowe @${user.name}`}
            src="/images/ckziu-cropped.svg"
            width={64}
            height={64}
            className="mr-2"
          />
          <div className="-space-y-1">
            <Link href={profileUrl} className="hover:underline">
              <h4 className="text-sm font-semibold">@{user.name}</h4>
            </Link>
            <p className="text-sm">{user.bio}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 size-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                Dołączył {UserCreatedDate(user)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export { UserMention };
export type { ProfileHoverCardProps };
