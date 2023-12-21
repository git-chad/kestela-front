import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline';

type IFramesProps = {
  toggle: () => void;
};

const IFrames: React.FC<IFramesProps> = ({ toggle }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center">
      <div className='w-[80vw] h-[80vh] p-8 bg-gray-100 rounded-l-xl rounded-br-xl shadow-xl flex flex-col relative'>
      <button className='absolute w-12 -right-12 top-0' onClick={toggle}>
        <XMarkIcon className='text-[#5064ff] bg-gray-100 rounded-r-xl'/>
      </button>
      <iframe className='h-full' src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQeb0jLUqx76LK5fLv6Lirb_QA0zBnAzkjH0mcNtRqoJlwx3nPMZlYkRyprzY8b95ImMJShaOq7RbU2/pubhtml?gid=937445175&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
      </div>
    </div>
  )
}

export default IFrames;
