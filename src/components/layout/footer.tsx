"use client";

import Link from "next/link";
import { APP_NAME } from "@/config";

export const Footer = () => {
  return (
    <footer className='flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 md:px-6'>
      {/* On mobile: stacked layout */}
      <div className='flex w-full flex-col items-center gap-2 sm:hidden'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>

        <p className='text-xs text-gray-500 dark:text-gray-400'>
          Made with <span className='text-red-500'>❤️</span> by{" "}
          <a
            href='https://niklas.sh'
            target='_blank'
            rel='noopener noreferrer'
            className='underline-offset-4 hover:underline'
          >
            niklas.sh
          </a>
        </p>

        <div className='flex items-center justify-center gap-2'>
          <Link className='text-xs underline-offset-4 hover:underline' href='#'>
            Terms of Service
          </Link>
          <Link className='text-xs underline-offset-4 hover:underline' href='#'>
            Privacy
          </Link>
        </div>
      </div>

      {/* On desktop: single row with 3 sections */}
      <div className='hidden w-full sm:flex sm:items-center'>
        {/* Left section - Copyright */}
        <div className='flex-1'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>

        {/* Middle section - Made with love */}
        <div className='flex-shrink-0 px-4'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            Made with <span className='text-red-500'>❤️</span> by{" "}
            <a
              href='https://niklas.sh?utm_source=owly-newsletter.niklas.sh&utm_medium=website&utm_campaign=nb-showcase'
              target='_blank'
              rel='noopener noreferrer'
              className='underline-offset-4 hover:underline'
            >
              niklas.sh
            </a>
          </p>
        </div>

        {/* Right section - Links */}
        <div className='flex flex-1 items-center justify-end gap-2'>
          <Link className='text-xs underline-offset-4 hover:underline' href='#'>
            Terms of Service
          </Link>
          <Link className='text-xs underline-offset-4 hover:underline' href='#'>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};
