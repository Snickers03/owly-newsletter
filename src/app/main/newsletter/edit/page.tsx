import MainLayout from "@/components/layout/main-layout";

export default function Page() {
  return (
    <MainLayout>
      <header>
        <h1 className='mb-2 text-3xl font-bold'>Edit Newsletter</h1>
        <p className='text-muted-foreground mb-8'>
          Modify your newsletter settings and content as needed.
        </p>
      </header>
    </MainLayout>
  );
}
