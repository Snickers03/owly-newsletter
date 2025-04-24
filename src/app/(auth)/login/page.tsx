import { AuthHeader } from "@/components/auth/layout/auth-header";
import { AuthImage } from "@/components/auth/layout/auth-image";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <AuthHeader />
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <AuthImage />
    </div>
  );
}
