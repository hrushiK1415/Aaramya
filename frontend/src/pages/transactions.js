import React, { useState, useEffect, useContext } from 'react'
import { WalletContext } from '../context/WalletContext'
import {
  FaExchangeAlt,
  FaBook,
  FaCoins,
  FaSearch,
  FaFilter,
  FaChevronRight,
  FaLink,
} from 'react-icons/fa'
import { format } from 'date-fns'
import axios from 'axios'
import { toast } from 'react-toastify'

const Transactions = () => {
  const { walletAddress } = useContext(WalletContext)
  const [activeTab, setActiveTab] = useState('all')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTransactions, setFilteredTransactions] = useState([])

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!walletAddress) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // For real implementation, use the API endpoint
        // const response = await axios.get('/api/transactions', {
        //   params: { address: walletAddress }
        // });
        // setTransactions(response.data);

        // Using mock data for now
        setTransactions(mockTransactions)
        setFilteredTransactions(mockTransactions)
      } catch (error) {
        console.error('Error fetching transactions:', error)
        toast.error('Failed to load transaction history')
        // Fallback to mock data on error
        setTransactions(mockTransactions)
        setFilteredTransactions(mockTransactions)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [walletAddress])

  // Filter transactions when tab changes or search term is updated
  useEffect(() => {
    if (!transactions.length) {
      setFilteredTransactions([])
      return
    }

    let filtered = [...transactions]

    // Apply tab filter
    if (activeTab === 'workshop') {
      filtered = filtered.filter((tx) => tx.type === 'workshop')
    } else if (activeTab === 'token') {
      filtered = filtered.filter((tx) => tx.type === 'token')
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.transactionHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tx.workshop &&
            tx.workshop.title &&
            tx.workshop.title.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredTransactions(filtered)
  }, [transactions, activeTab, searchTerm])

  // Function to truncate hash
  const truncateHash = (hash) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 6)}`
  }

  // Function to handle copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.info('Transaction hash copied to clipboard')
  }

  // Mock data for transaction display
  const mockTransactions = [
    {
      _id: '1',
      transactionHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
      type: 'workshop',
      workshop: {
        _id: 'w1',
        title: 'Introduction to Blockchain',
        price: 50,
      },
      createdAt: new Date('2025-03-15T10:30:00'),
    },
    {
      _id: '2',
      transactionHash: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
      type: 'token',
      amount: 10,
      createdAt: new Date('2025-03-10T14:45:00'),
    },
    {
      _id: '3',
      transactionHash: '0x9i8u7y6t5r4e3w2q1p0o9i8u7y6t5r4e3w2q1p0',
      type: 'workshop',
      workshop: {
        _id: 'w2',
        title: 'DeFi Fundamentals',
        price: 75,
      },
      createdAt: new Date('2025-03-05T09:15:00'),
    },
    {
      _id: '4',
      transactionHash: '0xq1w2e3r4t5y6u7i8o9p0a1s2d3f4g5h6j7k8l9',
      type: 'token',
      amount: 15,
      createdAt: new Date('2025-03-01T16:20:00'),
    },
    {
      _id: '5',
      transactionHash: '0xz1x2c3v4b5n6m7q8w9e0r1t2y3u4i5o6p7a8s9d',
      type: 'workshop',
      workshop: {
        _id: 'w3',
        title: 'Smart Contract Development',
        price: 120,
      },
      createdAt: new Date('2025-02-25T11:10:00'),
    },
  ]

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-extrabold text-gray-900 dark:text-white'>
            <span className='bg-clip-text text-[#f58b44]'>
              Transaction History
            </span>
          </h1>
          <p className='mt-2 text-lg text-gray-600 dark:text-gray-400'>
            Track all your transactions on the MindChain network
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className='mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center gap-4'>
          <div className='relative flex-grow'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaSearch className='text-gray-400' />
            </div>
            <input
              type='text'
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Search transactions...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-2 ml-auto'>
            <FaFilter className='text-gray-500 dark:text-gray-400' />
            <span className='text-gray-700 dark:text-gray-300 text-sm'>
              Filter
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
          <div className='border-b border-gray-200 dark:border-gray-700'>
            <nav className='flex'>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-4 text-center w-1/3 text-sm font-medium ${
                  activeTab === 'all'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}>
                <div className='flex items-center justify-center gap-2'>
                  <FaExchangeAlt
                    className={activeTab === 'all' ? 'text-blue-500' : ''}
                  />
                  <span>All Transactions</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('workshop')}
                className={`px-6 py-4 text-center w-1/3 text-sm font-medium ${
                  activeTab === 'workshop'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}>
                <div className='flex items-center justify-center gap-2'>
                  <FaBook
                    className={activeTab === 'workshop' ? 'text-blue-500' : ''}
                  />
                  <span>Workshops</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('token')}
                className={`px-6 py-4 text-center w-1/3 text-sm font-medium ${
                  activeTab === 'token'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                }`}>
                <div className='flex items-center justify-center gap-2'>
                  <FaCoins
                    className={activeTab === 'token' ? 'text-blue-500' : ''}
                  />
                  <span>Tokens</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Transaction List */}
          <div>
            {loading ? (
              <div className='flex justify-center items-center py-20'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className='py-20 text-center'>
                <div className='text-7xl mb-4'>🔍</div>
                <h3 className='text-xl font-medium text-gray-700 dark:text-gray-300'>
                  No transactions found
                </h3>
                <p className='text-gray-500 dark:text-gray-400 mt-2'>
                  {searchTerm
                    ? 'Try adjusting your search.'
                    : activeTab !== 'all'
                    ? `No ${activeTab} transactions found.`
                    : 'Your transaction history will appear here.'}
                </p>
              </div>
            ) : (
              <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                {filteredTransactions.map((transaction) => (
                  <li
                    key={transaction._id}
                    className='hover:bg-gray-50 dark:hover:bg-gray-750'>
                    <div className='px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between'>
                      <div className='flex-1 min-w-0'>
                        {/* Transaction Type Badge */}
                        <div className='flex flex-wrap items-center mb-2 gap-2'>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.type === 'workshop'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                            {transaction.type === 'workshop' ? (
                              <>
                                <FaBook className='mr-1' />
                                Workshop
                              </>
                            ) : (
                              <>
                                <FaCoins className='mr-1' />
                                Token
                              </>
                            )}
                          </span>
                          <span className='text-sm text-gray-500 dark:text-gray-400'>
                            {transaction.createdAt &&
                              format(
                                new Date(transaction.createdAt),
                                'MMM d, yyyy • h:mm a'
                              )}
                          </span>
                        </div>

                        {/* Transaction Hash */}
                        <div className='flex items-center space-x-1'>
                          <span
                            className='font-mono text-sm text-gray-600 dark:text-gray-300 cursor-pointer'
                            onClick={() =>
                              copyToClipboard(transaction.transactionHash)
                            }>
                            {truncateHash(transaction.transactionHash)}
                          </span>
                          <button
                            className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                            onClick={() =>
                              copyToClipboard(transaction.transactionHash)
                            }
                            title='Copy transaction hash'>
                            <svg
                              className='h-4 w-4'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                              />
                            </svg>
                          </button>
                          <a
                            href={`https://solscan.io/tx/${transaction.transactionHash}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 ml-2'
                            title='View on blockchain explorer'>
                            <FaLink className='h-3.5 w-3.5' />
                          </a>
                        </div>

                        {/* Workshop Info (if workshop transaction) */}
                        {transaction.type === 'workshop' &&
                          transaction.workshop && (
                            <div className='mt-2 text-sm text-gray-700 dark:text-gray-300'>
                              <span className='font-medium'>Workshop:</span>{' '}
                              {transaction.workshop.title}
                              {transaction.workshop.price && (
                                <span className='ml-2 font-medium text-gray-900 dark:text-white'>
                                  {transaction.workshop.price} PYUSD
                                </span>
                              )}
                            </div>
                          )}

                        {/* Token Amount (if token transaction) */}
                        {transaction.type === 'token' && (
                          <div className='mt-2 text-sm'>
                            <span className='font-medium text-gray-700 dark:text-gray-300'>
                              Reward:
                            </span>
                            <span className='ml-2 font-medium text-green-600 dark:text-green-400'>
                              +{transaction.amount || 10} SOUL tokens
                            </span>
                          </div>
                        )}
                      </div>

                      <div className='mt-4 sm:mt-0 sm:ml-6'>
                        <a
                          href={`https://solscan.io/tx/${transaction.transactionHash}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center px-3 py-1.5 border border-blue-500 text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors'>
                          View Details
                          <FaChevronRight className='ml-1 h-3 w-3' />
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions
