import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip } from '@material-tailwind/react';

export default function Page() {
  const router = useRouter();

  const profileName: string = router.query.profilename as string;

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
                src='/images/badges/cc.png'
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
      <div className='absolute h-1/3 w-1/6 bg-red-400 dark:bg-red-900'></div>
      <div className='border-gradient-to-r  left-0 m-0 min-h-full w-1/6 bg-white/30 from-indigo-500 backdrop-blur-2xl dark:bg-transparent'>
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
          <div className="flex flex-row items-center justify-center space-x-1">
            <label htmlFor="my_modal_7">
              <Tooltip content="Uczestnik konkursu 2024">
              <img
                src="/images/badges/cc.png"
                className="w-8 rounded-full transition-transform hover:cursor-pointer active:scale-75"
              ></img>
              </Tooltip>
            </label>
            <label htmlFor="my_modal_8">
              <Tooltip content="Administrator strony">
              <img
                src="/images/badges/admin_badge.png"
                className="w-8 rounded-full transition-transform hover:cursor-pointer active:scale-75"
              ></img>
              </Tooltip>
            </label>
          </div>
          <div className="divider divider-neutral dark:divider-default m-2 rounded-full"></div>
          <div>
            <UnstyledLink
              href={'https://github.com/' + profileName}
              target="_blank"
              className="flex flex-row items-center"
            >
              <FontAwesomeIcon icon={faGithub} className='left-2 h-5 w-5' />
              <span className=' text-middle pl-1 pt-0.5'>Profil Github</span>
            </UnstyledLink>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
