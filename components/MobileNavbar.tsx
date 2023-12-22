import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  HomeIcon,
  MapIcon,
  LinkIcon,
  DocumentDuplicateIcon,
  AdjustmentsHorizontalIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
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
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const MobileNavbar = () => {
  const router = useRouter();
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200">
      <nav className="px-4 flex justify-between items-center h-16" aria-label="Navbar">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            aria-label={item.name}
            className={classNames(
              'flex items-center justify-center w-full h-full',
              router.pathname.includes(item.href)
                ? 'text-gray-500'
                : 'text-gray-600 hover:text-[#5064FF]'
            )}
          >
            <item.icon
              className={`h-6 w-6 ${
                router.pathname.includes(item.href) ? 'text-[#5064FF]' : 'text-gray-500'
              }`}
            />
            {item.count ? (
              <span
                className={`${
                  router.pathname.includes(item.href) ? 'text-[#5064FF]' : 'text-gray-500'
                } text-xs`}
              >
                {item.count}
              </span>
            ) : null}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavbar;
