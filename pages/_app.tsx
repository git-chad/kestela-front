import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'

import DashboardLayout from '@/components/DashboardLayout'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const router = useRouter()
  return (
    <SessionProvider session={session}>
      {router.pathname.includes("/dashboard")
        ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        )
        : <Component {...pageProps} />
      }
    </SessionProvider>
  )
}
