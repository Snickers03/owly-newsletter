import { Hr, Section, Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

interface Props {
  token: number;
  username?: string;
}

export default function VerifyTokenTemplateEmail({
  token = 123456,
  username = "there",
}: Props) {
  return (
    <EmailLayout>
      <Section>
        <Text className='mb-2 text-center text-2xl font-bold text-gray-800'>
          Verify Your Account
        </Text>
        <Text className='mb-6 text-center text-base text-gray-600'>
          Hi {username}, thanks for signing up! Please verify your account by
          entering this verification code:
        </Text>

        <Section className='mb-6 rounded-lg bg-gray-100 px-2 py-4'>
          <Text className='text-brand text-center font-mono text-3xl font-bold tracking-wide'>
            {String(token)}
          </Text>
        </Section>

        <Text className='mb-6 text-center text-sm text-gray-500'>
          This code will expire in 30 minutes. If you didn't create an account,
          you can safely ignore this email.
        </Text>

        <Hr className='my-6 border-gray-200' />

        <Text className='text-center text-sm text-gray-500'>
          By verifying your email, you'll be able to access all features of our
          platform.
        </Text>
      </Section>
    </EmailLayout>
  );
}
