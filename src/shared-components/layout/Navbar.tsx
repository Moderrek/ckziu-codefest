import ProfileDropMenu from "@/components/ui/dropdownmenu";

import CkziuLogo from "@/shared-components/icon/CkziuLogo";
import { NavbarBreadcrumb } from "@/shared-components/layout/DefaultLayout";
import UnstyledLink from "@/shared-components/link/UnstyledLink";
import { ThemeToggle } from "@/shared-components/theme/theme-toggle";

interface NavbarProps {
  breadcrumbs?: NavbarBreadcrumb[];
}

export default function Navbar({ breadcrumbs }: NavbarProps) {
  return (
    <div
      className="border-colorful top-0 z-50 w-full border-b-2 bg-white bg-opacity-30 from-indigo-500 text-gray-900 backdrop-blur-2xl dark:bg-opacity-0 dark:text-gray-50 md:sticky">
      <div
        className="mx-auto flex max-w-full flex-col px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <UnstyledLink
            href="/"
            className="group flex text-gray-900 transition duration-1000 ease-in-out dark:text-gray-50"
          >
            <CkziuLogo width={36} height={36} />
            <div
              className="ml-3 mt-1 text-xl font-black uppercase tracking-tight transition-colors group-hover:text-gray-900/60 dark:group-hover:text-gray-50/60">
              CKZiU CodeFest
            </div>
          </UnstyledLink>
          {breadcrumbs?.map((breadcrumb, idx) => {
            return (
              <span key={idx} className="hidden md:block">
                <UnstyledLink
                  href={breadcrumb.url}
                  className="group flex text-gray-900 transition duration-1000 ease-in-out dark:text-gray-50"
                >
                  <span className="text-2xl">/</span>
                  <div
                    className="ml-3 mt-1 text-xl font-black uppercase tracking-tight transition-colors group-hover:text-gray-900/60 dark:group-hover:text-gray-50/60">
                    {breadcrumb.name}
                  </div>
                </UnstyledLink>
              </span>
            );
          })}
        </div>
        <nav className="hidden grow flex-col pb-4 md:flex md:flex-row md:justify-end md:pb-0">
          <ThemeToggle />
          <ProfileDropMenu />
        </nav>
      </div>
    </div>
  );
}
