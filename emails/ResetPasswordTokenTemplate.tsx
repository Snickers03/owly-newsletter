import { Hr, Section, Text } from "@react-email/components";

import EmailLayout from "./layout/email-layout";

interface Props {
  token: number;
  username?: string;
}

export default function ResetPasswordTokenTemplate({
  token = 123456,
  username,
}: Props) {
  return (
    <EmailLayout>
      <Section>
        <Text className='mb-2 text-center text-2xl font-bold text-gray-800'>
          Reset Your Password
        </Text>
        <Text className='mb-6 text-center text-base text-gray-600'>
          Hi{username && ` ${username}`}, we received a request to reset your
          password. Use the code below to complete the process:
        </Text>
        <Section className='mb-6 rounded-lg bg-gray-100 px-2 py-4'>
          <Text className='text-brand text-center font-mono text-3xl font-bold tracking-wide'>
            {String(token)}
          </Text>
        </Section>

        <Text className='mb-6 text-center text-sm text-gray-500'>
          This code will expire in 30 minutes.
        </Text>

        <Hr className='my-6 border-gray-200' />

        <Text className='mb-6 text-center text-sm text-gray-500'>
          If you didn't request a password reset, you can safely ignore this
          email.
        </Text>
      </Section>
    </EmailLayout>
  );
}
