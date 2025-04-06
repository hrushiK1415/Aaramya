import React, { useContext, useState } from 'react'
import { WalletContext } from '../context/WalletContext'
import {
  FaWallet,
  FaSpinner,
  FaPowerOff,
  FaCopy,
  FaBook,
  FaExchangeAlt,
  FaPlus,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const WalletProfile = () => {
  const {
    pyusdBalance,
    walletAddress,
    balance,
    connectWallet,
    disconnectWallet,
    fetchBalance,
  } = useContext(WalletContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [connectLoading, setConnectLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const navigate = useNavigate()

  const handleFetchBalance = async () => {
    try {
      setIsLoading(true)
      await fetchBalance()
      toast.success('Balance updated successfully!')
    } catch (error) {
      toast.error('Failed to update balance')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
      toast.info('Address copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy address')
    }
  }

  const navigateToWorkshops = () => {
    navigate('/my-workshops')
    setIsOpen(false)
  }

  const navigateToTransactions = () => {
    navigate('/my-transactions')
    setIsOpen(false)
  }

  const navigateToCreateWorkshop = () => {
    navigate('/create-workshop')
    setIsOpen(false)
  }

  const handleConnectWallet = async () => {
    try {
      setConnectLoading(true)
      await connectWallet()
    } catch (error) {
      toast.error('Failed to connect wallet')
    } finally {
      setConnectLoading(false)
    }
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.wallet-dropdown')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className='relative flex items-center'>
      {walletAddress ? (
        <div className='relative wallet-dropdown'>
          {/* Wallet Icon with Indicator */}
          <div className='relative'>
            <FaWallet
              className='text-2xl cursor-pointer text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
              onClick={() => setIsOpen(!isOpen)}
            />
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800'></div>
          </div>

          {isOpen && (
            <div className='absolute top-12 right-0 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-5 w-80 z-50 border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out wallet-dropdown-menu'>
              <div className='relative'>
                {/* Header */}
                <h3 className='text-lg font-bold text-center mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2'>
                  Wallet Profile
                </h3>

                {/* Wallet Address with Copy Icon */}
                <div className='flex items-center justify-between mb-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-md'>
                  <p className='font-mono text-sm font-medium text-gray-700 dark:text-gray-300'>
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                  </p>
                  <button
                    className='flex items-center justify-center p-1.5 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors'
                    onClick={copyToClipboard}
                    aria-label='Copy wallet address'>
                    <FaCopy
                      className={`text-sm ${
                        copySuccess
                          ? 'text-green-500'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Balances Section */}
                <div className='mb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-3 rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                      <p className='text-md font-medium text-gray-700 dark:text-gray-300'>
                        SOUL Tokens
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <p className='font-bold text-blue-600 dark:text-blue-400'>
                        {balance}
                      </p>
                      <button
                        onClick={handleFetchBalance}
                        disabled={isLoading}
                        className='p-1 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors'>
                        <FaSpinner
                          className={`text-xs text-gray-600 dark:text-gray-400 ${
                            isLoading ? 'animate-spin' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                      <p className='text-md font-medium text-gray-700 dark:text-gray-300'>
                        PYUSD Tokens
                      </p>
                    </div>
                    <p className='font-bold text-green-600 dark:text-green-400'>
                      {pyusdBalance}
                    </p>
                  </div>
                </div>

                {/* Create Workshop Button - New Addition */}
                <button
                  onClick={navigateToCreateWorkshop}
                  className='w-full py-2.5 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm font-medium'>
                  <FaPlus size={14} /> Create Workshop
                </button>

                {/* Navigation Buttons */}
                <div className='grid grid-cols-2 gap-3 mb-4'>
                  <button
                    onClick={navigateToWorkshops}
                    className='flex items-center justify-center gap-2 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors shadow-sm'>
                    <FaBook /> Workshops
                  </button>

                  <button
                    onClick={navigateToTransactions}
                    className='flex items-center justify-center gap-2 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 transition-colors shadow-sm'>
                    <FaExchangeAlt /> Transactions
                  </button>
                </div>

                {/* Disconnect Button */}
                <button
                  onClick={disconnectWallet}
                  className='w-full py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm font-medium'>
                  <FaPowerOff /> Disconnect Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleConnectWallet}
          disabled={connectLoading}
          className='bg-gradient-to-r from-green-500 to-blue-500 text-white py-2.5 px-5 rounded-md hover:from-green-600 hover:to-blue-600 dark:from-green-600 dark:to-blue-600 dark:hover:from-green-700 dark:hover:to-blue-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-sm'>
          {connectLoading ? (
            <>
              <FaSpinner className='animate-spin' /> Connecting...
            </>
          ) : (
            <>
              <FaWallet /> Connect Wallet
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default WalletProfile
