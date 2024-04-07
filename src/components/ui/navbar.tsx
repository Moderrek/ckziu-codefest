import DropdownMenuDemo from "@/components/ui/dropdownmenu";
import {ThemeToggle} from "@/components/theme-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <div
      className="navbar flex-no-wrap fixed top-0 border-b-4 border-gradient-to-r from-indigo-500 z-10 backdrop-blur-2xl ...">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Link className="btn btn-ghost text-xl" href="/">CKZiU CodeFest</Link>
        </ul>
      </div>
      <div className="navbar-end flex space-x-2">
        <ThemeToggle/>
        <DropdownMenuDemo/>
      </div>
    </div>
  )
}