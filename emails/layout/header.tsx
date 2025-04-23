import { APP_LIVE_LOGO_URL, APP_NAME } from "@/config";
import { Img, Section, Text } from "@react-email/components";

export default function Header() {
  return (
    <Section className='mb-8 text-center'>
      <Img
        src={APP_LIVE_LOGO_URL}
        width='60'
        height='60'
        alt='Logo'
        className='mx-auto mb-4'
      />
      <Text className='m-0 text-2xl font-bold text-gray-800'>{APP_NAME}</Text>
    </Section>
  );
}
