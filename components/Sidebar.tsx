import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ChartBarIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  LinkIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
  {
    name: 'Integrations',
    icon: AdjustmentsHorizontalIcon,
    href: '/dashboard/integrations',
    count: 1,
  },
  { name: 'Gallery', icon: LinkIcon, href: '/dashboard/gallery', count: 4 },
  { name: 'Documents', icon: InboxIcon, href: '#', count: 12 },
  { name: 'Profile', icon: UsersIcon, href: '/dashboard/profile' },
  { name: 'Reports', icon: ChartBarIcon, href: '#' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const { data } = useSession() as any;
  const router = useRouter();
  return (
    <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white col-span-1">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <Image
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg"
            alt="Your Company"
            width={20}
            height={20}
          />
          <h2 className="ml-2 text-2xl font-bold">Kestela Platform</h2>
        </div>
        <nav className="mt-5 flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
          <Link
            key={navigation[0].name}
            href={navigation[0].href}
            className={classNames(
              router.pathname === `/dashboard`
                ? 'bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
            )}
          >
            <HomeIcon
              className={classNames(
                router.pathname === `/dashboard`
                  ? 'text-gray-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                'mr-3 flex-shrink-0 h-6 w-6'
              )}
              aria-hidden="true"
            />
            <span className="flex-1">{navigation[0].name}</span>
            {navigation[0].count ? (
              <span
                className={classNames(
                  router.pathname === `/dashboard`
                    ? 'bg-white'
                    : 'bg-gray-100 group-hover:bg-gray-200',
                  'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'
                )}
              >
                {navigation[0].count}
              </span>
            ) : null}
          </Link>
          {navigation.map(
            (item, i) =>
              i !== 0 && (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    router.pathname === `/dashboard/${item.name.toLowerCase()}`
                      ? 'bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={classNames(
                      router.pathname === `/dashboard/${item.name.toLowerCase()}`
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.count ? (
                    <span
                      className={classNames(
                        router.pathname === `/dashboard/${item.name.toLowerCase()}`
                          ? 'bg-white'
                          : 'bg-gray-100 group-hover:bg-gray-200',
                        'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'
                      )}
                    >
                      {item.count}
                    </span>
                  ) : null}
                </Link>
              )
          )}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-gray-200 p-4 justify-center">
        <div className="group block w-full flex-shrink-0">
          <div className="flex items-center ml-2">
            <div>
              <Image
                className="inline-block h-9 w-9 rounded-full"
                src={data?.user.image ?? ''}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {data?.user.name}
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                {data?.user.email}
              </p>
            </div>
            <p
              className="lg:ml-8 hover:cursor-pointer hover:opacity-75 font-semibold"
              onClick={() => signOut({ callbackUrl: `https://${process.env.VERCEL_URL}` })}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
