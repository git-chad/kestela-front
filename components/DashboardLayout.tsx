import Sidebar from './Sidebar';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-6 grid-rows-1 min-h-screen">
      <Sidebar />
      <div className="col-span-5 p-4">{children}</div>
    </div>
  );
}
