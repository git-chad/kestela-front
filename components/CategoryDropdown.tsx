import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';

interface CategoryDropdownProps {
  currentCategory: string;
  categoryOptions: string[];
  onCategoryChange: (newCategory: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  currentCategory,
  categoryOptions,
  onCategoryChange,
}) => {
  const [open, setOpen] = useState(false);

  const truncateString = (str: string, num: number) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex justify-between rounded-md px-4 py-2 h-[42px] max-h-[42px] min-w-full w-[172px] text-gray-700 hover:bg-gray-50 border border-gray-100"
          onClick={() => setOpen(!open)}
        >
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap sm:text-sm text-xs">
            {truncateString(currentCategory, 12)}
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {categoryOptions.map((category) => (
              <Menu.Item key={category}>
                {({ active }) => (
                  <button
                    onClick={() => onCategoryChange(category)}
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center rounded-md px-4 py-2 sm:text-sm text-xs hover:bg-indigo-100 transition-colors active:bg-indigo-300`}
                  >
                    {category}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CategoryDropdown;
