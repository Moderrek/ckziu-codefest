import { faDiscord, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@material-tailwind/react';
import { CalendarDays, MailIcon } from 'lucide-react';
import { ReactElement, useState } from 'react';

import { Projects } from '@/components/fetchable/Projects';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Modal = () => {
  return (
    <div className='modal' role='dialog'>
      <div className='modal-box p-0'>
        <div className='align-items-center flex h-1/3 w-full justify-center'>
          <NextImage
            src='/images/badges/cc.png'
            className='mt-5 h-[100px] w-[100px] rounded-full'
            alt='cc_badge'
            width={100}
            height={100}
          />
        </div>
        <div className='divider divider-neutral dark:divider-default-neutral m-2'></div>
        <div className='align-items-center flex h-1/3 w-full justify-center'>
          <p className='py-4'>Uczestnik konkursu CKZiUCodeFest 2024</p>
        </div>
      </div>
      <label className='modal-backdrop' htmlFor='my_modal_7'>
        Close
      </label>
    </div>
  );
};

const ProfileLink = (props: {
  href: string;
  label: string;
  icon: ReactElement;
}) => {
  return (
    <UnstyledLink href={props.href} className='flex flex-row items-center'>
      {props.icon}
      <span className='text-middle pl-1 pt-0.5'>{props.label}</span>
    </UnstyledLink>
  );
};

const ProfileAvatar = (props: { profileName: string }) => {
  const { profileName } = props;
  return (
    <Avatar className='h-28 w-28 select-none lg:h-40 lg:w-40'>
      <AvatarImage src='https://avatars.githubusercontent.com/u/66324421?v=4' />
      <AvatarFallback>{profileName}</AvatarFallback>
    </Avatar>
  );
};

const ProfileSidebar = (props: { profileName: string; isOwner: boolean }) => {
  const [editMode, setEditMode] = useState(false);
  const { profileName, isOwner } = props;
  const profileDisplayName = 'Tymon Woźniak';

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
          <ProfileAvatar profileName={profileName} />
          <h1 className='mt-2 text-center font-mono text-2xl text-black dark:text-white'>
            {profileDisplayName}
          </h1>
          <p className='text-muted-foreground text-sm'>@{profileName}</p>
        </div>
        <div className='mt-2'>
          <p>
            Biografia użytkownika {profileName}. Tutaj będzie możliwość
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
                  className='w-8 rounded-full transition-transform hover:cursor-pointer active:scale-75'
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
            href={'https://github.com/' + profileName}
            label='GitHub'
            icon={
              <FontAwesomeIcon icon={faGithub} className='left-2 h-5 w-5' />
            }
          />
          <ProfileLink
            href={'https://github.com/' + profileName}
            label='Facebook'
            icon={
              <FontAwesomeIcon icon={faFacebook} className='left-2 h-5 w-5' />
            }
          />
          <ProfileLink
            href={'https://github.com/' + profileName}
            label='Discord'
            icon={
              <FontAwesomeIcon icon={faDiscord} className='left-2 h-5 w-5' />
            }
          />
          <ProfileLink
            href={'https://github.com/' + profileName}
            label='Mail'
            icon={<MailIcon className='left-2 h-5 w-5' />}
          />
        </section>
      </div>
    </div>
  );
};

const ProfilePage = (props: { profileName: string }) => {
  const { profileName } = props;
  const isOwner: boolean = profileName === 'drakvlaa';

  return (
    <DefaultLayout>
      <Seo templateTitle={`Profil ${profileName}`} />
      <div className='flex min-h-full flex-col md:flex-row lg:flex-row'>
        {/* SIDEBAR */}
        <ProfileSidebar isOwner={isOwner} profileName={profileName} />
        {/* MAIN CONTENT */}
        <main className='flex h-full w-full flex-col items-center justify-center p-10'>
          <Tabs defaultValue='projects' className='w-full'>
            <TabsList>
              <TabsTrigger value='posts'>Posty</TabsTrigger>
              <TabsTrigger value='projects'>Projekty</TabsTrigger>
              <TabsTrigger value='liked_projects'>
                Polubione projekty
              </TabsTrigger>
            </TabsList>
            <TabsContent value='posts'>
              <h2>Profile Posts</h2>
            </TabsContent>
            <TabsContent value='projects'>
              <div className='flex flex-row flex-wrap justify-center gap-4'>
                <Projects />
              </div>
            </TabsContent>
            <TabsContent value='liked_projects'></TabsContent>
          </Tabs>
          <h2 className='text-bold text-center text-black'>
            Ostatnia aktywność
          </h2>
        </main>
      </div>
    </DefaultLayout>
  );
};

export async function getServerSideProps({
  query,
}: {
  query: { profilename: string };
}) {
  const { profilename } = query;
  return {
    props: {
      profileName: profilename,
    },
  };
}

export default ProfilePage;
