export function Spinner() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-100 opacity-75 flex flex-col items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-gray-100 text-[#5064FF]  align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
      {/* <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div> */}
      <h2 className="text-center text-[#333] text-xs sm:text-base font-semibold my-4 animate-pulse">Loading...</h2>
      {/* <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p> */}
      
    </div>
  )
}