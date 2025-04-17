"use client";

import FeaturesSection from "@/components/home/features-section";
import { StarterSection } from "@/components/home/starter-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>
        <section className='w-full py-12'>
          <StarterSection />
        </section>
        <section className='relative w-full overflow-hidden bg-[#f6e6cf62]'>
          <FeaturesSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
