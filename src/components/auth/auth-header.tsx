import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/config";

export const AuthHeader = () => {
  return (
    <div className='flex justify-center gap-2 md:justify-start'>
      <Link href='/' className='flex items-center gap-2 font-medium'>
        <div className='text-primary-foreground flex size-6 items-center justify-center rounded-md'>
          <Image src={"/logo.png"} alt='Logo' width={24} height={24} />
        </div>
        {APP_NAME}
      </Link>
    </div>
  );
};
