import MobileNavbar from './MobileNavbar';
import Sidebar from './Sidebar';
// import { useSession } from 'next-auth/react'
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import { Poppins } from '@next/font/google';
const poppins = Poppins({subsets: ['latin'], weight: ['500', '700', '300', '900', '200', '400']})

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // const { data: session } = useSession()
  // const router = useRouter()
  // useEffect(() => {
  //   if (session?.error === 'RefreshAccessTokenError') {
  //     console.log(session?.error);
      
  //     // router.push("/login")
  //   }
  // }, [session])

  return (
    <div className={`grid sm:grid-cols-6 sm:grid-rows-1 min-h-screen max-h-screen ${poppins.className}`}>
      {/* <Sidebar /> */}
      <div className="sm:col-span-5 sm:pl-4 sm:pt-8 sm:overflow-x-auto bg-white">{children}</div>
      <MobileNavbar/>
    </div>
  );
}
