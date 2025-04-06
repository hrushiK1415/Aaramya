import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
      <div className='container mx-auto py-6 px-8'>
        <div className='flex items-center justify-between'>
          {/* Logo on the left */}
          <div className='flex items-center'>
            <Link
              to='/'
              className='flex items-center gap-2'>
              <span className='font-bold text-xl text-gray-800 dark:text-white'>
                Mind
                <span className='text-blue-600 dark:text-blue-400'>Chain</span>
              </span>
            </Link>
          </div>

          {/* Copyright in the middle */}
          <p className='text-gray-600 dark:text-gray-400 text-sm font-medium hidden sm:block'>
            © {currentYear} MindChain. All rights reserved.
          </p>

          {/* Social Media Links on the right */}
          <div className='flex space-x-3'>
            <a
              href='https://github.com/aditya-gg04/MindChain'
              target='_blank'
              rel='noopener noreferrer'
              className='w-9 h-9 flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all duration-200'
              aria-label='GitHub'>
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Mobile copyright - visible only on small screens */}
        <div className='mt-3 text-center sm:hidden'>
          <p className='text-gray-600 dark:text-gray-400 text-xs'>
            © {currentYear} MindChain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
