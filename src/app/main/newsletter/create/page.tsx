import MainLayout from "@/components/layout/main-layout";

export default function Page() {
  return (
    <MainLayout>
      <header>
        <h1 className='mb-2 text-3xl font-bold'>Create Newsletter</h1>
        <p className='text-muted-foreground mb-8'>
          Configure your personalized newsletter with your preferred content and
          settings.
        </p>
        {/* <NewsletterCreator /> */}
      </header>
    </MainLayout>
  );
}
