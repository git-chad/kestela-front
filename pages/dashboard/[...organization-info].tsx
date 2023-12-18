import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, EnvelopeIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import RoleDropdown from '@/components/RoleDropdown';
import OrganizationsDropdownSelector from '@/components/OrganizationsDropdownSelector';
import Invites from '@/components/Invites';

const OrganizationInfo = () => {
  const router = useRouter();
  const { 'organization-info': organizationInfo } = router.query;
  const companyName = organizationInfo?.[1];

  const companyData = companies.find((company) => company.companyName === companyName);

  const roleOptions = ['Owner', 'Admin', 'Collaborator', 'Viewer'];

  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [memberRoles, setMemberRoles] = useState<Record<string, string>>({});
  const [orgSelector, setOrgSelector] = useState(false)

  useEffect(() => {
    if (companyData) {
      const initialRoles = companyData.members.reduce((acc, member) => {
        acc[member.email] = member.role;
        return acc;
      }, {} as Record<string, string>);
      setMemberRoles(initialRoles);
    }
  }, [companyData]);

  const handleRoleChange = (email: string, newRole: string) => {
    setMemberRoles((prev) => ({ ...prev, [email]: newRole }));
    setEditMode((prev) => ({ ...prev, [email]: false })); 
  };
  
  const toggleSelector = () => {
    setOrgSelector(!orgSelector)
  }

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className='flex items-center'>
        <h1 className="text-5xl font-medium">{companyName}</h1>
        <button className={`relative ${!orgSelector ? '' : ''}`} onClick={toggleSelector}>
          <ChevronUpDownIcon className='w-14 text-[#5865FF] hover:text-[#5866ffc9] transition-all'/>
          {orgSelector ? <OrganizationsDropdownSelector companies={companies} currentCompany={companyName}/> : ''}
        </button>
      </div>
      <h2 className="text-2xl">{companyData?.companyDescription}</h2>
      <a
        href={
          companyData?.companyWebsite.startsWith('http')
            ? companyData?.companyWebsite
            : `https://${companyData?.companyWebsite}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="mb-16 py-2 text-[#5865FF] hover:text-[#19B8FF] transition-colors"
      >
        {companyData?.companyWebsite}
      </a>

      <AnimatePresence>
        <div>
          {companyData?.members.map((member, index) => (
            <motion.div
            key={`${member.email}-${companyName}`}
              className="flex w-[40%] justify-between mt-6 relative"
              variants={memberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.77, 0, 0.18, 1] }}
            >
              <p className="text-gray-500">{member.fullName}</p>

              {editMode[member.email] ? (
                <RoleDropdown
                  currentRole={memberRoles[member.email]}
                  roleOptions={roleOptions}
                  onRoleChange={(newRole) => handleRoleChange(member.email, newRole)}
                />
              ) : (
                <p className="text-[#5865FF]">{memberRoles[member.email]}</p>
              )}
              <div className="absolute top-0 -right-20 space-x-5 flex">
                <button
                  className="w-5"
                  onClick={() =>
                    setEditMode((prev) => ({
                      ...prev,
                      [member.email]: !prev[member.email],
                    }))
                  }
                >
                  <PencilIcon />
                </button>
                <a className="w-5" href={`mailto:${member.email}`}>
                  <EnvelopeIcon />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <Invites/>
      </AnimatePresence>
    </div>
  );
};

export default OrganizationInfo;

const memberVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const companies = [
  {
    companyName: 'Tech Innovators Inc.',
    companyDescription: 'A team of innovators in tech',
    companyWebsite: 'www.techinnovators.uk',
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
    companyWebsite: 'www.greensolutions.com',
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
    companyWebsite: 'www.futuredynamics.com',
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
    companyWebsite: 'www.rubbers-va.com',
    members: [
      { fullName: 'Jacob Dell', role: 'Owner', email: 'hannah@futuredynamics.com' },
      { fullName: 'Ian Thompson', role: 'Admin', email: 'ian@futuredynamics.com' },
    ],
  },
];
