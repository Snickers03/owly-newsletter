import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AuthHeader } from "@/components/auth/layout/auth-header";
import { AuthImage } from "@/components/auth/layout/auth-image";

export default function ForgotPasswordPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <AuthHeader />
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <AuthImage />
    </div>
  );
}
