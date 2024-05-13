import { Button, Tooltip } from '@material-tailwind/react';
import axios from 'axios';
import { CalendarDays, Edit } from 'lucide-react';
import { useContext, useState } from 'react';

import { API_V1 } from '@/lib/api/api';
import { useOwner, useSession } from '@/lib/auth/useSession';

import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import ProfileContext from '@/components/profile/ProfileContext';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { UserCreatedDate } from '@/utils/UserCreatedDate';

const ProfileSidebar = ({ setCurrentBadge }: any) => {
  const { toast } = useToast();

  const user = useContext(ProfileContext);
  const session = useSession();
  const owner = useOwner(session, user.name);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editBio, setEditBio] = useState<string>(user.bio ?? '');
  const [editDisplayName, setEditDisplayName] = useState<string>(
    user.display_name
  );
  const [editQueue, setEditQueue] = useState<number>(0);

  const submitEdit = async () => {
    const oldBio = user.bio?.trimEnd().trimStart() ?? '';
    const newBio = editBio.trimEnd().trimStart();
    setEditBio(newBio);
    if (oldBio !== newBio) {
      setEditQueue((prev) => prev + 1);
      user.bio = newBio;
      // bio changes
      try {
        const req = await axios.post(API_V1 + '/update/user/bio', {
          bio: newBio,
        });
        setEditQueue((prev) => prev - 1);
        if (!req.data.success) {
          toast({
            variant: 'destructive',
            title: 'Wystąpił problem.',
            description: req.data.message,
          });
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Błąd po stronie serwera',
          description:
            'Przepraszamy! Wystąpił błąd po stronie serwera. Nie udało się zaktualizować biografii. Spróbuj ponownie później.',
        });
        setEditQueue((prev) => prev - 1);
      }
    }
    const oldDisplayName = user.display_name.trimEnd().trimStart();
    let newDisplayName = editDisplayName.trimEnd().trimStart();
    if (newDisplayName.length < 3) newDisplayName = oldDisplayName;
    if (newDisplayName.length > 30) newDisplayName = oldDisplayName;
    setEditDisplayName(newDisplayName);
    if (
      oldDisplayName !== newDisplayName &&
      newDisplayName.length >= 3 &&
      newDisplayName.length <= 30
    ) {
      setEditQueue((prev) => prev + 1);
      user.display_name = newDisplayName;
      // displayname changes
      try {
        const req = await axios.post(API_V1 + '/update/user/displayname', {
          displayname: newDisplayName,
        });
        setEditQueue((prev) => prev - 1);
        if (!req.data.success) {
          toast({
            variant: 'destructive',
            title: 'Wystąpił problem.',
            description: req.data.message,
          });
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Błąd po stronie serwera',
          description:
            'Przepraszamy! Wystąpił błąd po stronie serwera. Nie udało się zaktualizować wyświetlanej nazwy. Spróbuj ponownie później.',
        });
        setEditQueue((prev) => prev - 1);
      }
    }
  };

  return (
    <div className='border-gradient-to-r left-0 m-0 min-h-full w-full from-indigo-500 shadow-xl backdrop-blur-2xl pb-5 md:pb-0 md:w-60 lg:w-80 dark:bg-transparent'>
      <div className='container mx-auto pt-10 min-h-full w-full flex flex-col'>
        <div className='flex flex-col items-center justify-center'>
          <ProfileAvatar profileName={user.name} />
          {editMode ? (
            <Input
              type='text'
              value={editDisplayName}
              onChange={(e) => setEditDisplayName(e.target.value)}
              placeholder='Wyświetlana nazwa'
              disabled={editQueue != 0}
              maxLength={30}
              className='mt-2 text-center font-mono text-2xl text-black dark:text-white'
            />
          ) : (
            <h1 className='mt-2 text-center font-mono text-2xl text-black dark:text-white'>
              {(user.flags & (1 << 0)) != 0 ? (
                <span className='font-title text-red-400 mr-1 drop-shadow'>
                  <Tooltip content={<b>Personel</b>}>S</Tooltip>
                </span>
              ) : (
                <></>
              )}
              {(user.flags & (1 << 1)) != 0 ? (
                <span className='font-title text-amber-400 mr-1 drop-shadow'>
                  <Tooltip content={<b>Programista</b>}>D</Tooltip>
                </span>
              ) : (
                <></>
              )}
              {(user.flags & (1 << 2)) != 0 ? (
                <span className='font-title text-indigo-400 mr-1 drop-shadow'>
                  <Tooltip content='Nauczyciel'>N</Tooltip>
                </span>
              ) : (
                <></>
              )}
              {(user.flags & (1 << 3)) != 0 ? (
                <span className='font-title text-indigo-400 mr-1 drop-shadow'>
                  <Tooltip content='Moderator'>M</Tooltip>
                </span>
              ) : (
                <></>
              )}
              {user.display_name}
            </h1>
          )}
          <p className='text-muted-foreground text-sm'>@{user.name}</p>
        </div>
        {editMode ? (
          <div className='mt-2'>
            <Input
              type='text'
              value={editBio}
              maxLength={99}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder={`Biografia użytkownika @${user.name}`}
              disabled={editQueue != 0}
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
              loading={editQueue != 0}
              onClick={async () => {
                if (editMode) {
                  await submitEdit();
                }
                setEditMode(!editMode);
              }}
            >
              <Edit width={16} height={16} />{' '}
              {editMode ? 'Zapisz zmiany' : 'Edytuj profil'}
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
