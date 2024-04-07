import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  IconButton,
  MobileNav,
  Typography,
} from '@material-tailwind/react';
// import { signIn } from 'next-auth/react';
import React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

export default function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <UnstyledLink href='/' className='flex items-center'>
          Strona główna
        </UnstyledLink>
      </Typography>
      {/* <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link href="/rynek" className="flex items-center">
          Rynek
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link href="/gielda" className="flex items-center">
          Giełda
        </Link>
      </Typography> */}

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <a
          href='https://moderrkowo.tebex.io/category/survival-ekonomia'
          className='flex items-center'
        >
          Sklep
        </a>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <UnstyledLink href='/regulamin' className='flex items-center'>
          Regulamin
        </UnstyledLink>
      </Typography>
      {/* <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link to="/vote" className="flex items-center">
          Zagłosuj
        </Link>
      </Typography> */}
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <a href='https://discord.gg/mBat5Gw2na' className='flex items-center'>
          Discord
        </a>
      </Typography>
      {/* <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link href="/wiki" className="flex items-center">
          Wiki
        </Link>
      </Typography> */}
    </ul>
  );
  return (
    <>
      <div className='sticky inset-0 z-10 block h-max w-full max-w-full rounded-none border border-white/80 bg-white bg-opacity-80 px-4 py-2 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4'>
        <div className='text-blue-gray-900 flex items-center justify-between'>
          <UnstyledLink
            href='/'
            className='mr-4 cursor-pointer py-1.5 font-bold'
          >
            Moderrkowo
          </UnstyledLink>
          <div className='flex items-center gap-4'>
            <div className='mr-4 hidden lg:block'>{navList}</div>

            <Button
              variant='gradient'
              size='sm'
              className='hidden lg:inline-block'
              onClick={() => {
                // signIn();
              }}
            >
              <FontAwesomeIcon icon={faRightToBracket} /> Zaloguj się
            </Button>

            <IconButton
              variant='text'
              className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  className='h-6 w-6'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <UnstyledLink href='/zaloguj'>
            <Button variant='gradient' size='sm' fullWidth className='mb-2'>
              <span>Zaloguj się</span>
            </Button>
          </UnstyledLink>
        </MobileNav>
      </div>
    </>
  );
}
