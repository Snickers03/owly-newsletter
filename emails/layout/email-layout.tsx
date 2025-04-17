import { Container, Head } from "@react-email/components";

import Footer from "./footer";
import Header from "./header";
import TailwindProvider from "./tailwind-provider";

export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TailwindProvider>
      <Container className='bg-background mx-auto my-10 max-w-md rounded-lg border border-gray-200 px-6 py-8 font-sans shadow-md'>
        <Head />
        <Header />
        {children}
        <Footer />
      </Container>
    </TailwindProvider>
  );
}
