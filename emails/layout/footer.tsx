import { APP_NAME } from "@/config";
import { Text } from "@react-email/components";

export default function Footer() {
  return (
    <Text className='mt-4 text-center text-sm text-gray-500'>
      Kind regards, <br /> The {APP_NAME} Team
    </Text>
  );
}
