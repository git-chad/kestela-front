import Head from 'next/head';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';

import { CallToAction } from '@/components/CallToAction';
import { Faqs } from '@/components/Faqs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Pricing } from '@/components/Pricing';
import {PrimaryFeatures} from '@/components/PrimaryFeatures'
import PrimaryFeatures2 from '@/components/PrimaryFeatures2';
import { SecondaryFeatures } from '@/components/SecondaryFeatures';
import { Testimonials } from '@/components/Testimonials';
import Hero3d from '@/components/Hero3d';
import HeroBanner from '@/components/HeroBanner';

export default function Home() {
  // smooth scroll, problematic with 3d models due to lag
  // useEffect(() => {
  //   const mainTag = document.querySelector("main");
  //   const bodyTag = document.querySelector("body");
  //   const figcaps = document.querySelectorAll("figcaption");

  //   mainTag.style.position = "fixed";
  //   mainTag.style.top = "0px";
  //   mainTag.style.left = "0px";
  //   mainTag.style.width = "100%";

  //   const obs = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.intersectionRatio > 0.25) {
  //           entry.target.classList.add("in-view");
  //           console.log("enters screen");
  //         }
  //       });
  //     },
  //     {
  //       threshold: [0, 0.25, 1],
  //     }
  //   );

  //   figcaps.forEach((caption) => {
  //     obs.observe(caption);
  //   });

  //   let currentScroll = 0;
  //   let aimScroll = 0;

  //   const changeScroll = () => {
  //     bodyTag.style.height = mainTag.offsetHeight + "px";
  //     mainTag.style.top = -1 * currentScroll + "px";

  //     currentScroll = currentScroll + (aimScroll - currentScroll) * 0.04;
  //     requestAnimationFrame(changeScroll);
  //   };

  //   window.addEventListener("scroll", () => {
  //     aimScroll = window.scrollY;
  //   });

  //   changeScroll();
  // }, [])

  return (
    <>
      <Head>
        <title>kestela Platform</title>
        <meta name="description" content="A product of Kestela group" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="sticky top-0">
          <Hero3d />
        </div>
        <div className="sticky top-0">
          <HeroBanner />
        </div>
        <div className='sticky top-0'>
          <PrimaryFeatures2 />
          <SecondaryFeatures />
          <CallToAction />
          <Testimonials />
          <Pricing />
          <Faqs />
        </div>
      </main>
      <Footer />
    </>
  );
}
