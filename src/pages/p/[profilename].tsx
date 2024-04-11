import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@material-tailwind/react';
import { useState } from 'react';

import { Projects } from '@/components/fetchable/Projects';
import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { satisfies } from 'semver';

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
  icon: JSX.Element;
}) => {
  return (
    <div>
      <UnstyledLink
        href={props.href}
        target='_blank'
        className='flex flex-row items-center'
      >
        {props.icon}
        <span className=' text-middle pl-1 pt-0.5'>{props.label}</span>
      </UnstyledLink>
    </div>
  );
};

const ProfileSidebar = (props: { profileName: string; isOwner: boolean }) => {
  const [editMode, setEditMode] = useState(false);
  const { profileName, isOwner } = props;
  return (
    <div className='border-gradient-to-r  lg:1/4 left-0 m-0 min-h-full w-full from-indigo-500 backdrop-blur-2xl md:w-1/6 dark:bg-transparent'>
      <div className='container mx-auto pt-4'>
        <div className='flex flex-col items-center justify-center'>
          <Avatar className='h-2/3 w-2/3 select-none'>
            <AvatarImage src='https://avatars.githubusercontent.com/u/66324421?v=4' />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <h1 className='text-bold mt-2 text-center text-xl text-black dark:text-white'>
            {profileName}
          </h1>
        </div>
        <div className='divider divider-neutral dark:divider-default-neutral m-2'></div>
        <div className='flex flex-row items-center justify-center space-x-1'>
          <label htmlFor='my_modal_7'>
            <Tooltip content='Uczestnik konkursu 2024'>
              <img
                src='/images/badges/cc.png'
                className='w-8 rounded-full transition-transform hover:cursor-pointer active:scale-75'
              ></img>
            </Tooltip>
          </label>
          <label htmlFor='my_modal_8'>
            <Tooltip content='Administrator strony'>
              <img
                src='/images/badges/admin_badge.png'
                className='w-8 rounded-full transition-transform hover:cursor-pointer active:scale-75'
              ></img>
            </Tooltip>
          </label>
        </div>
        <div className='divider divider-neutral dark:divider-default m-2 rounded-full'></div>
        <ProfileLink
          href={'https://github.com/' + profileName}
          label='GitHub'
          icon={<FontAwesomeIcon icon={faGithub} className='left-2 h-5 w-5' />}
        />
        <ProfileLink
          href={'https://github.com/' + profileName}
          label='GitHub'
          icon={<FontAwesomeIcon icon={faGithub} className='left-2 h-5 w-5' />}
        />
        <ProfileLink
          href={'https://github.com/' + profileName}
          label='GitHub'
          icon={<FontAwesomeIcon icon={faGithub} className='left-2 h-5 w-5' />}
        />
        <ProfileLink
          href={'https://github.com/' + profileName}
          label='GitHub'
          icon={<FontAwesomeIcon icon={faGithub} className='left-2 h-5 w-5' />}
        />
        <div className='divider divider-neutral dark:divider-default m-2 rounded-full'></div>
        <Textarea
          placeholder='biografia'
          className='mt-3 resize-none overflow-hidden'
          disabled={!editMode}
        />
        {isOwner ? (
          <button
            className='btn btn-ghost btn-sm ml-36 mt-2 p-1'
            onClick={() => setEditMode(!editMode)}
          >
            edit
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='lucide lucide-pencil'
            >
              <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
              <path d='m15 5 4 4' />
            </svg>
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const ProfilePage = (props: { profileName: string }) => {
  const { profileName } = props;
  const [edit, setEdit] = useState(false);
  const isOwner: boolean = profileName === 'drakvlaa';

  if (!profileName) {
    return (
      <>
        <Seo templateTitle='Ładowanie profilu..' />
        <p>Ładowanie...</p>
      </>
    );
  }

  return (
    <DefaultLayout>
      <Seo templateTitle={`Profil ${profileName}`} />
      <div className='flex flex-row'>
        {/* SIDEBAR */}
        <ProfileSidebar isOwner={isOwner} profileName={profileName} />
        {/* MAIN CONTENT */}
        <main className='flex h-full w-full flex-col items-center justify-center p-10'>
          <Tabs defaultValue='projects' className='bg-card w-full'>
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
          <h2 className='text-center text-bold text-black'>Ostatnia aktywność</h2>
        </main>
      </div>
    </DefaultLayout>
  );
};

/*<CalendarPlus size={48} strokeWidth={1} />*/

export async function getServerSideProps({ query } : { query: { profilename: string} }) {
  const { profilename } = query;
  return {
    props: {
      profileName: profilename,
    },
  };
}

export default ProfilePage;
