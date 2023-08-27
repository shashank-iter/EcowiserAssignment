import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Overlay from './Overlay';
import Cards from './Cards';
import Pagination from './Pagination';
const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className='bg-black'>

    <div className="isolate  pb-6">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
             <h1 className='text-white text-3xl  font-extrabold'>Ecowiser Notes</h1>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Overlay/>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              <Overlay/> 
            </a>
          </div>
        </nav>
       
      </div>
      <main>
        
      </main>
    
    </div>
    <div className='pt-16 bg-black px-4 md:px-6 lg:px-10 pb-10'>
<Cards/>

    </div>
    </div>
  )
}
