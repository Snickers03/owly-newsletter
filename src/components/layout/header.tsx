import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/config";
import { useUserStore } from "@/store/user-store";

import { Button } from "../ui/button";

export const Header = () => {
  const user = useUserStore((state) => state.user);
  return (
    <header className='flex h-14 items-center px-4 lg:px-6'>
      <Link className='flex items-center justify-center' href='/'>
        <Image src={"/logo.png"} alt='Logo' width={26} height={26} />
        <p className='text-xl font-bold'>{APP_NAME}</p>
      </Link>
      {!user && (
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Link
            href='/login'
            className='text-sm font-medium underline-offset-4 hover:underline'
          >
            Log In
          </Link>
          <Link
            href='/signup'
            className='text-sm font-medium underline-offset-4 hover:underline'
          >
            Sign Up
          </Link>
        </nav>
      )}
      {user && (
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Button>
            <Link
              href='/main/newsletter'
              className='text-sm font-medium underline-offset-4 hover:underline'
            >
              Dashboard
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
};
