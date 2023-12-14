import { useState } from 'react';
import { motion } from 'framer-motion';

interface OrgModalProps {
  onClose: () => void;
  onSave: (newCompany: {
    companyName: string;
    companyDescription: string;
    members: any[];
  }) => void;
  status: any;
}

const OrgModal: React.FC<OrgModalProps> = ({ onClose, onSave, status }) => {
  const [orgName, setOrgName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSave({ companyName: orgName, companyDescription: description, members: [] });
    onClose();
  };

  return (
    <motion.div
      variants={variants}
      animate={status ? 'open' : 'closed'}
      initial="closed"
      transition={{
        duration: 0.5,
        ease: [0.77, 0, 0.18, 1],
      }}
      className={`modal-background relative w-[500px] min-h-screen border-l border-gray-200 p-8 bg-white ${
        status ? '' : 'pointer-events-none'
      } overflow-hidden`}
    >
      <motion.div
        className={`modal-content flex flex-col border-b border-gray-200 py-4`}
        variants={contentVariants}
        animate={status ? 'open' : 'closed'}
        initial="closed"
        transition={{
          duration: 0.5,
          ease: [0.77, 0, 0.18, 1],
        }}
      >
        <h3 className="text-2xl mb-16">Add an organization</h3>

        <div className="m max-w-lg space-y-2 mb-16">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="description"
                id="org-description"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="..."
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="description"
                id="org-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="..."
              />
            </div>
          </div>

          <label
            htmlFor="company-website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company Website
          </label>
          <div className="mt-2 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
              https://
            </span>
            <input
              type="text"
              name="company-website"
              id="company-website"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="www.example.com"
            />
          </div>
        </div>

        <div className=" max-w-lg justify-end flex space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-[#5865FF] text-white text-sm w-[100px] py-1.5 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-[#333] text-white text-sm w-[100px] py-1.5 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrgModal;

const variants = {
  open: {
    x: 0,
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

const contentVariants = {
  open: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: '50%', // Content slides out to the right
    opacity: 0,
  },
};
