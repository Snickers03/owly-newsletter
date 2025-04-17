import { SidebarTrigger } from "@/components/ui/sidebar";
import { NewsletterCreator } from "@/components/newsletter/newsletter-creator";

export default function MainPage() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='border-b'>
        <div className='flex h-14 items-center gap-4 px-4'>
          <SidebarTrigger />
          <h1 className='text-xl font-semibold'>Newsletter</h1>
        </div>
      </header>
      <div className='flex-1 px-6'>
        <div className='py-8'>
          <h1 className='mb-2 text-3xl font-bold'>Create Newsletter</h1>
          <p className='text-muted-foreground mb-8'>
            Configure your personalized newsletter with your preferred content
            and settings.
          </p>
          <NewsletterCreator />
        </div>
      </div>
    </div>
  );
}
