import React, { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import headspaceLogo from '../images/headspace_dot.png'
import useDarkMode from '../hooks/useDarkMode.js'
import WalletProfile from './WalletProfile'
import { useTranslation } from 'react-i18next'
import { WalletContext } from '../context/WalletContext'
import { FaGithub, FaBook, FaDumbbell, FaUsers } from 'react-icons/fa'
import {
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdMenu,
  MdClose,
} from 'react-icons/md'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [colorTheme, setColorTheme] = useDarkMode()
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const { walletAddress } = useContext(WalletContext)
  const location = useLocation()

  // Handle language change
  function handleLanguageChange(event) {
    i18n.changeLanguage(event.target.value)
  }

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white dark:bg-gray-900 shadow-md'
            : 'bg-white dark:bg-gray-900'
        }`}>
        <div className='w-full flex items-center justify-between h-16'>
          {/* Logo and brand name */}
          <div className='flex items-center pl-4 sm:pl-6 lg:pl-8'>
            <Link
              to='/'
              className='flex items-center gap-3'>
              <img
                src={headspaceLogo}
                alt='MindChain Logo'
                className='h-10 w-10'
              />
              <span className='font-bold text-2xl text-gray-900 dark:text-white'>
                Mind<span className='text-blue-600'>Chain</span>
              </span>
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className='hidden lg:flex items-center justify-center'>
            {/* Workshops link */}
            <Link
              to='/workshop'
              className='flex items-center px-4 py-2 rounded-md text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
              <FaBook
                className='mr-2'
                size={18}
              />
              <span>{t('Navbar.Meditation')}</span>
            </Link>

            {/* Activities tab */}
            <Link
              to='/activities'
              className='flex items-center px-4 py-2 rounded-md text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
              <FaDumbbell
                className='mr-2'
                size={18}
              />
              <span>Activities</span>
            </Link>

            {/* About Us tab */}
            <Link
              to='/about'
              className='flex items-center px-4 py-2 rounded-md text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
              <FaUsers
                className='mr-2'
                size={18}
              />
              <span>About Us</span>
            </Link>
          </div>

          {/* Right side elements */}
          <div className='flex items-center pr-4 sm:pr-6 lg:pr-8'>
            {/* Theme toggle button */}
            <button
              onClick={() => setColorTheme(colorTheme)}
              className='p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              aria-label={
                colorTheme === 'light'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'
              }>
              {colorTheme === 'light' ? (
                <MdOutlineLightMode size={24} />
              ) : (
                <MdOutlineDarkMode size={24} />
              )}
            </button>

            {/* Language Selector */}
            <div className='hidden md:block ml-3'>
              <select
                onChange={handleLanguageChange}
                className='outline-none appearance-none py-2 px-3 text-white bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 border-transparent text-base rounded-md cursor-pointer transition-colors font-medium'>
                <option value='en'>{t('Footer.SelectLanguage.en')}</option>
                <option value='it'>{t('Footer.SelectLanguage.it')}</option>
              </select>
            </div>

            {/* Wallet Profile */}
            <div className='ml-3'>
              <WalletProfile />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='lg:hidden p-2 ml-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              aria-label='Toggle menu'>
              {isMenuOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className='lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg'>
            <div className='w-full px-4 py-4'>
              <ul className='space-y-3'>
                <li>
                  <Link
                    to='/workshop'
                    className='flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-lg font-medium'
                    onClick={() => setIsMenuOpen(false)}>
                    <FaBook
                      className='mr-3'
                      size={18}
                    />
                    <span>{t('Navbar.Meditation')}</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to='/activities'
                    className='flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-lg font-medium'
                    onClick={() => setIsMenuOpen(false)}>
                    <FaDumbbell
                      className='mr-3'
                      size={18}
                    />
                    <span>Activities</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to='/about'
                    className='flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-lg font-medium'
                    onClick={() => setIsMenuOpen(false)}>
                    <FaUsers
                      className='mr-3'
                      size={18}
                    />
                    <span>About Us</span>
                  </Link>
                </li>

                <li>
                  <a
                    href='https://github.com/aditya-gg04/MindChain'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-lg font-medium'>
                    <FaGithub
                      className='mr-3'
                      size={18}
                    />
                    <span>GitHub</span>
                  </a>
                </li>

                <li className='md:hidden'>
                  <div className='px-4 py-3 flex items-center'>
                    <label
                      htmlFor='mobile-language-selector'
                      className='mr-3 text-gray-700 dark:text-gray-200 text-lg font-medium'>
                      Language:
                    </label>
                    <select
                      id='mobile-language-selector'
                      onChange={handleLanguageChange}
                      className='outline-none appearance-none py-2 px-3 text-white bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 border-transparent text-base rounded-md cursor-pointer transition-colors'>
                      <option value='en'>
                        {t('Footer.SelectLanguage.en')}
                      </option>
                      <option value='it'>
                        {t('Footer.SelectLanguage.it')}
                      </option>
                    </select>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer div to prevent content from going under the fixed navbar */}
      <div className='h-16'></div>
    </>
  )
}

export default Navbar
