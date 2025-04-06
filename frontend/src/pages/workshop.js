import React, { useEffect, useState, useContext } from 'react'
import WorkshopCard from '../components/workshopCard'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BackendUrl } from '../data/const'
import { WalletContext } from '../context/WalletContext'

const Workshop = () => {
    const { approveTokens, pyusdBalance, balance, reduceTokens, fetchBalance } = useContext(WalletContext)
    const { walletAddress } = useContext(WalletContext)
    const [workshops, setWorkshops] = useState([])
    const [purchasedWorkshopIds, setPurchasedWorkshopIds] = useState([])

    // Fetch workshops from backend
    const fetchWorkshops = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/workshop/all-workshops`) // Backend endpoint
            const workshopsWithDiscount = response.data.map((workshop) => ({
                ...workshop,
                discount: workshop.price > 50 ? 10 : 5, // Apply 10% discount for price > 50, else 5%
            }))
            setWorkshops(workshopsWithDiscount)
        } catch (error) {
            toast.error('Failed to fetch workshops')
        }
    }

    // Fetch purchased workshops
    const fetchPurchasedWorkshops = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/user/purchased-workshops`, {
                params: { address: walletAddress },
            })
            const purchasedIds = response.data.map((workshop) => workshop._id)
            setPurchasedWorkshopIds(purchasedIds)
        } catch (error) {
            toast.error('Failed to fetch purchased workshops')
        }
    }

    // Handle workshop purchase
    const handleBuyWorkshop = async (workshop) => {
        try {
            if (!walletAddress) {
                toast.warning('Please connect your wallet')
                return
            }

            await fetchBalance()

            // Define the required tokens for the purchase
            const pyusdToken = workshop.price // Price in PYUSD
            const soulToken = workshop.price * 10 // Example: 10 SOUL tokens per PYUSD

            if (pyusdBalance < pyusdToken || balance < soulToken) {
                toast.warning('Insufficient Balance')
                return
            }

            // Approve tokens
            const res = await toast.promise(approveTokens(pyusdToken), {
                pending: 'Approving Tokens',
                success: 'Tokens Approved!',
                error: 'Approval Aborted',
            })

            if (res) {
                // Reduce tokens and complete the purchase
                await toast.promise(reduceTokens(soulToken, pyusdToken), {
                    pending: 'Purchasing Workshop',
                    success: 'Workshop Purchased!',
                    error: 'Purchase Aborted',
                })

                // Call backend to mark the workshop as purchased
                await axios.post(`${BackendUrl}/user/purchase-workshop`, {
                    address: walletAddress,
                    workshopId: workshop._id,
                })

                // Update the purchased workshops list
                setPurchasedWorkshopIds((prev) => [...prev, workshop._id])

                await fetchBalance()
            }
        } catch (err) {
            toast.error('Transaction Failed')
        }
    }

    useEffect(() => {
        if (walletAddress) {
            fetchWorkshops()
            fetchPurchasedWorkshops()
        }
    }, [walletAddress])

    return (
        <div className='flex flex-col min-h-screen  dark:bg-[#4b5161] text-[#4b5161] dark:text-[#fdf5eb]'>
            {/* Header */}
            <div className='flex px-20 py-10 justify-center items-center'>
                <div className='2xl:text-5xl lg:text-6xl md:text-5xl sm:text-4xl text-4xl font-bold '>
                    Workshops
                </div>
            </div>

            {/* Workshops Section */}
            <div className='flex flex-wrap justify-evenly w-screen '>
                {workshops.length > 0 ? (
                    workshops.map((workshop) => (
                        <WorkshopCard
                            key={workshop._id}
                            workshop={{
                                ...workshop,
                                purchased: purchasedWorkshopIds.includes(workshop._id), // Mark as purchased
                            }}
                            onBuy={() => handleBuyWorkshop(workshop)}
                            isCreator={workshop.owner === walletAddress} // Check if the user is the creator
                        />
                    ))
                ) : (
                    <div className='text-center text-lg font-medium mt-10'>
                        No workshops available at the moment.
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className='bg-[#4b5161] text-[#fdf5eb] py-4 text-center mt-auto'>
                © 2025 MindChain. All rights reserved.
            </footer>
        </div>
    )
}

export default Workshop
