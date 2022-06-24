import React from 'react'
import Link from 'next/link'

export default function Navbar() {
// set the target element that will be collapsed or expanded (eg. navbar menu)
const targetEl = document.getElementById('targetEl');

// optionally set a trigger element (eg. a button, hamburger icon)
const triggerEl = document.getElementById('triggerEl');

// optional options with default values and callback functions
const options = {
  triggerEl: triggerEl,
  onCollapse: () => {
      console.log('element has been collapsed')
  },
  onExpand: () => {
      console.log('element has been expanded')
  },
  onToggle: () => {
      console.log('element has been toggled')
  }
};


  return (
    <>
<nav className='bg-gray-800 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800'>
        <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <Link href="/">
  <a className='flex items-center'>
    {/* <img
    src="/docs/images/logo.svg"
    className="mr-3 h-6 sm:h-9"
    alt="Flowbite Logo"
  /> */}
    <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white text-white'>
     Big Art
    </span>
            </a>
            </Link>
  <button
    data-collapse-toggle='mobile-menu'
    type='button'
    className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
    aria-controls='mobile-menu'
    aria-expanded='true'
  >
    <span className='sr-only'>Open main menu</span>
    <svg
      className='w-6 h-6'
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
        clipRule='evenodd'
      />
    </svg>
    <svg
      className='hidden w-6 h-6'
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
        clipRule='evenodd'
      />
    </svg>
  </button>
  <div className='hidden w-full md:block md:w-auto' id='mobile-menu'>
    <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
      <li>
        <Link href="/">
          <a
          
            className='text-gray-300 hover:bg-gray-700 hover:text-white active:bg-gray-700 active:text-white px-3 py-2 rounded-md text-sm font-medium'
            aria-current='page'
          >
            Home
          </a>
        </Link>

      </li>
      <li>
        <Link href="/audition">
          <a className='text-gray-300 hover:bg-gray-700 hover:text-white  px-3 py-2 rounded-md text-sm font-medium'
          > Audition Form
          </a>
        </Link>
      </li>
      <li>
        <Link href="/contact">
          <a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
          > Contact
          </a>
        </Link>
      </li>

     
    </ul>
  </div>
</div>
</nav>

    </>

  )
}
