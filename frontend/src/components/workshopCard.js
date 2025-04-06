import React, { useEffect, useState } from 'react';
import { WalletContext } from '../context/WalletContext';
const WorkshopCard = ({ workshop, onBuy, isCreator }) => {
    const { title, price, description, discount, purchased } = workshop;
    const discountedPrice = price ? price - (price * discount) / 100 : 0; // Ensure price is valid
    const { approveTokens,pyusdBalance,balance,walletAddress, reduceTokens,fetchBalanc } = React.useContext(WalletContext); // Get wallet address from context
    const [pyusdToken,setPyusdToken]=useState(0);
    const [soulToken,setSoulToken]=useState(0);
    useEffect(()=>{
        const token =Number(price);
        const handleFetchDiscount =async () => {
            var val = Math.min(balance,200);
            var discount = val/100;    //285/100 ->2.85   
            var PyusdT=(token-discount);
            setSoulToken(val);
            setPyusdToken(PyusdT);
          }
          if(walletAddress){
            // console.log(token + " " + balance + " " + walletAddress);
            handleFetchDiscount()
        }
      },[walletAddress])
    return (
        <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-[#4b5161] dark:border-gray-700 h-px[200px] flex flex-col justify-between'>
            <div className='p-8 rounded-t-lg h-2/3'>
                <img
                    className='rounded-lg'
                    src={require('../images/404-image.png')} // Default image
                    alt='Workshop'
                />
            </div>
            <div className='px-5 pb-5 h-1/3 flex flex-col '>
                <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                    {title}
                </h5>
                <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>{description}</p>
                <div className='flex items-center justify-between'>
                    <div>
                       
                        { (
                            <p className='text-sm text-black font-bold dark:text-gray-400 '>
                                {price.toFixed(2)} PYUSD
                            </p>
                        )}
                        {(!isCreator&&!purchased &&walletAddress && price!==0)? (<div className=' text-red-500 font-semibold'>
                        Get at <span className='font-bold text-red-600'>{pyusdToken}  PYUSD</span> using Soul Tokens
                    </div>):(<></>)}
                    </div>
                    {!isCreator && !purchased && (
                        <button
                            onClick={onBuy}
                            className='text-white bg-[#f58b44] hover:bg-[#d67a3a] focus:ring-4 focus:outline-none focus:ring-[#f58b44] font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                            Buy
                        </button>
                    )}
                    {purchased && (
                        <span className='text-green-500 font-medium'>Purchased</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkshopCard;
