import { Switch } from '@headlessui/react'
import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  checked: boolean;
  onChange: (e: boolean ) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ToggleLabel({ title, description, checked, onChange }: Props) {
  return (
    <Switch.Group as="div" className="flex items-center w-full justify-between bg-white p-4 rounded-md">
      <div className="flex">
        <Image
          src="https://www.pngkey.com/png/full/129-1296317_quickbooks-logo-quickbooks-logo.png"
          width={50}
          height={40}
          className="mr-4"
          alt={''}
        />
        <span className="flex flex-grow flex-col">
          <Switch.Label as="span" className="text-sm font-medium text-gray-900" passive>
            {title}
          </Switch.Label>
          <Switch.Description as="span" className="text-sm text-gray-500">
            {description}
          </Switch.Description>
        </span>
      </div>
      <Switch
        checked={checked}
        onChange={onChange}
        className={classNames(
          checked ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            checked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </Switch.Group>
  )
}