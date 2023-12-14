import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import OrgModal from '@/components/OrgModal';

const Organizations = () => {
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const [organizations, setOrganizations] = useState(companies);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (!event.target) return;
      let isDropdown = (event.target as HTMLElement).closest('.dropdown');

      if (!isDropdown) {
        setDropdownOpen({});
      }
    };

    if (Object.values(dropdownOpen).some((isOpen) => isOpen)) {
      document.addEventListener('click', closeDropdown);
    }

    return () => document.removeEventListener('click', closeDropdown);
  }, [dropdownOpen]);

  const toggleDropdown = (companyName: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDropdownOpen((prev) => ({ ...prev, [companyName]: !prev[companyName] }));
  };

  const removeCompany = (companyName: any) => {
    setDropdownOpen((prev) => ({ ...prev, [companyName]: false }));
  };

  const configureCompany = (companyName: string) => {
    console.log('Configure company:', companyName);
    setDropdownOpen((prev) => ({ ...prev, [companyName]: false }));
  };

  const handleSaveNewCompany = (newCompany: any) => {
    setOrganizations((prev) => [...prev, newCompany]);
  };

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
      <h1 className="text-5xl font-medium">Organizations</h1>
      <h2 className="text-2xl mb-16">Link up!</h2>
      <button
        onClick={() => setModalOpen(true)}
        className="text-[#5865FF] text-semibold self-start mb-4 hover:text-[#19B8FF] transition-colors"
      >
        Add new organization
      </button>

      <div className="absolute top-0 right-0 z-50">
        <OrgModal
          onClose={() => setModalOpen(false)}
          onSave={handleSaveNewCompany}
          status={isModalOpen}
        />
      </div>

      <AnimatePresence>
        <div className="space-y-8">
          {organizations.map((company, index) => (
            <div className="relative max-w-md" key={index}>
              <motion.a
                href={`/dashboard/organizations/${encodeURIComponent(
                  company.companyName
                )}`}
                key={company.companyName} // Changed from index to companyName
                className="bg-[#F3F4F6] flex flex-col p-6 rounded-xl max-w-md hover:scale-[101.5%] transition-all cursor-pointer"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: [0.77, 0, 0.18, 1],
                }}
              >
                <h1 className="font-medium">{company.companyName}</h1>
                <h2 className="text-sm text-[#333333]">{company.companyDescription}</h2>

                {company.members
                  .filter((member) => member.role === 'Owner')
                  .map((owner, index) => (
                    <div
                      key={owner.email}
                      className="text-xs flex w-[40%] justify-between mt-6"
                    >
                      <p className="text-gray-500">{owner.fullName}</p>
                      <p className="text-[#5865FF]">{owner.role}</p>
                    </div>
                  ))}
              </motion.a>
              <motion.div
                className="absolute top-0 -right-8 w-6"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: [0.77, 0, 0.18, 1],
                }}
              >
                <button
                  onClick={(event) => toggleDropdown(company.companyName, event)}
                  className="w-full"
                >
                  <EllipsisVerticalIcon />
                </button>
                {dropdownOpen[company.companyName] && (
                  <motion.div
                    className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.1 }}
                  >
                    <div className="p-1">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start transition-colors"
                        onClick={() => configureCompany(company.companyName)}
                      >
                        Configure
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start transition-colors"
                        onClick={() => removeCompany(company.companyName)}
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Organizations;

const cardVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const companies = [
  {
    companyName: 'Tech Innovators Inc.',
    companyDescription: 'A team of innovators in tech',
    members: [
      { fullName: 'Alice Johnson', role: 'Owner', email: 'alice@techinnovators.com' },
      { fullName: 'Bob Smith', role: 'Admin', email: 'bob@techinnovators.com' },
      {
        fullName: 'Charlie Davis',
        role: 'Collaborator',
        email: 'charlie@techinnovators.com',
      },
    ],
  },
  {
    companyName: 'Green Solutions Ltd.',
    companyDescription: 'Solutions that are colored in shades of green',
    members: [
      { fullName: 'Anita Rawson', role: 'Owner', email: 'anita_d@greensolutions.com' },
      {
        fullName: 'Edward Brown',
        role: 'Collaborator',
        email: 'edward@greensolutions.com',
      },
      { fullName: 'Fiona Clark', role: 'Admin', email: 'fiona@greensolutions.com' },
      {
        fullName: 'George White',
        role: 'Collaborator',
        email: 'george@greensolutions.com',
      },
    ],
  },
  {
    companyName: 'Future Dynamics Corp.',
    companyDescription: 'Currently static, will be dynamic in the future',
    members: [
      { fullName: 'Hannah Martin', role: 'Owner', email: 'hannah@futuredynamics.com' },
      { fullName: 'Ian Thompson', role: 'Admin', email: 'ian@futuredynamics.com' },
      {
        fullName: 'Julia Wilson',
        role: 'Collaborator',
        email: 'julia@futuredynamics.com',
      },
      { fullName: 'Kyle Moore', role: 'Collaborator', email: 'kyle@futuredynamics.com' },
      {
        fullName: 'Laura Taylor',
        role: 'Collaborator',
        email: 'laura@futuredynamics.com',
      },
    ],
  },
  {
    companyName: 'Rubbers Virginia Ltd.',
    companyDescription: 'Self explanatory... I think',
    members: [
      { fullName: 'Jacob Dell', role: 'Owner', email: 'hannah@futuredynamics.com' },
      { fullName: 'Ian Thompson', role: 'Admin', email: 'ian@futuredynamics.com' },
    ],
  },
];
