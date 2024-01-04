import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchOrganizations } from '@/pages/api/organizations/fetch';

type Organization = {
  id: string;
  name: string;
};

type OrganizationDropdownProps = {
  currentCompany: string | undefined;
};

const OrganizationDropdownSelector: React.FC<OrganizationDropdownProps> = ({
  currentCompany,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const fetchedOrgs: Organization[] = await fetchOrganizations();
        console.log('fetched orgs', fetchedOrgs);

        setOrganizations([...fetchedOrgs]);
      } catch (error) {
        console.error('Failed to load organizations:', error);
      }
    };

    loadOrganizations();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCompanies = organizations.filter(
    (organization) =>
      organization.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      organization.name !== currentCompany
  );

  return (
    <motion.div
      className="z-50 bg-gray-100 sm:w-96 w-[80%] rounded-xl sm:shadow-lg shadow-2xl absolute sm:left-16 sm:top-0 top-42 right-8"
      variants={modalVariants}
      initial={'initial'}
      animate="animate"
      exit="exit"
    >
      <div className="searh-bar container w-full hidden sm:block">
        <label htmlFor="search" className="sr-only">
          Search template
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full bg-white h-12 py-1.5 pl-10 pr-3 placeholder:text-gray-500 sm:text-sm sm:leading-6 border-gray-100 rounded-t-xl shadow-xs"
            placeholder="Search"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="current-company w-full p-2">
        <div className="flex justify-between bg-[#5064ff] h-12 items-center rounded-lg px-4">
          <h1 className="text-white font-medium">{currentCompany}</h1>
          <CheckIcon className="w-5 text-white" />
        </div>
      </div>
      <div>
        {filteredCompanies.map((organization, index) => (
          <div key={index} className="w-full p-2">
            <a
              href={`/dashboard/organizations/${encodeURIComponent(organization.id)}`}
              className="flex justify-between h-12 items-center rounded-lg px-4 hover:bg-white transition-colors"
            >
              <p>{organization.name}</p>
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const modalVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default OrganizationDropdownSelector;
