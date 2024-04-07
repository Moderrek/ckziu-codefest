import {
  faDiscord,
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@material-tailwind/react';

function Footer() {
  return (
    <footer className='border-blue-gray-50 bottom-0 mx-auto w-full rounded-t-lg border-t bg-amber-400 dark:bg-gray-900 py-4 text-white dark:text-gray-300'>
      <div className='container mx-auto'>
        <div className='flex flex-row items-center justify-center gap-6 sm:flex-row'>
          <Tooltip content='Discord CKZiU CodeFest'>
            <a href='https://discord.gg/mBat5Gw2na'>
              <FontAwesomeIcon icon={faDiscord} />
            </a>
          </Tooltip>
        </div>
        <p className='mt-2 text-center text-gray-900 dark:text-gray-300'>
          Copyright &copy; 2024-{new Date().getFullYear()} ckziucodefest.pl.
          Wszelkie prawa zastrzeżone.
          <br />
        </p>
        <p className='mt-2 text-center text-gray-900 dark:text-gray-300'>
          Serwis opracowany przez{' '}
          <Tooltip content='Kliknij aby zobaczyć profil GitHub'>
            <a href='https://github.com/Moderrek'>Tymona Woźniaka</a>
          </Tooltip>{' '}
          i{' '}
          <Tooltip content='Kliknij aby zobaczyć profil GitHub'>
            <a href='https://github.com/Drakvlaa'>Filipa Sobczuka</a>
          </Tooltip>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
