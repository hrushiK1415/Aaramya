import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaBook, FaDumbbell, FaYinYang, FaChartLine } from 'react-icons/fa'
import homepageIllustration from '../images/homepage-hero-guest/undraw_mindfulness_scgo.svg'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'>
      {/* Hero Section - Reduced height from 80vh to 70vh */}
      <section className='h-[65vh] flex items-center pt-0 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center'>
          {/* Left Column - Text Content */}
          <div className='w-full md:w-1/2 md:pr-8'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4'>
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600'>
                Mind
              </span>
              Chain
            </h1>
            <h2 className='text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4'>
              {t('HeroGuest.Title')}
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 mb-6'>
              {t('HeroGuest.Subtitle')}
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                to='/workshop'
                className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-md'>
                <FaYinYang size={18} />
                <span>Explore Meditation</span>
              </Link>
              <Link
                to='/activities'
                className='flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 font-medium shadow-md'>
                <FaDumbbell size={18} />
                <span>Try Activities</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className='w-full md:w-1/2 mt-6 md:mt-0 flex justify-center'>
            <img
              src={homepageIllustration}
              alt='Mindfulness Illustration'
              className='w-full max-w-md'
              style={{ animation: 'float 6s ease-in-out infinite' }}
            />
          </div>
        </div>
      </section>

        {/* CTA Section - Also moved up */}
      <section className='mb-8 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto'>
        <div className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between'>
          <div className='mb-4 md:mb-0 md:mr-6'>
            <h2 className='text-xl md:text-2xl font-bold text-white mb-2'>
              Ready to start your mindfulness journey?
            </h2>
            <p className='text-blue-100'>
              Connect your wallet to start earning rewards today.
            </p>
          </div>
          <Link
            to='/workshop'
            className='whitespace-nowrap px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium shadow-md'>
            Get Started
          </Link>
        </div>
      </section>
      {/* Benefits Section - Moved closer to hero section */}
      <section className='pt-0 pb-8 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {/* Benefit 1 */}
          <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700'>
            <div className='flex items-center mb-2'>
              <div className='bg-blue-100 dark:bg-blue-900/50 w-10 h-10 flex items-center justify-center rounded-full mr-3'>
                <FaYinYang
                  className='text-blue-600 dark:text-blue-400'
                  size={20}
                />
              </div>
              <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                Meditate
              </h3>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              Practice guided meditation sessions for mindfulness.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700'>
            <div className='flex items-center mb-2'>
              <div className='bg-green-100 dark:bg-green-900/50 w-10 h-10 flex items-center justify-center rounded-full mr-3'>
                <FaDumbbell
                  className='text-green-600 dark:text-green-400'
                  size={20}
                />
              </div>
              <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                Activities
              </h3>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              Interactive experiences designed to calm your mind.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700'>
            <div className='flex items-center mb-2'>
              <div className='bg-purple-100 dark:bg-purple-900/50 w-10 h-10 flex items-center justify-center rounded-full mr-3'>
                <FaBook
                  className='text-purple-600 dark:text-purple-400'
                  size={20}
                />
              </div>
              <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                Workshops
              </h3>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              Join expert-led wellness sessions and events.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700'>
            <div className='flex items-center mb-2'>
              <div className='bg-red-100 dark:bg-red-900/50 w-10 h-10 flex items-center justify-center rounded-full mr-3'>
                <FaChartLine
                  className='text-red-600 dark:text-red-400'
                  size={20}
                />
              </div>
              <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                Rewards
              </h3>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              Earn SOUL tokens by completing wellness activities.
            </p>
          </div>
        </div>
      </section>

      
    </div>
  )
}

// Add animation keyframes
const styleSheet = document.createElement('style')
styleSheet.textContent = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
`
document.head.appendChild(styleSheet)

export default Home
