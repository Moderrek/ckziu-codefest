import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';

import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip } from '@material-tailwind/react';
import { Textarea } from '@/components/ui/textarea';

export default function Page() {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const profileName: string = router.query.profilename as string;
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
      <input type='checkbox' id='my_modal_7' className='modal-toggle' />
      <div className='modal' role='dialog'>
        <div className='modal-box p-0'>
          <div className='align-items-center flex h-1/3 w-full justify-center'>
            <img
              src='/images/badges/cc.png'
              className='mt-5 h-[100px] w-[100px] rounded-full'
            ></img>
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
      <input type='checkbox' id='my_modal_8' className='modal-toggle' />
      <div className='modal' role='dialog'>
        <div className='modal-box p-0'>
          <div className='align-items-center flex h-1/3 w-full justify-center'>
            <img
              src='/images/badges/admin_badge.png'
              className='mt-5 h-[100px] w-[100px] rounded-full'
            ></img>
          </div>
          <div className='divider divider-neutral dark:divider-default-neutral m-2'></div>
          <div className='align-items-center flex h-1/3 w-full justify-center'>
            <p className='py-4'>Administrator Strony CKZiUCodeFest.pl</p>
          </div>
        </div>
        <label className='modal-backdrop' htmlFor='my_modal_8'>
          Close
        </label>
      </div>
      <div className='lg:1/4 absolute h-1/3 w-full bg-red-400 md:w-1/6 dark:bg-red-900'></div>
      <div className='border-gradient-to-r  lg:1/4 left-0 m-0 min-h-full w-full bg-white/30 from-indigo-500 backdrop-blur-2xl md:w-1/6 dark:bg-transparent'>
        <div className='container mx-auto pt-4'>
          <div className='flex flex-col items-center justify-center'>
            <Avatar className='h-2/3 w-2/3 select-none'>
              <AvatarImage src='https://avatars.githubusercontent.com/u/66324421?v=4' />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <h1 className='text-bold mt-2 select-none text-center text-xl text-black dark:text-white'>
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
          <div>
            <UnstyledLink
              href={'https://github.com/' + profileName}
              target='_blank'
              className='flex flex-row items-center'
            >
              <FontAwesomeIcon icon={faGithub} className='left-2 h-5 w-5' />
              <span className=' text-middle pl-1 pt-0.5'>Profil Github</span>
            </UnstyledLink>
          </div>
          <div className='divider divider-neutral dark:divider-default m-2 rounded-full'></div>
          <Textarea
            placeholder='biografia'
            className='mt-3 resize-none overflow-hidden'
            disabled={!edit}
          />
          {isOwner ? (
            <button
              className='btn btn-ghost btn-sm ml-36 mt-2 p-1'
              onClick={() => setEdit(!edit)}
            >
              edit
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
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
    </DefaultLayout>
  );
}
