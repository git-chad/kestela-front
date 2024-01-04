import MobileNavbar from './MobileNavbar';
import Sidebar from './Sidebar';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '700', '300', '900', '200', '400'],
});

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid sm:grid-cols-6 sm:grid-rows-1 min-h-screen max-h-screen ${poppins.className}`}
    >
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <div className="sm:col-span-5 sm:pl-4 sm:pt-8 sm:overflow-x-auto bg-white">
        {children}
      </div>
      <div className="block sm:hidden absolute bottom-0">
        <MobileNavbar />
      </div>
    </div>
  );
}
