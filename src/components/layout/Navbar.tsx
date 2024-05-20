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
    <div className='navbar flex-no-wrap border-colorful sticky top-0 z-50 border-b-2 bg-white bg-opacity-30 from-indigo-500 backdrop-blur-2xl dark:bg-opacity-0'>
      <div className='navbar-start'></div>
      <div className='navbar-center '>
        <div className='flex flex-row min-w-fit items-center'>
          <UnstyledLink href='/' className='flex flex-row items-center'>
            <CkziuLogo width={32} height={32} />
            <span className='btn btn-ghost font-title text-xl font-extrabold italic p-1'>
              CODEFEST
            </span>
          </UnstyledLink>
          {breadcrumbs?.map((breadcrumb, idx) => {
            return (
              <span key={idx} className='hidden md:block'>
                /
                <UnstyledLink
                  href={breadcrumb.url}
                  className='btn btn-ghost font-title text-xl font-extrabold italic p-1'
                >
                  {breadcrumb.name}
                </UnstyledLink>
              </span>
            );
          })}
        </div>
      </div>
      <div className='navbar-end flex space-x-2'>
        <ThemeToggle />
        <ProfileDropMenu />
      </div>
    </div>
  );
}
