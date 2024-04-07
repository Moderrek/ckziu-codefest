import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import DefaultLayout from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box p-0">
          <div className="w-full h-1/3">
          <img src="/images/badges/cc.png" className="w-1/3"></img>
          </div>
          <p className="py-4">This modal works with a hidden checkboxaaa!</p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </div>
      <div className='absolute h-1/3 w-1/6 bg-red-400 dark:bg-red-900'></div>
      <div
        className='border-gradient-to-r  left-0 m-0 min-h-full w-1/6 bg-white/30 from-indigo-500 backdrop-blur-2xl dark:bg-transparent'>
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
          <div className='divider m-2 divider-neutral dark:divider-default-neutral'></div>
          <label htmlFor="my_modal_7"><img src="/images/badges/cc.png" className="w-8 rounded-full active:scale-75 transition-transform hover:cursor-pointer"></img></label>
          <div className='divider m-2 rounded-full divider-neutral dark:divider-default'></div>
          <div>
            <UnstyledLink
              href={'https://github.com/' + profileName}
              className='flex flex-row items-center'
            >
              <FontAwesomeIcon icon={faGithub} className='left-2 h-7 w-7' />
              <span className=' text-middle'>Profil Github</span>
            </UnstyledLink>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
