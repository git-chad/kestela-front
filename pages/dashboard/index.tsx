import { PopupButton } from '@typeform/embed-react';
import { useEffect, useRef } from 'react'

export default function Dashboard() {
  const ref = useRef() as any;

  useEffect(() => {
    ref.current?.open()
  }, [])

  return (
    <>
      <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2>Description or summary of news and events</h2>
        </div>
      </div>
      <PopupButton id={'kVnkrHW8'} ref={ref}>
        <span></span>
      </PopupButton>
    </>
  )
}