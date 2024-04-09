import Link from 'next/link';

import NextImage from '@/components/NextImage';
import { ThemeToggle } from '@/components/theme-toggle';
import DropdownMenuDemo from '@/components/ui/dropdownmenu';

export default function Navbar() {
  return (
    <div className='navbar flex-no-wrap border-gradient-to-r sticky top-0 z-50 border-b-2 bg-white bg-opacity-30 from-indigo-500	 backdrop-blur-2xl'>
      <div className='navbar-start'></div>
      <div className='navbar-center hidden sm:flex md:flex'>
        <ul className='menu menu-horizontal px-1'>
          <Link className='btn btn-ghost text-xl' href='/'>
            <NextImage
              useSkeleton={true}
              src='/images/ckziu_logo_64.png'
              width={32}
              height={32}
              alt='CKZiU Logo'
            />{' '}
            CKZiU CodeFest
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
