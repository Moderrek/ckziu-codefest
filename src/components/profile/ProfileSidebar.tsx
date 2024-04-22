import { faDiscord, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@material-tailwind/react';
import { CalendarDays, MailIcon } from 'lucide-react';
import { useContext } from 'react';

import NextImage from '@/components/NextImage';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import ProfileContext from '@/components/profile/ProfileContext';
import { ProfileLink } from '@/components/profile/ProfileLink';

const ProfileSidebar = () => {
  const user = useContext(ProfileContext);

  const badges = [
    {
      image: '/images/badges/cc.png',
      name: 'Uczestnik konkursu CC 2024',
    },
    {
      image: '/images/badges/admin_badge.png',
      name: 'Administrator serwisu',
    },
  ];

  return (
    <div className='border-gradient-to-r  left-0 m-0 min-h-full w-full from-indigo-500 shadow-xl backdrop-blur-2xl md:w-40 lg:w-80 dark:bg-transparent'>
      <div className='container mx-auto mt-10'>
        <div className='flex flex-col items-center justify-center'>
          <ProfileAvatar profileName={user.name} />
          <h1 className='mt-2 text-center font-mono text-2xl text-black dark:text-white'>
            {user.display_name}
          </h1>
          <p className='text-muted-foreground text-sm'>@{user.name}</p>
        </div>
        <div className='mt-2'>
          <p>
            Biografia użytkownika {user.display_name}. Tutaj będzie możliwość
            edytowania biografii
          </p>
        </div>
        <section className='mt-5 flex flex-row flex-wrap items-center justify-center space-x-1'>
          {badges.map((badge) => {
            return (
              <Tooltip content={badge.name} key={badge.name}>
                <NextImage
                  useSkeleton={true}
                  src={badge.image}
                  alt={badge.name}
                  width={32}
                  height={32}
                  className='w-8 hover:cursor-pointer active:scale-75'
                  imgClassName='w-8 rounded-full transition-transform hover:cursor-pointer active:scale-75'
                />
              </Tooltip>
            );
          })}
        </section>
        <section className='mt-5'>
          <div className='flex flex-row'>
            <CalendarDays />
            Dołączył kwiecień 2024
          </div>
          <ProfileLink
            href={'https://github.com/' + user.name}
            label='GitHub'
            icon={
              <FontAwesomeIcon icon={faGithub} className='left-2 h-5 w-5' />
            }
          />
          <ProfileLink
            href={'https://github.com/' + user.name}
            label='Facebook'
            icon={
              <FontAwesomeIcon icon={faFacebook} className='left-2 h-5 w-5' />
            }
          />
          <ProfileLink
            href={'https://github.com/' + user.name}
            label='Discord'
            icon={
              <FontAwesomeIcon icon={faDiscord} className='left-2 h-5 w-5' />
            }
          />
          <ProfileLink
            href={'https://github.com/' + user.name}
            label='Mail'
            icon={<MailIcon className='left-2 h-5 w-5' />}
          />
        </section>
      </div>
    </div>
  );
};

export { ProfileSidebar };
