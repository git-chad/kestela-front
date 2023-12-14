import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';

interface RoleDropdownProps {
  currentRole: string;
  roleOptions: string[];
  onRoleChange: (newRole: string) => void;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({ currentRole, roleOptions, onRoleChange }) => {
    const [open, setOpen] = useState(false);

  return (
    <Menu as="div" className="absolute right-0 inline-block text-left w-24 z-50">
      <div>
        <Menu.Button 
        className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        onClick={() => setOpen(!open)}
        >
          {currentRole}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {roleOptions.map((role) => (
              <Menu.Item key={role}>
                {({ active }) => (
                  <button
                    onClick={() => onRoleChange(role)}
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                  >
                    {role}
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

export default RoleDropdown;
