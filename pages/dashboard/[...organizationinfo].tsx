import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, EnvelopeIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import RoleDropdown from '@/components/RoleDropdown';
import OrganizationsDropdownSelector from '@/components/OrganizationsDropdownSelector';
import { fetchOrganizationInfo } from '../api/organizations/orgInfo';
import Invites from '@/components/Invites';

type Member = {
  id: string;
  email: string;
  role: string;
};

type Organization = {
  id: string;
  name: string;
  members: Member[];
};

const OrganizationInfo = () => {
  const router = useRouter();

  const [organization, setOrganization] = useState<Organization | null>(null);
  const roleOptions = ['Owner', 'Admin', 'Collaborator', 'Viewer'];

  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [memberRoles, setMemberRoles] = useState<Record<string, string>>({});
  const [orgSelector, setOrgSelector] = useState(false);

  useEffect(() => {
    console.log('Organization state updated:', organization);
  }, [organization]);
  

  useEffect(() => {
    if (!router.isReady) return;

    const pathSegments = router.asPath.split('/');
    const id = pathSegments[pathSegments.length - 1];

    const fetchOrgInfo = async () => {
      console.log(`Fetching organization info for ID: ${id}`);
      if (id) {
        try {
          const fetchedOrg = await fetchOrganizationInfo({ id });
          console.log('Fetched organization', fetchedOrg);

          setOrganization(fetchedOrg);
        } catch (error) {
          console.error('Failed to load organization:', error);
        }
      }
    };

    fetchOrgInfo();
  }, [router.isReady]);

  // useEffect(() => {
  //   if (companyData) {
  //     const initialRoles = companyData.members.reduce((acc, member) => {
  //       acc[member.email] = member.role;
  //       return acc;
  //     }, {} as Record<string, string>);
  //     setMemberRoles(initialRoles);
  //   }
  // }, [companyData]);

  const handleRoleChange = (email: string, newRole: string) => {
    setMemberRoles((prev) => ({ ...prev, [email]: newRole }));
    setEditMode((prev) => ({ ...prev, [email]: false }));
  };

  const toggleSelector = () => {
    setOrgSelector(!orgSelector);
  };

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="flex items-center">
        <h1 className="sm:text-5xl text-3xl font-medium">{organization?.name}</h1>
        <button
          className={`sm:relative ${!orgSelector ? '' : ''}`}
          onClick={toggleSelector}
        >
          <ChevronUpDownIcon className="w-14 text-[#5865FF] hover:text-[#5866ffc9] transition-all" />
            <div className={`${orgSelector ? '' : 'opacity-0 pointer-events-none'}`}><OrganizationsDropdownSelector currentCompany={organization?.name} /></div>
        </button>
      </div>
      <h2 className="sm:text-2xl text-xl">Company description would go here</h2>
      {/* <h2 className="sm:text-2xl text-xl">{companyData?.companyDescription}</h2> */}
      {/* <a
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
      </a> */}

      <AnimatePresence>
        {organization && (
          <div className="flex flex-col justify-center">
            {organization.members.map((member, index) => (
              <motion.div
                key={`${member.email}-${organization.name}`} // Adjusted to use organization.name
                className="flex sm:w-[40%] w-[80%] justify-between mt-6 relative"
                variants={memberVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.77, 0, 0.18, 1],
                }}
              >
                <p className="text-gray-500">{member.email}</p>

                {editMode[member.email] ? (
                  <RoleDropdown
                    currentRole={memberRoles[member.email]}
                    roleOptions={roleOptions}
                    onRoleChange={(newRole) => handleRoleChange(member.email, newRole)}
                  />
                ) : (
                  <p className="text-[#5865FF]">
                    {memberRoles[member.email] || member.role}
                  </p>
                  // If memberRoles has been set, use it, otherwise fall back to member.role
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
            <Invites />
          </div>
        )}
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
