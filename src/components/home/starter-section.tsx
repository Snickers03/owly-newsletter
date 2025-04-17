import Image from "next/image";

import { EmailInputForm } from "./email-input-form";

export const StarterSection = () => {
  return (
    <div className='container mx-auto px-4 md:px-6'>
      <div className='flex flex-col items-center text-center'>
        <Image
          alt='Landing Image'
          src='/landing.png'
          width={200}
          height={200}
        />
        <div className='space-y-6'>
          <h1 className='mx-auto text-center text-3xl font-bold tracking-tighter sm:text-4xl md:w-2/3 md:text-5xl lg:text-6xl'>
            Create your own personalized newsletter
          </h1>
          <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
            Get weather updates, stock prices, and daily quotes — delivered just
            the way you want.
          </p>
          <EmailInputForm />
        </div>
      </div>
    </div>
  );
};
