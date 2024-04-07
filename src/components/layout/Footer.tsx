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
    <>
      <footer className='border-blue-gray-50 bottom-0 mx-auto mt-20 w-full rounded-t-lg border-t bg-amber-400 py-8 text-white lg:mt-60'>
        <div className='container mx-auto'>
          <div className='mx-auto sm:w-3/4 lg:w-2/4'>
            <div className='mt-8 flex flex-row items-center justify-center gap-6 sm:flex-row'>
              <Tooltip content='Discord Moderrkowo'>
                <a href='https://discord.gg/mBat5Gw2na'>
                  <FontAwesomeIcon icon={faDiscord} />
                </a>
              </Tooltip>
              <Tooltip content='Twitter Moderrkowo'>
                <a href='https://twitter.com/ModerrkowoPL'>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </Tooltip>
              <Tooltip content='Facebook Moderrkowo'>
                <a href='https://www.facebook.com/moderrkowo'>
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </Tooltip>
              <Tooltip content='Instagram Moderrkowo'>
                <a href='https://instagram.com/moderrkowo/'>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </Tooltip>
            </div>
            <p className='mt-5 text-center text-gray-900'>
              Copyright © 2024-{new Date().getFullYear()} ckziucodefest.pl.
              Wszelkie prawa zastrzeżone.
              <br />
            </p>
            <p className='mt-5 text-center text-gray-900'>
              Stworzone przez{' '}
              <a href='https://github.com/Moderrek'>Tymona Woźniaka</a> i{' '}
              <a href='https://github.com/Drakvlaa'>Filipa Sobczuka</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
