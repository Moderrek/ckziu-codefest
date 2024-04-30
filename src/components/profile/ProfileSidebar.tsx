import { Button } from '@material-tailwind/react';
import { CalendarDays, Edit } from 'lucide-react';
import { useContext, useState } from 'react';

import { useOwner, useSession } from '@/lib/auth/useSession';

import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import ProfileContext from '@/components/profile/ProfileContext';
import { Input } from '@/components/ui/input';

import { UserCreatedDate } from '@/utils/UserCreatedDate';

const ProfileSidebar = ({ setCurrentBadge }: any) => {
  const user = useContext(ProfileContext);
  const session = useSession();
  const owner = useOwner(session, user.name);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editBio, setEditBio] = useState<string>(user.bio ?? '');

  return (
    <div className='border-gradient-to-r left-0 m-0 min-h-full w-full from-indigo-500 shadow-xl backdrop-blur-2xl pb-5 md:pb-0 md:w-60 lg:w-80 dark:bg-transparent'>
      <div className='container mx-auto pt-10 min-h-full w-full flex flex-col'>
        <div className='flex flex-col items-center justify-center'>
          <ProfileAvatar profileName={user.name} />
          <h1 className='mt-2 text-center font-mono text-2xl text-black dark:text-white'>
            {user.display_name}
          </h1>
          <p className='text-muted-foreground text-sm'>@{user.name}</p>
        </div>
        {editMode ? (
          <div className='mt-2'>
            <Input
              type='text'
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder={`Biografia uzytkownika @${user.name}`}
            />
          </div>
        ) : (
          <></>
        )}
        {user.bio && !editMode ? (
          <div className='mt-2'>
            <p>{user.bio}</p>
          </div>
        ) : (
          <></>
        )}
        {/*<section className='mt-5 flex flex-row flex-wrap items-center justify-center space-x-1'>*/}
        {/*  {user.badges.map((badge) => {*/}
        {/*    return (*/}
        {/*      <button*/}
        {/*        className='btn'*/}
        {/*        onClick={() => {*/}
        {/*          setCurrentBadge(badge);*/}
        {/*        }}*/}
        {/*        key={badge.name}*/}
        {/*      >*/}
        {/*        <Tooltip content={badge.name}>*/}
        {/*          <NextImage*/}
        {/*            useSkeleton={true}*/}
        {/*            src={badge.image}*/}
        {/*            alt={badge.name}*/}
        {/*            width={32}*/}
        {/*            height={32}*/}
        {/*            className='w-8 hover:cursor-pointer active:scale-75'*/}
        {/*            imgClassName='w-8 rounded-full transition-transform hover:cursor-pointer active:scale-75'*/}
        {/*          />*/}
        {/*        </Tooltip>*/}
        {/*      </button>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</section>*/}
        <section className='mt-5'>
          <div className='center gap-1'>
            <CalendarDays />
            Dołączył {UserCreatedDate(user)}
          </div>
          {/*<ProfileLink*/}
          {/*  href={'https://github.com/' + user.name}*/}
          {/*  label='GitHub'*/}
          {/*  icon={*/}
          {/*    <FontAwesomeIcon icon={faGithub} className='left-2 h-5 w-5' />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<ProfileLink*/}
          {/*  href={'https://github.com/' + user.name}*/}
          {/*  label='Facebook'*/}
          {/*  icon={*/}
          {/*    <FontAwesomeIcon icon={faFacebook} className='left-2 h-5 w-5' />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<ProfileLink*/}
          {/*  href={'https://github.com/' + user.name}*/}
          {/*  label='Discord'*/}
          {/*  icon={*/}
          {/*    <FontAwesomeIcon icon={faDiscord} className='left-2 h-5 w-5' />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<ProfileLink*/}
          {/*  href={'https://github.com/' + user.name}*/}
          {/*  label='Mail'*/}
          {/*  icon={<MailIcon className='left-2 h-5 w-5' />}*/}
          {/*/>*/}
        </section>
        <div className='flex flex-grow md:items-end w-full md:justify-end'>
          {' '}
          {owner ? (
            <Button
              variant='gradient'
              className='p-2 m-1 center gap-1 w-full'
              placeholder={undefined}
              onPointerEnterCapture={() => {
                /**/
              }}
              onPointerLeaveCapture={() => {
                /**/
              }}
              onClick={() => setEditMode(!editMode)}
            >
              <Edit width={16} height={16} /> Edytuj profil
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProfileSidebar };
