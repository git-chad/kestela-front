import Image from 'next/image'
import backgroundImage from '@/images/kestela-background-login.jpg'

export function AuthLayout({ children }: any) {
  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill" // Corrected from 'fill' to 'layout="fill"'
        objectFit="cover"
        quality={100}
        unoptimized
      />
      {/* Overlay content with glass effect */}
      <div className='absolute top-0 left-0 flex justify-center items-center w-full min-h-screen'>
        <div className="relative z-30 flex flex-col py-10 px-4 shadow-2xl bg-white/80 backdrop-blur-md rounded-xl h-[600px] w-[500px]">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0 h-full flex flex-col justify-center space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
