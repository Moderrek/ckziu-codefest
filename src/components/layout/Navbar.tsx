import Link from 'next/link';

import CkziuLogo from '@/components/images/CkziuLogo';
import { ThemeToggle } from '@/components/theme-toggle';
import ProfileDropMenu from '@/components/ui/dropdownmenu';

export default function Navbar() {
  return (
    <div className='navbar flex-no-wrap border-gradient-to-r sticky top-0 z-50 border-b-2 bg-white bg-opacity-30 from-indigo-500 backdrop-blur-2xl dark:bg-opacity-0'>
      <div className='navbar-start'></div>
      <div className='navbar-center flex'>
        <ul className='menu menu-horizontal px-1'>
          <Link
            className='btn btn-ghost font-title text-xl font-extrabold italic'
            href='/'
          >
            <CkziuLogo width={32} height={32} /> CODEFEST
          </Link>
        </ul>
      </div>
      <div className='navbar-end flex space-x-2'>
        <ThemeToggle />
        <ProfileDropMenu />
      </div>
    </div>
  );
}
