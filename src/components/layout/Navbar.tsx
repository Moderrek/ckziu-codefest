import Link from 'next/link';

import NextImage from '@/components/NextImage';
import { ThemeToggle } from '@/components/theme-toggle';
import DropdownMenuDemo from '@/components/ui/dropdownmenu';

export default function Navbar() {
  return (
    <div className='navbar flex-no-wrap border-gradient-to-r sticky top-0 z-50 border-b-2 from-indigo-500 backdrop-blur-2xl'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
        </div>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <Link className='btn btn-ghost text-xl' href='/'>
            <NextImage useSkeleton={true} src="/images/ckziu_logo_64.png" width={32} height={32} alt="CKZiU Logo"/> CKZiU CodeFest
          </Link>
        </ul>
      </div>
      <div className='navbar-end flex space-x-2'>
        <ThemeToggle />
        <DropdownMenuDemo />
      </div>
    </div>
  );
}
