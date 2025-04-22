// app/unsubscribe/page.tsx
import { Suspense } from "react";

import UnsubscribeClient from "@/components/unsubscribe/unsubscribe-client";

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className='p-8 text-center'>Loading unsubscribe page...</div>
      }
    >
      <UnsubscribeClient />
    </Suspense>
  );
}
