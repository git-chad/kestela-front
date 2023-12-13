import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const OrganizationInfo = () => {
  const router = useRouter();
  const { 'organization-info': organizationInfo } = router.query;
  const companyName = organizationInfo?.[1];

  const companyData = companies.find((company) => company.companyName === companyName);

  const roleOptions = ['Owner', 'Admin', 'Collaborator', 'Viewer'];

  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [memberRoles, setMemberRoles] = useState<Record<string, string>>({});

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
  };

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
      <h1 className="text-5xl font-medium">{companyName}</h1>
      <h2 className="text-2xl mb-16">{companyData?.companyDescription}</h2>
      <AnimatePresence>
        <div>
          {companyData?.members.map((member, index) => (
            <motion.div
              key={member.email}
              className="flex w-[40%] justify-between mt-6 relative"
              variants={memberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.77, 0, 0.18, 1] }}
            >
              <p className="text-gray-500">{member.fullName}</p>

              {editMode[member.email] ? (
                <select
                  value={memberRoles[member.email]}
                  onChange={(e) => handleRoleChange(member.email, e.target.value)}
                  onBlur={() =>
                    setEditMode((prev) => ({ ...prev, [member.email]: false }))
                  }
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              ) : (
                <p className='text-[#5865FF]'>{memberRoles[member.email]}</p>
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
