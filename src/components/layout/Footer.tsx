import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@material-tailwind/react';

import CkziuLogo from '@/components/images/CkziuLogo';
import UnstyledLink from '@/components/links/UnstyledLink';

const NewFooter = () => {
  return (
    <footer className='bottom-0 mx-auto w-full rounded-t-lg bg-amber-400 py-4'>
      <div className='container flex flex-row justify-center'>
        <div className='flex w-1/2 flex-row justify-between'>
          <div className='h-full'>
            <div className='center flex-row'>
              <CkziuLogo width={48} height={48} />
              CODEFEST
            </div>
          </div>
          <div className='h-full'>
            <Tooltip content='Discord CKZiU CodeFest'>
              <UnstyledLink href='https://discord.gg/mBat5Gw2na'>
                <FontAwesomeIcon icon={faDiscord} /> DISCORD
              </UnstyledLink>
            </Tooltip>
          </div>
        </div>
      </div>
      <p className='mt-2 text-center text-gray-900 dark:text-gray-300'>
        Copyright &copy; 2024-{new Date().getFullYear()} ckziucodefest.pl.
        Wszelkie prawa zastrzeżone.
        <br />
      </p>
      <p className='mt-2 text-center text-gray-900 dark:text-gray-300'>
        Serwis opracowany przez{' '}
        <Tooltip content='Kliknij aby zobaczyć profil GitHub'>
          <UnstyledLink href='https://github.com/Moderrek'>
            Tymona Woźniaka
          </UnstyledLink>
        </Tooltip>
      </p>
    </footer>
  );
};

function Footer() {
  return (
    <footer className='border-blue-gray-50 bottom-0 mx-auto w-full rounded-t-lg border-t bg-amber-400 py-4 text-white dark:bg-gray-900 dark:text-gray-300'>
      <div className='container mx-auto'>
        {/*<div className='flex flex-row items-center justify-center gap-6 sm:flex-row'>*/}
        {/*  /!*<Tooltip content='Discord CKZiU CodeFest'>*!/*/}
        {/*  /!*  <UnstyledLink href='https://discord.gg/mBat5Gw2na'>*!/*/}
        {/*  /!*    <FontAwesomeIcon icon={faDiscord} />*!/*/}
        {/*  /!*  </UnstyledLink>*!/*/}
        {/*  /!*</Tooltip>*!/*/}
        {/*</div>*/}
        <p className='mt-2 text-center text-gray-900 dark:text-gray-300'>
          Copyright &copy; 2024-{new Date().getFullYear()} ckziucodefest.pl.
          Wszelkie prawa zastrzeżone.
          <br />
        </p>
        <p className='mt-2 text-center text-gray-900 dark:text-gray-300'>
          Serwis opracowany przez{' '}
          <Tooltip content='Kliknij aby zobaczyć profil GitHub'>
            <UnstyledLink href='https://github.com/Moderrek'>
              Tymona Woźniaka
            </UnstyledLink>
          </Tooltip>
        </p>
      </div>
    </footer>
  );
}

export { Footer, NewFooter };
