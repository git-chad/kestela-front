import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  ChartBarIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  MapIcon,
  LinkIcon,
  DocumentDuplicateIcon,
  AdjustmentsHorizontalIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  EnvelopeIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';

import kestelalogo from '@/images/logos/kestela_logo.png';
import kestelalogoSmall from '@/public/Kestela_iso_RGB_color.svg';

import { AnimatePresence, motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
  {
    name: 'Integrations',
    icon: AdjustmentsHorizontalIcon,
    href: '/dashboard/integrations',
    count: 1,
  },
  { name: 'Gallery', icon: LinkIcon, href: '/dashboard/gallery' },
  {
    name: 'My Templates',
    icon: DocumentDuplicateIcon,
    href: '/dashboard/my-templates',
    count: 2,
  },
  { name: 'Customizations', icon: MapIcon, href: '/dashboard/customizations' },
  { name: 'Organizations', icon: BriefcaseIcon, href: '/dashboard/organizations' },
  // { name: 'Invites', icon: EnvelopeIcon, href: '/dashboard/invites' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const variants = {
  open: { width: '100%', transition: { duration: 0.3 } },
  closed: { width: '28%', transition: { duration: 0.3 } },
};

const logoVariants = {
  visible: { opacity: 1, transition: { duration: 0.6 } },
  hidden: { opacity: 0, transition: { duration: 0.6 } },
};

export default function Sidebar() {
  const { data } = useSession() as any;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <AnimatePresence>
      <motion.div
        className="flex min-h-0 flex-1 flex-col border-r border-gray-200 col-span-1 relative"
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
      >
        <a onClick={() => toggleSidebar()} className="absolute w-6 top-[50%] left-[100%]">
          {isOpen && <ChevronLeftIcon />}
          {!isOpen && <ChevronRightIcon />}
        </a>
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            {isOpen ? (
              <motion.div
                key="full-logo"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={logoVariants}
              >
                <Image src={kestelalogo} alt="kestela logo" />
              </motion.div>
            ) : (
              <motion.div
                key="small-logo"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={logoVariants}
              >
                <Image src={kestelalogoSmall} alt="kestela logo" />
              </motion.div>
            )}
          </div>
          <nav className={`mt-5 flex-1 space-y-1 bg-white px-2 ${!isOpen ? 'flex flex-col items-center' : ''}`} aria-label="Sidebar">
            <Link
              key={navigation[0].name}
              href={navigation[0].href}
              className={`${classNames(
                router.pathname === `/dashboard`
                  ? 'bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                'group flex items-center text-sm font-medium'
              )} ${!isOpen ? 'rounded-full flex justify-center p-2 w-12 h-12' : 'rounded-xl p-2'}`}
            >
              <HomeIcon
                className={` ${classNames(
                  router.pathname === `/dashboard`
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'flex-shrink-0 h-6 w-6'
                )} ${isOpen ? 'mr-3' : ''}`}
                aria-hidden="true"
              />
              {isOpen && <span className="flex-1">{navigation[0].name}</span>}
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
                    className={` ${classNames(
                      router.pathname === `/dashboard/${item.name.toLowerCase()}`
                        ? 'bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-sm font-medium'
                    )} ${!isOpen ? 'rounded-full flex justify-center p-2 w-12 h-12' : 'rounded-xl p-2'
                      }`}
                  >
                    <item.icon
                      className={`${classNames(
                        router.pathname === `/dashboard/${item.name.toLowerCase()}`
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'flex-shrink-0 h-6 w-6'
                      )} ${isOpen ? 'mr-3' : ''}`}
                      aria-hidden="true"
                    />
                    {isOpen && <span className="flex-1">{item.name}</span>}
                    {isOpen && item.count ? (
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
            <div className="flex items-center flex-col">
              <div>
                <Image
                  className="inline-block h-9 w-9 rounded-full"
                  src={data?.user.image ?? ''}
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              {isOpen && (
                <>
                  <div className="py-2">
                    <p className="text-sm text-center font-medium text-gray-700 group-hover:text-gray-900">
                      {data?.user.name}
                    </p>
                    <p className="text-xs text-center font-medium text-gray-500 group-hover:text-gray-700">
                      {data?.user.email}
                    </p>
                  </div>
                  <p
                    className="group flex justify-center hover:cursor-pointer rounded-xl bg-[#5064FF] py-2 px-4 text-xs font-poppins font-semibold text-white hover:bg-[#5073ff]"
                    onClick={() =>
                      signOut({ callbackUrl: `https://${process.env.VERCEL_URL}` })
                    }
                  >
                    Logout
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
