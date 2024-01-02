import React from 'react';
import Spline from '@splinetool/react-spline';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '700', '300', '900', '200', '400'],
});

const PrimaryFeatures2 = () => {
  return (
    <div className="bg-white w-full h-screen flex flex-col justify-center items-center">
      <h1 className="z-10 font-display text-3xl font-medium tracking-tight text-[#333] 2xl:text-5xl mb-16">
        Investor approved templates synced to your data.
      </h1>

      <div className="z-10 bg-white bg-opacity-10 backdrop-blur-2xl rounded-4xl max-w-[80%] shadow-lg">
        <section className="grid grid-cols-4">
          {features.map((feature, index) => (
            <figure className="pt-12 px-4 flex flex-col" key={index}>
              <p className="text-zinc-500 2xl:text-xl">0{feature.num}</p>
              <h1 className={`${poppins.className} 2xl:text-3xl mb-12 h-16`}>{feature.title}</h1>
              <p className={`${poppins.className} 2xl:text-base pb-24 tracking-tight text-slate-800`}>
                {feature.description}
              </p>
            </figure>
          ))}
        </section>
      </div>

      <div className="absolute top-0 left-0 w-full opacity-80 blur-md">
        <Spline scene="https://prod.spline.design/wnML6gqXTL5MlCZP/scene.splinecode" />
      </div>
    </div>
  );
};

export default PrimaryFeatures2;

const features = [
  {
    num: 0o1,
    title: 'Select your data',
    description: 'Connect your data directly to your spreadsheet, no SQL required.',
    image: '',
  },
  {
    num: 0o2,
    title: 'Choose your template',
    description: 'From finance to revenue operations to marketing to board reporting.',
    image: '',
  },
  {
    num: 0o3,
    title: 'Publish to your spreadsheet',
    description: 'A simple Google Sheets add-on keeping you connected.',
    image: '',
  },
  {
    num: 0o4,
    title: 'Share with others',
    description:
      'Work the want you want in a spreasheet, share the final product with others.',
    image: '',
  },
];
