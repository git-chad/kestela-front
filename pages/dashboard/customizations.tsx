import CategoryDropdown from '@/components/CategoryDropdown';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Toggle from '@/components/Toggle';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Customizations = () => {
  const [currentCategory, setCurrentCategory] = useState('All Templates');
  const [filteredTemplates, setFilteredTemplates] = useState(plAccounts);

  const categoryOptions = useMemo(() => {
    const allCategories = plAccounts.map((plAccount) => plAccount.mapping);
    return ['All Templates', ...Array.from(new Set(allCategories))];
  }, [plAccounts]);

  const handleCategoryChange = (newCategory: string) => {
    setCurrentCategory(newCategory);

    // Filter templates based on the selected category
    const updatedFilteredTemplates =
      newCategory === 'All Templates'
        ? plAccounts
        : plAccounts.filter((template) => template.mapping === newCategory);

    setFilteredTemplates(updatedFilteredTemplates);
  };

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
      <h1 className="text-5xl font-medium">Customizations</h1>
      <h2 className="text-2xl mb-16">mappings and stuff</h2>

      <div className="w-full flex flex-col sm:flex-row items-center mb-8">
        <div className="flex justify-between w-screen sm:w-3/4">
          <div className="sm:max-w-xs w-full pr-4">
            <label htmlFor="search" className="sr-only">
              Search template
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md bg-white py-2 pl-10 pr-3 max-h-12 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-gray-100"
                placeholder="Search"
                type="search"
                onChange={() => {}}
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
        <div className='mt-4 sm:mt-0 flex flex-row justify-end w-full'>
          {currentCategory !== 'All Templates' && (
            <button className="bg-[#333] py-2 px-8 rounded-md text-sm sm:text-base text-white">remove</button>
          )}
          <button className="bg-[#5064FF] py-2 px-8 rounded-md text-sm sm:text-base text-white sm:ml-8 ml-4">
            save
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              P&L accounts
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              type
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              include
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0 hidden sm:block">
              <span>name</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {filteredTemplates.map((template) => (
            <motion.tr
              key={template.id}
              variants={rowVariants}
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
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {template.type}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 max-w-[60ch]">
                {template.include}
                <Toggle />
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 hidden sm:block">
                <input
                  type="text"
                  placeholder="name"
                  className="block rounded-md bg-white py-2 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6 border-gray-100"
                />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customizations;

const rowVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const plAccounts = [
  {
    id: 1,
    mapping: 'p&l mapping',
    type: 'Revenue',
    include: true,
    name: 'Product Sales',
  },
  {
    id: 2,
    mapping: 'mapping-2',
    type: 'Revenue',
    include: true,
    name: 'Service Income',
  },
  {
    id: 3,
    mapping: 'my-map-kestela',
    type: 'Expense',
    include: true,
    name: 'Salaries and Wages',
  },
  {
    id: 4,
    mapping: 'expenses-custom',
    type: 'Expense',
    include: false,
    name: 'Rent',
  },
  {
    id: 5,
    mapping: 'My Map',
    type: 'Expense',
    include: true,
    name: 'Utilities',
  },
  {
    id: 6,
    mapping: 'My Map (1)',
    type: 'Expense',
    include: true,
    name: 'Office Supplies',
  },
  {
    id: 7,
    mapping: 'Hello World',
    type: 'Expense',
    include: true,
    name: 'Travel',
  },
  {
    id: 8,
    mapping: 'slmc',
    type: 'Expense',
    include: false,
    name: 'Advertising',
  },
  {
    id: 9,
    mapping: 'el-toto-map',
    type: 'Expense',
    include: true,
    name: 'Insurance',
  },
];
