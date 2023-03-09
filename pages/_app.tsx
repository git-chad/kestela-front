import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import DashboardLayout from '@/components/DashboardLayout';
import { RefreshTokenHandler } from '@/services';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const [interval, setInterval] = useState(0);
  return (
    <SessionProvider session={session} refetchInterval={interval}>
      {router.pathname.includes('/dashboard') ? (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <Component {...pageProps} />
      )}
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
}
