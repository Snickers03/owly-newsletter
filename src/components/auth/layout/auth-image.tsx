import Image from "next/image";

export const AuthImage = () => {
  return (
    <div className='bg-muted relative hidden lg:block'>
      <Image
        src='/auth-image.png'
        alt='Image'
        fill
        priority
        sizes='(min-width: 1024px) 50vw, 100vw'
        className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
      />
    </div>
  );
};
