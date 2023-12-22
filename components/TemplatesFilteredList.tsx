import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CategoryDropdown from './CategoryDropdown';
import IFrames from './IFrames';
import CopyModal from './CopyModal';

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  // preview: React.ComponentType;
}

const TemplatesFilteredList: React.FC<{ templates: Template[] }> = ({ templates }) => {
  const [currentCategory, setCurrentCategory] = useState('All Categories');
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copyModalInfo, setCopyModalInfo] = useState<{ visible: boolean; name: string }>({
    visible: false,
    name: '',
  });

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const toggleCopyModal = (name: string) => {
    setCopyModalInfo((prevInfo) => ({
      visible: !prevInfo.visible,
      name: prevInfo.visible ? '' : name,
    }));
  };

  const categoryOptions = useMemo(() => {
    const allCategories = templates.map((template) => template.category);
    return ['All Categories', ...Array.from(new Set(allCategories))];
  }, [templates]);

  const handleCategoryChange = (newCategory: string) => {
    setCurrentCategory(newCategory);

    // Filter templates based on the selected category
    const updatedFilteredTemplates =
      newCategory === 'All Categories'
        ? templates
        : templates.filter((template) => template.category === newCategory);

    setFilteredTemplates(updatedFilteredTemplates);
  };

  useEffect(() => {
    const updatedFilteredTemplates = templates.filter((template) => {
      return (
        (currentCategory === 'All Categories' || template.category === currentCategory) &&
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setFilteredTemplates(updatedFilteredTemplates);
  }, [currentCategory, searchQuery, templates]);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="relative flex items-center space-x-4">
        <div className="w-full sm:max-w-xs">
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
              className="block w-full rounded-md bg-white py-2 pl-10 pr-3 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-gray-100"
              placeholder="Search"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              autoComplete="off"
            />
          </div>
        </div>

        <CategoryDropdown
          currentCategory={currentCategory}
          categoryOptions={categoryOptions}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto"></div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Template
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:block"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:block"
                  >
                    Description
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTemplates.map((template) => (
                  <motion.tr
                    key={template.id}
                    variants={overlayVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      duration: 0.5,
                      delay: template.id * 0.015,
                    }}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {template.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:block">
                      {template.category}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 max-w-[60ch] hidden sm:block">
                      {template.description}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-[#5064FF] hover:text-indigo-900"
                        onClick={togglePreview}
                      >
                        Preview
                      </button>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-[#5064FF] hover:text-indigo-900"
                        onClick={() => toggleCopyModal(template.name)}
                      >
                        Copy
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showPreview && (
          <motion.div
            key="iframe"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            <IFrames toggle={togglePreview} />
          </motion.div>
        )}
        {copyModalInfo.visible && (
          <motion.div
            key="copyModal"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            <CopyModal name={copyModalInfo.name} setCopyModalInfo={setCopyModalInfo} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplatesFilteredList;

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const transition = {
  duration: 0.5,
  ease: [0.77, 0, 0.18, 1],
};
