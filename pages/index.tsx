import Head from 'next/head'
import Image from 'next/image'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'


// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] }) 

export default function Home() {
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
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        {/* <Testimonials />
        <Pricing />
        <Faqs /> */}
      </main>
      <Footer />
    </>
  )
}
