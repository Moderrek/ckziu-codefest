import CkziuLogo from '@/components/images/CkziuLogo';
import { NavbarBreadcrumb } from '@/components/layout/DefaultLayout';
import UnstyledLink from '@/components/links/UnstyledLink';
import { ThemeToggle } from '@/components/theme-toggle';
import ProfileDropMenu from '@/components/ui/dropdownmenu';

interface NavbarProps {
  breadcrumbs?: NavbarBreadcrumb[];
}

export default function Navbar({ breadcrumbs }: NavbarProps) {
  return (
    <div className='top-0 z-50 w-full text-gray-900 md:sticky border-colorful border-b-2 bg-white bg-opacity-30 from-indigo-500 backdrop-blur-2xl dark:bg-opacity-0'>
      <div className='flex flex-col max-w-full px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
        <div className='flex flex-row items-center justify-between p-4'>
          <UnstyledLink
            href='/'
            className='flex text-gray-900 dark:text-gray-50 transition duration-1000 ease-in-out group'
          >
            <CkziuLogo width={36} height={36} />
            <div className='mt-1 ml-3 text-xl font-black tracking-tight uppercase transition-colors dark:group-hover:text-gray-50/60 group-hover:text-gray-900/60'>
              CKZiU CodeFest
            </div>
          </UnstyledLink>
          {breadcrumbs?.map((breadcrumb, idx) => {
            return (
              <span key={idx} className='hidden md:block'>
                <UnstyledLink
                  href={breadcrumb.url}
                  className='flex text-gray-900 dark:text-gray-50 transition duration-1000 ease-in-out group'
                >
                  <span className='text-2xl'>/</span>
                  <div className='mt-1 ml-3 text-xl font-black tracking-tight uppercase transition-colors dark:group-hover:text-gray-50/60 group-hover:text-gray-900/60'>
                    {breadcrumb.name}
                  </div>
                </UnstyledLink>
              </span>
            );
          })}
        </div>
        <nav className='flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row'>
          <ThemeToggle />
          <ProfileDropMenu />
        </nav>
      </div>
    </div>
  );
}
