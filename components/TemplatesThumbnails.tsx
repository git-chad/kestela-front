import Image from 'next/image';
import React from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import driveIcon from '@/images/logos/drive-icon.svg';
import { motion } from 'framer-motion';

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  imageSrc: any;
  imageAlt: string;
}

const TemplatesThumbnails: React.FC<{ templates: Template[] }> = ({ templates }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <motion.div
            className="px-3 py-2 rounded-xl shadow bg-[#33333305]"
            key={template.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.5,
              delay: template.id * 0.025,
              ease: [0.77, 0, 0.18, 1],
            }}
          >
            <Image
              src={template.imageSrc}
              alt={template.imageAlt}
              width={500}
              height={500}
              className="rounded-md mt-2"
            />
            <h1 className="pt-4 font-medium">{template.name}</h1>
            <h2 className="text-xs mb-6">{template.category}</h2>
            <div className="flex justify-start space-x-4 py-2">
              <button className="w-[120px] bg-white text-sm flex justify-center px-4 py-1.5 rounded-lg border hover:bg-[#5064ff49] transition-colors">
                Preview
              </button>
              <button className="w-[155px] bg-[#333] text-white text-sm flex justify-between px-4 py-1.5 rounded-lg hover:bg-[#333333d0] transition-colors">
                <Image src={driveIcon} alt="google drive icon" className="w-5" />
                Make a copy
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesThumbnails;

const cardVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
