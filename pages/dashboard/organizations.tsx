import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import OrgModal from '@/components/OrgModal';
import { fetchOrganizations } from '../api/organizations/fetch';
import { createOrganization } from '../api/organizations/post';
import Link from 'next/link';

type Organization = {
  id: string;
  name: string;
  usersRelated: any[];
  description: string;
  members: {
    fullName: string;
    role: string;
    email: string;
  }[];
};

const Organizations = () => {
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

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

  const toggleDropdown = (name: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDropdownOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const removeCompany = (name: any) => {
    setDropdownOpen((prev) => ({ ...prev, [name]: false }));
  };

  const configureCompany = (name: string) => {
    console.log('Configure company:', name);
    setDropdownOpen((prev) => ({ ...prev, [name]: false }));
  };

  // const handleSaveNewCompany = (newCompany: any) => {
  //   setOrganizations((prev) => [...prev, newCompany]);
  // };

  const handleSaveNewCompany = async (newCompany: {
    companyName: string;
    companyDescription: string;
    members: any[];
  }) => {
    try {
      const newOrganization = await createOrganization(newCompany.companyName);
      setOrganizations((prev) => [...prev, newOrganization]);
    } catch (error) {
      console.error('Failed to save new organization:', error);
    }
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

      <div
        className={`absolute top-0 right-0 z-50 ${
          isModalOpen ? '' : 'pointer-events-none'
        }`}
      >
        <OrgModal
          onClose={() => setModalOpen(false)}
          onSave={handleSaveNewCompany}
          status={isModalOpen}
        />
      </div>

      <AnimatePresence>
        <div className="w-[80vw] sm:w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-2">
          {organizations.map((company, index) => {
            if (!company || typeof company !== 'object' || !company.name) {
              // Handle the case where company is not what you expect
              return null;
            }

            return (
              <div className="relative max-w-md" key={index}>
                <Link href={`dashboard/organizations/${encodeURIComponent(company.id)}`}>
                  <motion.div
                    key={company.name}
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
                    <h1 className="font-medium">{company.name}</h1>
                    <h2 className="text-sm text-[#333333]">{company.description}</h2>

                    {/* {company.members
                    .filter((member) => member.role === 'Owner')
                    .map((owner, index) => (
                      <div
                        key={owner.email}
                        className="text-xs flex w-[40%] justify-between mt-6"
                      >
                        <p className="text-gray-500">{owner.fullName}</p>
                        <p className="text-[#5865FF]">{owner.role}</p>
                      </div>
                    ))} */}
                  </motion.div>
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
                      onClick={(event) => toggleDropdown(company.name, event)}
                      className="w-full ml-3 sm:ml-0"
                    >
                      <EllipsisVerticalIcon />
                    </button>
                    {dropdownOpen[company.name] && (
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
                            onClick={() => configureCompany(company.name)}
                          >
                            Configure
                          </button>
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start transition-colors"
                            onClick={() => removeCompany(company.name)}
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              </div>
            );
          })}
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

// const companies = [
//   {
//     name: 'Tech Innovators Inc.',
//     description: 'A team of innovators in tech',
//     members: [
//       { fullName: 'Alice Johnson', role: 'Owner', email: 'alice@techinnovators.com' },
//       { fullName: 'Bob Smith', role: 'Admin', email: 'bob@techinnovators.com' },
//       {
//         fullName: 'Charlie Davis',
//         role: 'Collaborator',
//         email: 'charlie@techinnovators.com',
//       },
//     ],
//   },
//   {
//     name: 'Green Solutions Ltd.',
//     description: 'Solutions that are colored in shades of green',
//     members: [
//       { fullName: 'Anita Rawson', role: 'Owner', email: 'anita_d@greensolutions.com' },
//       {
//         fullName: 'Edward Brown',
//         role: 'Collaborator',
//         email: 'edward@greensolutions.com',
//       },
//       { fullName: 'Fiona Clark', role: 'Admin', email: 'fiona@greensolutions.com' },
//       {
//         fullName: 'George White',
//         role: 'Collaborator',
//         email: 'george@greensolutions.com',
//       },
//     ],
//   },
//   {
//     name: 'Future Dynamics Corp.',
//     description: 'Currently static, will be dynamic in the future',
//     members: [
//       { fullName: 'Hannah Martin', role: 'Owner', email: 'hannah@futuredynamics.com' },
//       { fullName: 'Ian Thompson', role: 'Admin', email: 'ian@futuredynamics.com' },
//       {
//         fullName: 'Julia Wilson',
//         role: 'Collaborator',
//         email: 'julia@futuredynamics.com',
//       },
//       { fullName: 'Kyle Moore', role: 'Collaborator', email: 'kyle@futuredynamics.com' },
//       {
//         fullName: 'Laura Taylor',
//         role: 'Collaborator',
//         email: 'laura@futuredynamics.com',
//       },
//     ],
//   },
//   {
//     name: 'Rubbers Virginia Ltd.',
//     description: 'Self explanatory... I think',
//     members: [
//       { fullName: 'Jacob Dell', role: 'Owner', email: 'hannah@futuredynamics.com' },
//       { fullName: 'Ian Thompson', role: 'Admin', email: 'ian@futuredynamics.com' },
//     ],
//   },
// ];
