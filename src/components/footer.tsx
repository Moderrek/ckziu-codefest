import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FooterDemo() {
  return (
    <footer className="bg-gray-900">
      <div
        className="
        container
        mx-auto flex flex-col
        flex-wrap
        px-4
        py-16
        md:flex-row
        md:flex-nowrap
        md:items-center lg:items-start
      "
      >
        <div className="mx-auto w-64 shrink-0 text-center md:mx-0 md:text-left">
          <Link href="/" className="text-2xl text-white">
            My Website
          </Link>
          <p className="mt-2 text-justify text-xs text-gray-400">
            Footer is a valuable resource that complements the main content of
            the website by providing quick links, legal information, and ways to
            connect, creating a well-rounded and user-friendly experience for
            visitors.
          </p>
          <div className="mt-4 flex">
            <Input type="email" placeholder="Email" />
            <Button variant="destructive">Subscribe</Button>
          </div>
          <div className="mt-4 flex justify-center space-x-4 lg:mt-2">
            <Link href="https://github.com/HegemonStudio" target="_blank">
              <Github className="text-pink-500" />
            </Link>
            <Link href="">
              <Twitter className="text-sky-300" />
            </Link>
            <Link href="">
              <Instagram className="text-pink-500" />
            </Link>
            <Link href="">
              <Linkedin className="text-blue-400" />
            </Link>
          </div>
        </div>
        <div className="mt-4 w-full justify-between text-center lg:flex">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Quick Links
            </h2>
            <ul className="mb-8 list-none space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300">
                  Link 1
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300">
                  Link 2
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300">
                  Link 3
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300">
                  Link 4
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Quick Links
            </h2>
            <ul className="mb-8 list-none space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300">
                  Link 1
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300">
                  Link 2
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300">
                  Link 3
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300">
                  Link 4
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Quick Links
            </h2>
            <ul className="mb-8 list-none space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300">
                  Link 1
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300">
                  Link 2
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300">
                  Link 3
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300">
                  Link 4
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="-mt-12 flex justify-center">
        <p className="pb-2 text-center text-white">
          @2024 All rights reserved by your website.
        </p>
      </div>
    </footer>
  );
}
