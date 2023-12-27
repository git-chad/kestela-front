import React from 'react';
import { Button } from './Button';
import { Poppins } from '@next/font/google';
import backgroundImage from '@/images/pnl-illustration.png';
import Image from 'next/image';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '700', '300', '900', '200', '400'],
});

const HeroBanner = () => {
  return (
    <div className="min-w-screen h-[50vh] flex flex-col items-center justify-center bg-[#f9f9f9]">
      <p
        className={`z-20 max-w-4xl font-display text-3xl font-medium tracking-tight text-[#333] sm:text-5xl text-center ${poppins.className}`}
      >
        Automate your data into the templates you love without losing the flexibility of
        spreadsheets.
      </p>
      <div className="z-20 mt-10 flex justify-center gap-x-6">
        <Button href="/register">Start for free (no cc required)</Button>
        <Button href="" variant="outline">
          <svg
            aria-hidden="true"
            className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
          >
            <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
          </svg>
          <span className="ml-3">See how it works</span>
        </Button>
      </div>
      {/* <Image src={backgroundImage} className='z-10 absolute -left-48'/> */}

      {/* <div className='absolute top-0 left-0 w-full blur-3xl opacity-60'>
        <Spline scene="https://prod.spline.design/wnML6gqXTL5MlCZP/scene.splinecode" />
      </div> */}
    </div>
  );
};

export default HeroBanner;
