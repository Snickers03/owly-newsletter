import MainLayout from "@/components/layout/main-layout";
import { NewsletterCreator } from "@/components/newsletter/create/newsletter-creator";

export default function Page() {
  return (
    <MainLayout>
      <div className='px-6'>
        <header>
          <h1 className='mb-2 text-3xl font-bold'>Create Newsletter</h1>
          <p className='text-muted-foreground mb-8'>
            Configure your personalized newsletter with your preferred content
            and settings.
          </p>
          <NewsletterCreator />
        </header>
      </div>
    </MainLayout>
  );
}
