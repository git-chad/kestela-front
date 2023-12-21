import React from 'react';
import CategoryDropdown from './CategoryDropdown';

type CopyModalProps = {
  name: string;
  setCopyModalInfo: any;
};

const CopyModal: React.FC<CopyModalProps> = ({ name, setCopyModalInfo }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center">
      <div className="w-[20vw] bg-white rounded-xl flex justify-center items-center self-center shadow-xl p-8">
        <div className="flex flex-col">
          <h1 className="text-xl mb-8">
            Make a copy of <b className="text-[#5064FF]">{name}</b> for:
          </h1>
          <div className=" max-w-lg justify-end flex space-x-2">
            <CategoryDropdown
              categoryOptions={[
                'Tech Innovators Inc.',
                'Green Solutions Ltd.',
                'Future Dynamics Corp.',
                'Rubbers Virginia Ltd.',
              ]}
              currentCategory="Select an organization"
              onCategoryChange={() => {
                console.log('company changed');
              }}
            />
            <button
              onClick={setCopyModalInfo}
              className="bg-[#5865FF] text-white text-sm w-[100px] px-4 py-1.5 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={setCopyModalInfo}
              className="bg-[#333] text-white text-sm w-[100px] px-4 py-1.5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyModal;
