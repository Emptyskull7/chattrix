import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useThemeStore } from '../store/useThemeStore'

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div className='min-h-screen w-full flex items-center justify-center' data-theme = {theme}>
        <LoaderIcon className=' w-14 h-14 size-15 text-primary animate-spin'/>
    </div>
  )
}

export default PageLoader;