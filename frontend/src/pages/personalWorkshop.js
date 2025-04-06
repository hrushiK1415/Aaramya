import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import WorkshopCard from '../components/workshopCard'
import { BackendUrl } from '../data/const'
import { useContext } from 'react'
import { WalletContext } from '../context/WalletContext'

const PersonalWorkshop = () => {
    const { walletAddress } = useContext(WalletContext) // Get wallet address from context
    const [purchasedWorkshops, setPurchasedWorkshops] = useState([])
    const [createdWorkshops, setCreatedWorkshops] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch purchased workshops
    const fetchPurchasedWorkshops = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/user/purchased-workshops`, {
                params: { address: walletAddress },
            })
            console.log(response.data);
            setPurchasedWorkshops(response.data)
        } catch (error) {
            toast.error('Failed to fetch purchased workshops')
        }
    }

    // Fetch created workshops
    const fetchCreatedWorkshops = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/user/created-workshops`, {
                params: { address: walletAddress },
            })
            setCreatedWorkshops(response.data)
            console.log(response.data);

        } catch (error) {
            toast.error('Failed to fetch created workshops')
        }
    }

    useEffect(() => {
        if (walletAddress) {
            Promise.all([fetchPurchasedWorkshops(), fetchCreatedWorkshops()]).finally(() =>
                setLoading(false)
            )
        }
    }, [walletAddress])

    return (
        <div className='flex flex-col min-h-screen bg-[#fdf5eb] dark:bg-[#4b5161] text-[#4b5161] dark:text-[#fdf5eb]'>
            {/* Header */}
            <div className='flex px-20 py-10 justify-center items-center'>
                <div className='2xl:text-5xl lg:text-6xl md:text-5xl sm:text-4xl text-4xl font-bold'>
                    My Workshops
                </div>
            </div>

            {loading ? (
                <div className='flex justify-center items-center flex-grow'>
                    <p className='text-lg font-medium'>Loading...</p>
                </div>
            ) : (
                <div className='flex flex-col flex-grow'>
                    {/* Purchased Workshops Section */}
                    <div className='px-10 mb-10'>
                        <h2 className='text-2xl font-semibold mb-4'>Purchased Workshops</h2>
                        {purchasedWorkshops.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {purchasedWorkshops.map((workshop) => (
                                    <WorkshopCard
                                        key={workshop._id}
                                        workshop={{ ...workshop, purchased: true }} // Mark as purchased
                                        isCreator={false} // Purchased workshops are not created by the user
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className='text-lg font-medium'>You have not purchased any workshops yet.</p>
                        )}
                    </div>

                    {/* Created Workshops Section */}
                    <div className='px-10'>
                        <h2 className='text-2xl font-semibold mb-4'>Created Workshops</h2>
                        {createdWorkshops.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {createdWorkshops.map((workshop) => (
                                    <WorkshopCard
                                        key={workshop._id}
                                        workshop={workshop}
                                        isCreator={true} // Created workshops are by the user
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className='text-lg font-medium'>You have not created any workshops yet.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className='bg-[#4b5161] text-[#fdf5eb] py-4 text-center mt-auto'>
                © 2025 MindChain. All rights reserved.
            </footer>
        </div>
    )
}

export default PersonalWorkshop
