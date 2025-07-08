import { LoaderPinwheelIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <LoaderPinwheelIcon className=' size-13 text-primary animate-ping'/>
    </div>
  )
}

export default PageLoader;