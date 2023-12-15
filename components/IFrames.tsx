import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline';

type IFramesProps = {
  toggle: () => void; // This assumes toggle is a function that takes no arguments
};

const IFrames: React.FC<IFramesProps> = ({ toggle }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className='w-[720px] h-[720px] p-8 bg-gray-100 rounded-l-xl rounded-br-xl shadow-2xl flex flex-col relative'>
      <button className='absolute w-12 -right-12 top-0' onClick={toggle}>
        <XMarkIcon className='text-[#5064ff] bg-gray-100 rounded-r-xl'/>
      </button>
        <iframe className='w-full h-full' src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTrG3Bfd8qaFVeXiK-ayhUWlAdx2132gwCwKtNYIScgdCLCM_5XkwFpOLfmUoJR58pVcE9TW3RFqH08/pubhtml?widget=true&amp;headers=false"></iframe>
      </div>
    </div>
  )
}

export default IFrames;
