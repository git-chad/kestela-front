import { PopupButton } from '@typeform/embed-react';
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react';
import SimpleSelect from "@/components/SimpleSelect"
import logoDiscord from '@/images/logos/discord.svg'
import logoG2 from '@/images/logos/g2.svg'
import googlePlay from '@/images/logos/google_play-icon.svg'
import logoLinkTree from '@/images/logos/linktree-logo.svg'
import {
  ClockIcon,
  QuestionMarkCircleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowSmallRightIcon,
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const { data } = useSession() as any;
  const ref = useRef() as any;

  useEffect(() => {
    ref.current?.open()
  }, [])

  return (
    <>
      <div className="w-full px-6 lg:px-8">
        <div>
          <div>
            <h2 className='pb-4'>Hello,{data?.user.name} <span>&#128075;</span> </h2>
            <p className='text-xs'>Below you will find useful informations about the usages of your current plan.</p>
          </div>
          <div className="max-w-7xl pb-4 py-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              
              {/* Video */}
              <div className="shadow-sm ring-gray-900/5 h-full sm:mx-0 sm:rounded-lg sm:p-6 bg-white  lg:col-span-2 lg:row-span-2">
                <div className="flex w-full justify-between">
                  <iframe className="w-10/12 sm:rounded" src="https://www.youtube.com/embed/ot3k3k_FTgU"></iframe>
                  <div className="pl-4 w-4/12 ">
                    <h4 className="inline text-sm mb-12">Welcome to KESTELA <span>&#129489;&#127995;&#8205;&#128187;</span></h4>
                    <div className="border-b border-gray-900/5 text-xs pt-2 mb-2"></div>
                    <p className='text-xs'><b>Watch this short video</b> to quicly guide you with your first steps into KESTELA</p>
                    <br></br>
                    <p className='text-xs'>Learn more about. Personal workspace and all the tools you hace at your diposal. </p>
                    <p className='text-xs'>Refer to our Knowledgebase to dive deeper into automations, integrations and other great things you can do with KESTELA.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-start-3 p-6 h-full sm:px-6 lg:px-6 bg-white shadow-sm ring-gray-900/5 sm:mx-0 sm:rounded-lg">
                {/* Activity feed */}
                <h2 className="text-sm leading-6 text-gray-900">Quick starters <span>&#128218;</span></h2>
                <div className="border-b border-gray-900/5 text-xs pt-2 mb-2"></div>
                <p className='text-xs pt-2 pb-2 font-semibold'>Get a jumpstart with:</p>
                <div className='flex items-center text-xs pt-2 pb-2'>< ArrowSmallRightIcon className="h-4 text-slate-400 mr-2"/> FAQ link</div>
                <div className='flex items-center text-xs pt-2 pb-2'><ArrowSmallRightIcon className="h-4 text-slate-400 mr-2"/> Set up your workspace</div>
                <div className='flex items-center text-xs pt-2 pb-2'><ArrowSmallRightIcon className="h-4 text-slate-400 mr-2"/>Process Designer basics</div>
                <div className='flex items-center text-xs pt-2 pb-2'><ArrowSmallRightIcon className="h-4 text-slate-400 mr-2"/>See our Demos for inspiration</div>
                <div className="border-b border-gray-900/5 text-xs pt-2 mb-2"></div>
               
                <a href='#' className='flex items-center'>
                <QuestionMarkCircleIcon  className="h-4 text-blue-500" />
                <span className="ml-2 mr-2 text-xs pt-1 pb-1 text-blue-700"> Find more in knowledgebase</span>
                <ArrowTopRightOnSquareIcon className="h-4 text-slate-500"  />
                </a>
      
                <a  href='#' className='flex items-center'>
                <Image src={logoLinkTree} alt="Discord" unoptimized width={12}/>
                <span className="ml-2 mr-2 text-xs pt-1 pb-1 text-blue-700"> Useful links on linktree</span>
                <ArrowTopRightOnSquareIcon className="h-4 text-slate-500"  />
                </a>

              </div>
            </div>
          </div>
          <div className="max-w-7xl pb-4 py-2">
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div className="shadow-sm ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:p-6 bg-white  lg:col-span-2 lg:row-span-2">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <h2 className="text-sm leading-6 text-gray-900 mr-4">Plan Details</h2>
                      <span className='text-xs text-blue-700 font-semibold'><a href='#'>Your SaaS Agreement</a></span>
                    </div>
                    <div className="flex items-center">
                      <span className='text-xs text-blue-700 font-semibold ml-4'><a href='#'>Request Upgrade</a></span>
                    </div>
                  </div>
                    <div className='flex items-center'>
                      <div className='flex flex-col text-xs w-6/12'>
                        <span className="text-gray-500">Plan</span>
                        <span>Individual</span>
                      </div>
                      <div className='flex flex-col text-xs w-6/12'>
                        <span className="text-gray-500">Monthly execution time</span>
                        <span>1 hour</span>
                      </div>
                    </div>
                    <div className='border rounded p-4 border-gray-900/5 mt-4'>
                      <p className='text-[12px] font-medium'>Plan Usage</p>
                      <span className="text-[10px] text-gray-500">Execution time resets on May 1, 2023</span>
                      <p className='text-[12px] pt-4'>Execution time (hours)</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-5">
                    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-900/5 bg-white px-3 py-2 shadow-sm">
                        <div className="flex-shrink-0  bg-cyan-50 rounded-lg p-1">
                          <ClockIcon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <a href="#" className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900">00.00 Seconds</p>
                            <p className="text-[10px] truncate text-sm text-gray-500">Average Platform action execution time</p>
                          </a>
                        </div>
                      </div>
                      <div className="relative flex items-center space-x-3 rounded-lg border border-gray-900/5  bg-white px-3 py-2 shadow-sm">
                        <div className="flex-shrink-0 bg-slate-100 rounded-lg p-1">
                          <ClockIcon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <a href="#" className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900">00.00 Seconds</p>
                            <p className="text-[10px] truncate text-sm text-gray-500">Average Platform action execution time</p>
                          </a>
                        </div>
                      </div>
                    </div>
                </div>
              </div>

              <div className="lg:col-start-3 p-6 h-full sm:px-6 lg:px-6 bg-white shadow-sm ring-gray-900/5 sm:mx-0 sm:rounded-lg">
                {/* Activity feed */}
                <h2 className="text-sm leading-6 text-gray-900 mb-3">Help us spread the word! <span>&#127942;</span></h2>
                <div className="flex">
                  <Image src={logoDiscord} alt="Discord" unoptimized width={20}/>
                  <p className='ml-2 text-xs pt-4 pb-4'>Join our <a href='#' className='text-blue-700 underline'> Discord Community</a></p>
                </div>
                <div className="flex">
                <Image src={googlePlay} alt="Discord" unoptimized width={18} height={13}/>
                  <p className='ml-2 text-xs pt-4 pb-4'>Review us on <a className='text-blue-700 underline'>Capterra</a> and earn $10 <span>&#128176;</span> </p>
                </div>
                <div className="flex">
                  <Image src={logoG2} alt="Discord" unoptimized width={16}/>
                  <p className='ml-2 text-xs pt-4 pb-4'>Revuew us on <a className='text-blue-700 underline'>G2</a></p>
                </div>
                <div className="border-b border-gray-900/5 text-xs pt-2 mb-2"></div>
                <h2 className="text-sm leading-6 text-gray-900 mt-5 font-medium">Refer KESTELA to a friend</h2>
                <form className="pt-4 sm:flex lg:mt-0">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 appearance-none rounded bg-gray-100 border-0 px-3 py-1.5 text-base text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Add email addresses"
                />
                <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded px-3 py-2 text-[12px] bg-sky-100 font-semibold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Send
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopupButton id={'kVnkrHW8'} ref={ref}>
        <span></span>
      </PopupButton>
    </>
  );
}