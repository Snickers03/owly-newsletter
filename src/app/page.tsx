"use client";

import FeaturesSection from "@/components/home/features-section";
import { StarterSection } from "@/components/home/starter-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main>
        <section className='py-12'>
          <StarterSection />
        </section>
        <section className='bg-[#f6e6cf62]'>
          <FeaturesSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
